import React from 'react';
import { Box, Grid, Typography, Paper, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend, Label } from 'recharts';
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
    { name: '3', 당월: 800, 전월: 500 },
    { name: '4', 당월: 400, 전월: 700 },
    { name: '5', 당월: 500, 전월: 900 },
    { name: '6', 당월: 300, 전월: 400 },
    { name: '7', 당월: 500, 전월: 300 },
    { name: '8', 당월: 800, 전월: 400 },
    { name: '9', 당월: 400, 전월: 700 },
    { name: '10', 당월: 300, 전월: 400 },
    { name: '11', 당월: 300, 전월: 400 },
    { name: '12', 당월: 500, 전월: 100 },
  ];

  const achieve_pieChartData = [
    { name: '달성률', value: 75 },
    { name: '미달성률', value: 25 },
  ];

  const age_pieChartData = [
    { name: '0-18 청소년', value: 75 },
    { name: '18-30 청년', value: 25 },
    { name: '30-40 중년', value: 25 },
    { name: '이외', value: 25 },
  ];

  const ACHIEVE_COLORS = ['#FFA500', '#E0E0E0'];
  const AGE_COLORS = ['#1E5EFF', '#FFC700', '#F99600', '#06A561'];

  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 24 }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: entry.color, 
              display: 'inline-block', 
              marginRight: '8px' 
            }}></span>
            <span>{entry.value}</span>
            <span style={{ marginLeft: 'auto' }}>{entry.payload.value}%</span>
          </li>
        ))}
      </ul>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>대시보드</Typography>
      
      {/* 상단 카드 섹션 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">총 주문</Typography>
            <Typography variant="h4">10,000원</Typography>
            <Typography variant="body2" color="success.main">+22.45% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">결제 수량</Typography>
            <Typography variant="h4">1,056</Typography>
            <Typography variant="body2" color="success.main">+15.44% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">하루 평균 고객수</Typography>
            <Typography variant="h4">48</Typography>
            <Typography variant="body2" color="error.main">-18.35% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
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
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis scale="linear" domain={['auto', 'auto']} />
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
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>목표 판매액</Typography>
            <Box sx={{ height: 350, display: 'flex', flexDirection:'column', justifyContent: 'space-between' }}>
              <ResponsiveContainer width="100%" height="60%">
                <PieChart>
                  <Pie
                    data={achieve_pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {achieve_pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ACHIEVE_COLORS[index % ACHIEVE_COLORS.length]} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="24px" fontWeight="bold">
                    75%
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <Box>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>총 판매액:</span>
                    <span>150,000원</span>
                  </Typography>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>한달 목표:</span>
                    <span>200,000원</span>
                  </Typography>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>남음:</span>
                    <span>50,000원</span>
                  </Typography>
                </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>연령대</Typography>
            <Box sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={age_pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {age_pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    content={renderCustomizedLegend}
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
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