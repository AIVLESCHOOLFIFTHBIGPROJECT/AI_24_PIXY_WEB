import React from 'react';
import { Box, Grid, Typography, Paper, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  // 차트 데이터 (예시)
  const lineChartData = [
    { name: '1', 당월: 300, 전월: 400 },
    { name: '2', 당월: 500, 전월: 300 },
    // ... 더 많은 데이터 포인트
  ];

  const pieChartData = [
    { name: '달성률', value: 75 },
    { name: '미달성률', value: 25 },
  ];

  const COLORS = ['#FFA500', '#E0E0E0'];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>대시보드</Typography>
      
      {/* 상단 카드 섹션 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">총 주문</Typography>
            <Typography variant="h4">10,000원</Typography>
            <Typography variant="body2" color="success.main">+22.45% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">결제 수량</Typography>
            <Typography variant="h4">1,056</Typography>
            <Typography variant="body2" color="success.main">+15.44% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">하루 평균 고객수</Typography>
            <Typography variant="h4">48</Typography>
            <Typography variant="body2" color="error.main">-18.35% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">총 고객수</Typography>
            <Typography variant="h4">5,420</Typography>
            <Typography variant="body2" color="success.main">+10.24% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 라인 차트 섹션 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>시간별 판매량</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="당월" stroke="#8884d8" />
                <Line type="monotone" dataKey="전월" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>저번 7일간 판매</Typography>
            {/* 여기에 바 차트 구현 */}
          </Paper>
        </Grid>
      </Grid>

      {/* 하단 섹션 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>목표 달성액</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart width={200} height={200}>
                <Pie
                  data={pieChartData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
            <Typography variant="body1" align="center">75% 달성</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>연령대</Typography>
            {/* 여기에 도넛 차트 구현 */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>최고 판매 상품</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>상품</TableCell>
                  <TableCell align="right">가격</TableCell>
                  <TableCell align="right">판매량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Men Grey Hoodie</TableCell>
                  <TableCell align="right">1,000원</TableCell>
                  <TableCell align="right">204</TableCell>
                </TableRow>
                {/* 더 많은 행 추가 */}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;