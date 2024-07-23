import React, { useState , useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box, Pagination, Stack } from '@mui/material';
import { format } from 'date-fns';

const PredictSales = () => {
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const response = await axios.get('https://api.pixy.kro.kr/api/product/sales/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setUploadError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []); // 의존성 배열을 비워서 컴포넌트가 마운트될 때만 실행

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        const file_name = file.name.split('.')[0]
        formData.append('uploaded_file', file);
        formData.append('f_name', file_name)
        const accessToken = sessionStorage.getItem('access_token');

        try {
            setLoading(true);
            setUploadError(null);

            //POST 요청
            await axios.post('https://api.pixy.kro.kr/api/store/predict/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}` // Authorization 헤더에 토큰 포함
                }
            });

            // StoreUploadList POST 요청 성공 후 ProductList GET 요청
            const productResponse = await axios.get('https://api.pixy.kro.kr/api/product/sales/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}` // Authorization 헤더에 토큰 포함
                }
            });
            setProducts(productResponse.data);

        } catch (error) {
            setUploadError('Failed to upload the file or fetch products.');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCurrentPage(0); // 날짜 변경 시 페이지를 첫 페이지로 리셋
    };

    const handlePageClick = (pageIndex) => {
      setCurrentPage(pageIndex);
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
                예측 판매량 페이지
            </Typography>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={loading} variant="contained" color="primary">
                {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            {uploadError && <Typography color="error">{uploadError}</Typography>}
            <div>
                <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                wrapperClassName="datePicker"
                />
            </div>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom>
                상품 리스트(예측)
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
                    {currentItems && currentItems.map((product, index) => (
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
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" mt={2}>
                <Pagination count={pageCount} page={currentPage + 1} onChange={(e, value) => handlePageClick(value - 1)} />
            </Stack>
        </Box>
    );
};

export default PredictSales;
