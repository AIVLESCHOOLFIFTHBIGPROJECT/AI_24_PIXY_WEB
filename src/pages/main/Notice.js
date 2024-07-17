// import React from 'react';
import React, { useState, useEffect } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3); // 기본 페이지 크기 설정
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNotices();
    }, [page, pageSize]);

    const fetchNotices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/notice/?page=${page}&size=${pageSize}`);
            const data = await response.json();
            setNotices(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1); // 페이지 크기가 변경되면 첫 페이지로 이동
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1>Notices</h1>
        <table className="notice-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {notices.map(notice => (
                    <tr key={notice.id}>
                        <td>{notice.id}</td>
                        <td>{notice.title}</td>
                        <td>{notice.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={page === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
      </div>
  );
};
export default Notice;