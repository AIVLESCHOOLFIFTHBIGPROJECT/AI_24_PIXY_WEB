// import React from 'react';
import React, { useState, useEffect } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // 기본 페이지 크기 설정
    const [totalPages, setTotalPages] = useState(1);
    const [totalNotices, setTotalNotices] = useState(0); // 총 공지사항 수
    const [expandedNoticeId, setExpandedNoticeId] = useState(null);

    useEffect(() => {
        fetchNotices();
    }, [page, pageSize]);

    const fetchNotices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.pixy.kro.kr/api/notice/?page=${page}&size=${pageSize}`);
            const data = await response.json();
            setNotices(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
            setTotalNotices(data.count); // 총 공지사항 수 설정
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

    const toggleNoticeContent = (id) => {
        if (expandedNoticeId === id) {
            setExpandedNoticeId(null);
        } else {
            setExpandedNoticeId(id);
        }
    };

    const calculateItemNumber = (index) => {
        const calculatedNumber = totalNotices - ((page - 1) * pageSize + index);
        // 마지막 데이터에 해당하면 번호를 1로 설정
        if (index === notices.length - 1 && page === totalPages) {
            return 1;
        }
        return calculatedNumber;
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\. /g, '-').replace('. ', ' ').replace('. ', ':');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1>공지사항</h1>
        <table className="notice-table">
            
            <tbody>
                {notices.map((notice, index) => (
                    <React.Fragment key={notice.id}>
                        <tr>
                            <td>{calculateItemNumber(index)}</td>
                            <td onClick={() => toggleNoticeContent(notice.id)} style={{ cursor: 'pointer' }}>{notice.title}</td>
                            <td>{formatDate(notice.updated_at)}</td>
                        </tr>
                        {expandedNoticeId === notice.id && (
                            <tr>
                                <td colSpan="2">{notice.content}</td>
                            </tr>
                        )}
                    </React.Fragment>
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