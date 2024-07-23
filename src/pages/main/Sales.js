import React, { useState,  useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, MenuItem, Pagination } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';

const Sales = () => {
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageGroup, setCurrentPageGroup] = useState(0);

    const filteredProducts = products.filter((product) => {
        if (!selectedDate) return true;
        return format(new Date(product.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    });

    const itemsPerPage = 20;
    const pagesPerGroup = 20;
    // 임시로 총 페이지 수 설정
    const totalItems = filteredProducts.length;
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const totalPageGroups = Math.ceil(pageCount / pagesPerGroup);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const response = await axios.get('https://api.pixy.kro.kr/api/product/product/', {
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

    const handleChange = (event, value) => {
        setCurrentPage(value - 1); // 페이지는 0 기반 인덱스이므로 1을 빼줍니다.
    };

    const handleNextGroup = () => {
        const nextPage = currentPage + 10;
        if (nextPage < pageCount) {
            setCurrentPage(nextPage);
            setCurrentPageGroup(Math.floor(nextPage / pagesPerGroup));
        }
    };

    const handlePrevGroup = () => {
        const prevPage = currentPage - 10;
        if (prevPage >= 0) {
            setCurrentPage(prevPage);
            setCurrentPageGroup(Math.floor(prevPage / pagesPerGroup));
        }
    };

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

            // POST 요청
            await axios.post('https://api.pixy.kro.kr/api/store/stores/', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    'Content-Type': 'multipart/form-data'
                }
            });

            // StoreUploadList POST 요청 성공 후 ProductList GET 요청
            const productResponse = await axios.get('https://api.pixy.kro.kr/api/product/product/', {
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
  


    // 페이지 번호는 1부터 시작하므로 currentPage + 1을 전달
    // const handleChange = (event, value) => {
    //     handlePageClick(value - 1); // handlePageClick은 0부터 시작하므로 인덱스 조정
    // };
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                판매 페이지
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
                상품 리스트
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
                    {currentItems && currentItems.map((product, index) => (
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
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" mt={2}>
                <Pagination count={pageCount} page={currentPage + 1} onChange={(e, value) => handlePageClick(value - 1)} />
            </Stack>
        </Box>
    );
};

export default Sales;
