import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, CircularProgress, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotices, setTotalNotices] = useState(0);
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
      setTotalNotices(data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const toggleNoticeContent = (id) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  const calculateItemNumber = (index) => {
    const calculatedNumber = totalNotices - ((page - 1) * pageSize + index);
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

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>Error: {error}</Typography></Box>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>공지사항</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice, index) => (
              <React.Fragment key={notice.id}>
                <TableRow>
                  <TableCell>{calculateItemNumber(index)}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => toggleNoticeContent(notice.id)}>
                      <Typography>{notice.title}</Typography>
                      <IconButton size="small">
                        {expandedNoticeId === notice.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(notice.updated_at)}</TableCell>
                </TableRow>
                {expandedNoticeId === notice.id && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Collapse in={expandedNoticeId === notice.id} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography>{notice.content}</Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Select value={pageSize} onChange={handlePageSizeChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};

export default Notice;
