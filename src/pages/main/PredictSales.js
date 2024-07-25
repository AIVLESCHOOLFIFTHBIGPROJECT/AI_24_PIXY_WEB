import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
  InputAdornment,
  IconButton,
  Grid,
  useMediaQuery,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PredictSales = () => {
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fileName, setFileName] = useState(null);

  const itemsPerPage = 10;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const accessToken = sessionStorage.getItem("access_token");
    try {
      const productResponse = await axios.get(
        "https://api.pixy.kro.kr/api/product/sales/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
          },
        }
      );
      setProducts(productResponse.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setUploadError("Failed to fetch products.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        alert('CSV파일만 업로드해주세요.');
        e.target.value = '';
      }
      else{
        setFile(e.target.files[0]);
        setFileName(selectedFile.name);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("uploaded_file", file);
    formData.append("f_name", fileName);

    const accessToken = sessionStorage.getItem("access_token");

    try {
      setLoading(true);
      setUploadError(null);

      // POST 요청
      await axios.post("https://api.pixy.kro.kr/api/store/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
        },
      });

      // POST 요청 성공 후 GET 요청
      fetchProducts();
      alert("등록 성공");
    } catch (error) {
      alert("등록 실패");
      console.error("Failed to upload the file or fetch products:", error);
      setUploadError("파일 등록을 실패했습니다. 컬럼을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(0); // 날짜 변경 시 페이지를 첫 페이지로 리셋
  };

  const handlePageClick = (event, pageIndex) => {
    setCurrentPage(pageIndex - 1);
  };

  const filteredProducts = products.filter((product) => {
    if (!selectedDate) return true;
    return (
      format(new Date(product.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
    );
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <TextField
      label="날짜선택"
      variant="outlined"
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClick}>
              <CalendarTodayIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  ));

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: "transparent" }}>
      <Typography variant="h4" gutterBottom sx={{ pb: "1.4rem" }}>
        판매/예측
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          background: "#ffffff",
          border: "1px solid #e9ebf2",
          borderRadius: "1.6rem",
          display: "flex",
          flexDirection: "column",
          mb: "1.4rem",
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4} display="flex" alignItems="center">
            <Button variant="outlined" component="label">
              파일선택
              <input type="file" hidden accept=".csv" onChange={handleFileChange} />
            </Button>
            <Typography sx={{ ml: 2 }}>{fileName}</Typography>
            <Button
              variant="outlined"
              onClick={handleUpload}
              disabled={loading}
              sx={{ ml: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "등록"}
            </Button>
            {uploadError && (
              <Typography color="error" sx={{ ml: 2 }}>{uploadError}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜를 선택하거나 입력"
              customInput={<CustomInput />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          background: "#ffffff",
          border: "1px solid #e9ebf2",
          borderRadius: "1.6rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ pb: "1.4rem" }}>
            판매량 예측 목록
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>상품 분류</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell>재고</TableCell>
                  <TableCell>판매량(예측)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((product) => (
                  <TableRow key={product.s_num}>
                    <TableCell>{product.s_num}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={currentPage + 1}
            onChange={handlePageClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PredictSales;
