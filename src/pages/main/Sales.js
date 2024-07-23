import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Box, Button, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Pagination, } from '@mui/material';

const Sales = () => {
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fileName, setFileName] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      const productResponse = await axios.get('https://api.pixy.kro.kr/api/product/product/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
        },
      });
      setProducts(productResponse.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setUploadError('Failed to fetch products.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(e.target.files[0]);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('uploaded_file', file);
    formData.append('f_name', fileName);

    const accessToken = sessionStorage.getItem('access_token');

    try {
      setLoading(true);
      setUploadError(null);

      // POST 요청
      await axios.post('https://api.pixy.kro.kr/api/store/stores/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
        },
      });

      // POST 요청 성공 후 GET 요청
      fetchProducts();
    } catch (error) {
      console.error('Failed to upload the file or fetch products:', error);
      setUploadError('Failed to upload the file or fetch products.');
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
    return format(new Date(product.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        판매/재고
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" component="label">
          파일선택
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading}
          sx={{ ml: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : '등록'}
        </Button>
        {uploadError && <Typography color="error">{uploadError}</Typography>}
      </Box>

      <Box sx={{ mb: 3 }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하거나 입력"
          customInput={<TextField label="날짜선택" variant="outlined" />}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
            상품 목록
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>상품 분류</TableCell>
                <TableCell>판매량</TableCell>
                <TableCell>날짜</TableCell>
                <TableCell>재고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((product) => (
                <TableRow key={product.p_num}>
                  <TableCell>{product.p_num}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={(event, page) => handlePageClick(event, page)}
        />
      </Box>
    </Box>
  );
};

export default Sales;
