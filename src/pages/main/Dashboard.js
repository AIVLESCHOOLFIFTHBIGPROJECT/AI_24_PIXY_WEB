import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import api from '../../api';

const Dashboard = () => {
  const [achieve_pieChartData, setAchievePieChartData] = useState([]);
  const [agePieChartData, setAgePieChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    paymentCount: 0,
    avgDailyCustomers: 0,
    totalCustomers: 0,
    totalSales: 0,
    monthlyTarget: 0,
    remaining: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/product/product/', {}, {
          withCredentials: true,
        });
        const data = response.data;
  
        // Process the data
        const totalOrders = data.reduce((sum, item) => sum + item.stock, 0) * 8;
        const paymentCount = data.reduce((sum, item) => sum + item.sales, 0);
        const avgDailyCustomers = data.length;
        const totalCustomers = avgDailyCustomers * 16;
  
        // Top Products Data
        const productData = Object.values(
          data.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = { category: item.category, sales: 0, stock: 0 };
            }
            acc[item.category].sales += item.sales;
            acc[item.category].stock += item.stock;
            return acc;
          }, {})
        ).sort((a, b) => b.sales - a.sales);
  
        const totalSales = paymentCount;
        const monthlyTarget = totalSales * 1.2; // 20% more than current sales
  
        // Update all states
        setTopProducts(productData);
        setSummary({
          totalOrders,
          paymentCount,
          avgDailyCustomers,
          totalCustomers,
          totalSales,
          monthlyTarget,
          remaining: monthlyTarget - totalSales
        });
  
        setAchievePieChartData([
          { name: 'Achieved', value: totalSales },
          { name: 'Remaining', value: monthlyTarget - totalSales }
        ]);
        setAgePieChartData([
          { name: '20-30', value: 30 },
          { name: '31-40', value: 40 },
          { name: '41-50', value: 20 },
          { name: '51+', value: 10 }
        ]);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  function processBarChartData(data) {
    // 데이터를 날짜 기준으로 내림차순 정렬
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // 최근 7일 데이터 추출
    const recentData = sortedData.slice(0, 7);
  
    // 형식에 맞게 데이터 변환
    const barData = recentData.map(item => {
      const date = new Date(item.date);
      return {
        day: date.getDate().toString(),  // 날짜의 일(day) 부분만 추출
        value: item.sales
      };
    });
  
    // 날짜 순으로 다시 정렬 (오름차순)
    return barData.reverse();
  }

  function processLineChartData(data) {
    // 현재 년도와 전년도 구하기
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
  
    // 월별 데이터 초기화
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}월`,
      당월: 0,
      전월: 0
    }));
  
    // 데이터 집계
    data.forEach(item => {
      const [year, month] = item.date.split('-').map(Number);
      const monthIndex = month - 1;
      
      if (year === currentYear) {
        monthlyData[monthIndex].당월 += item.sales;
      } else if (year === lastYear) {
        monthlyData[monthIndex].전월 += item.sales;
      }
    });
  
    // 현재 월까지의 데이터만 반환
    const currentMonth = new Date().getMonth();
    return monthlyData.slice(0, currentMonth + 1);
  }

  //연령대
  const age_pieChartData = [
    { name: '0-18 청소년', value: 40 },
    { name: '18-30 청년', value: 35 },
    { name: '30-40 중년', value: 15 },
    { name: '이외', value: 10 },
  ];

    const lineChartData = [
    { name: '1월', 당월: 323, 전월: 440 },
    { name: '2월', 당월: 576, 전월: 345 },
    { name: '3월', 당월: 875, 전월: 558 },
    { name: '4월', 당월: 425, 전월: 729 },
    { name: '5월', 당월: 597, 전월: 937 },
    { name: '6월', 당월: 313, 전월: 468 },
    { name: '7월', 당월: 557, 전월: 357 },
  ];

  // 지난 7일간 판매
  const barCharData = [
    { day: '12', value: 400 },
    { day: '13', value: 600 },
    { day: '14', value: 500 },
    { day: '15', value: 700 },
    { day: '16', value: 1000 },
    { day: '17', value: 1100 },
    { day: '18', value: 1200 },
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#333', color: '#fff', padding: '5px', borderRadius: '5px' }}>
          <p>{`${formatCurrency(payload[0].value)}원`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>대시보드</Typography>
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

        {/* 상단 카드 섹션 */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <Typography variant="h6">총 주문</Typography>
              <Typography variant="h4">{formatCurrency(summary.totalOrders)}</Typography>
              <Typography variant="body2" color="success.main">+22.45% <TrendingUpIcon fontSize="small" /></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <Typography variant="h6">결제 수량</Typography>
              <Typography variant="h4">{formatCurrency(summary.paymentCount)}</Typography>
              <Typography variant="body2" color="success.main">+15.44% <TrendingUpIcon fontSize="small" /></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <Typography variant="h6">하루 평균 고객수</Typography>
              <Typography variant="h4">{formatCurrency(summary.avgDailyCustomers)}</Typography>
              <Typography variant="body2" color="error.main">-18.35% <TrendingUpIcon fontSize="small" /></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <Typography variant="h6">총 고객수</Typography>
              <Typography variant="h4">{formatCurrency(summary.totalCustomers)}</Typography>
              <Typography variant="body2" color="success.main">+10.24% <TrendingUpIcon fontSize="small" /></Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 라인 차트 섹션 */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>시간별 판매량</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis scale="linear" domain={[0, 'auto']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="당월" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="전월" 
                    stroke="#82ca9d" 
                    strokeWidth={3}
                    dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>지난 7일간 판매</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4">{formatCurrency(summary.totalSales / 16)}</Typography>
                <Typography variant="body2" color="text.secondary">판매 제품수</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4">{formatCurrency(summary.totalSales * 0 + 5500)}원</Typography>
                <Typography variant="body2" color="text.secondary">수익</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={145}>
                <BarChart data={barCharData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#4CAF50" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
        </Grid>

        {/* 하단 섹션 */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
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
                      {`${Math.round((summary.totalSales / summary.monthlyTarget) * 100)}%`}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
                <Box>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>총 판매액:</span>
                    <span>{formatCurrency(summary.totalSales * 32)}원</span>
                  </Typography>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>한달 목표:</span>
                    <span>{formatCurrency(summary.monthlyTarget * 32)}원</span>
                  </Typography>
                  <Typography variant="body2" display="flex" justifyContent="space-between">
                    <span>남음:</span>
                    <span>{formatCurrency(summary.remaining * 32)}원</span>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
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
            <Paper elevation={2} sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>최고 판매 상품</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>상품</TableCell>
                    <TableCell align="right">재고</TableCell>
                    <TableCell align="right">판매량</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.slice(0, 10).map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.category}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                      <TableCell align="right">{product.sales}</TableCell>
                    </TableRow> 
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;