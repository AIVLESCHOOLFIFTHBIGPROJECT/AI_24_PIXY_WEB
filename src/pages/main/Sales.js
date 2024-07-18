import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Sales = () => {
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('uploaded_file', file);

        try {
            setLoading(true);
            setUploadError(null);

            // POST 요청
            await axios.post('https://api.pixy.kro.kr/api/store/stores/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // StoreUploadList POST 요청 성공 후 ProductList GET 요청
            const productResponse = await axios.get('https://api.pixy.kro.kr/api/product/product/');
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
        <div>
            <h1>Sales Page</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                />
            </div>
            <div style={{ height: '100vh' }}>
                <h1>상품 리스트</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상품 분류</th>
                            <th>판매량</th>
                            <th>날짜</th>
                            <th></th>
                            <th>재고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.map((product) => {
                            console.log("Product:", product); // 각 product 객체를 콘솔에 출력
                            return (
                                <tr key={product.p_num}>
                                    <td>{product.p_num}</td>
                                    <td>{product.category}</td>
                                    <td>{product.sales}</td>
                                    <td>{product.date}</td>
                                    <td></td>
                                    <td>{product.stock}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
                  <div className="pagination-buttons">
                    {/* 페이지 버튼 생성 */}
                    {[...Array(pageCount)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index)}
                            className={index === currentPage ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                  </div>

            </div>
        </div>
    );
};

export default Sales;
