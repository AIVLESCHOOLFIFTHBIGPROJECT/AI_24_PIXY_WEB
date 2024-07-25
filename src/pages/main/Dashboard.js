import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend, Label } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  const [barCharData, setBarCharData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [achieve_ieChartData, setAchievePieChartData] = useState([]);
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
    // Replace with your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        // Process the data to fit the charts
        const barData = data.barChart.map(item => ({ day: item.date, value: item.sales }));
        const lineData = data.lineChart.map(item => ({ name: item.month, 당월: item.currentMonth, 전월: item.previousMonth }));
        const achieveData = [{ name: '달성률', value: data.achievementRate }, { name: '미달성률', value: 100 - data.achievementRate }];
        const ageData = data.ageDistribution.map((item, index) => ({ name: item.ageRange, value: item.percentage }));
        const productData = data.topProducts;

        setBarCharData(barData);
        setLineChartData(lineData);
        setAchievePieChartData(achieveData);
        setAgePieChartData(ageData);
        setTopProducts(productData);
        setSummary({
          totalOrders: data.totalOrders,
          paymentCount: data.paymentCount,
          avgDailyCustomers: data.avgDailyCustomers,
          totalCustomers: data.totalCustomers,
          totalSales: data.totalSales,
          monthlyTarget: data.monthlyTarget,
          remaining: data.monthlyTarget - data.totalSales
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // 차트 데이터 (예시)
  // 지난 7일간 판매
  // const barCharData = [
  //   { day: '12', value: 400 },
  //   { day: '13', value: 600 },
  //   { day: '14', value: 500 },
  //   { day: '15', value: 700 },
  //   { day: '16', value: 1000 },
  //   { day: '17', value: 1100 },
  //   { day: '18', value: 1200 },
  // ];

  // 시간별 판매량
  // const lineChartData = [
  //   { name: '1월', 당월: 300, 전월: 400 },
  //   { name: '2월', 당월: 500, 전월: 300 },
  //   { name: '3월', 당월: 800, 전월: 500 },
  //   { name: '4월', 당월: 400, 전월: 700 },
  //   { name: '5월', 당월: 500, 전월: 900 },
  //   { name: '6월', 당월: 300, 전월: 400 },
  //   { name: '7월', 당월: 500, 전월: 300 },
  //   { name: '8월', 당월: 800, 전월: 400 },
  //   { name: '9월', 당월: 400, 전월: 700 },
  //   { name: '10월', 당월: 300, 전월: 400 },
  //   { name: '11월', 당월: 300, 전월: 400 },
  //   { name: '12월', 당월: 500, 전월: 100 },
  // ];

  // 목표 판매액
  // const achieve_pieChartData = [
  //   { name: '달성률', value: 75 },
  //   { name: '미달성률', value: 25 },
  // ];

  //연령대
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#333', color: '#fff', padding: '5px', borderRadius: '5px' }}>
          <p>{`${payload[0].value}원`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>대시보드</Typography>
      
      {/* 상단 카드 섹션 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">총 주문</Typography>
            <Typography variant="h4">{summary.totalOrders}원</Typography>
            <Typography variant="body2" color="success.main">+22.45% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">결제 수량</Typography>
            <Typography variant="h4">{summary.paymentCount}</Typography>
            <Typography variant="body2" color="success.main">+15.44% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">하루 평균 고객수</Typography>
            <Typography variant="h4">{summary.avgDailyCustomers}</Typography>
            <Typography variant="body2" color="error.main">-18.35% <TrendingUpIcon fontSize="small" /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6">총 고객수</Typography>
            <Typography variant="h4">{summary.totalCustomers}</Typography>
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
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>지난 7일간 판매</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4">{summary.totalSales}</Typography>
              <Typography variant="body2" color="text.secondary">판매 제품수</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4">{summary.totalSales}원</Typography>
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
                {topProducts.map((product, index) => (
                  <TableRow>
                    <TableCell>Men Grey Hoodie</TableCell>
                    <TableCell align="right">1,000원</TableCell>
                    <TableCell align="right">204</TableCell>
                  </TableRow>
                ))}
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