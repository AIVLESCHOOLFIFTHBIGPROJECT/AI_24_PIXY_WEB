import React from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import salesImg from "../../assets/home_sample2.png";

const SalesSection = () => {
  const isLargeScreen = useMediaQuery("(min-width:1920px)");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1920px",
        mx: "auto",
        px: {
          xs: "5vw",
          sm: "7vw",
          md: "9vw",
          lg: isLargeScreen ? "340px" : "calc((100vw - 1240px) / 2)",
        },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            판매량 예측을 위한 AI 기술
          </Typography>
          <Typography variant="body1" paragraph>
            PIXY의 예측 모델은 매장의 다양한 정보들에 대해 종합적으로 학습하고
            예측하여, 보다 나은 예측 결과를 제공할 수 있게 합니다.
          </Typography>
          <Typography variant="h5" paragraph>
            - 내 매장만을 위한 예측 정보
          </Typography>
          <Typography variant="body1" paragraph>
            PIXY는 매장별로 개별로 학습된 예측 모델을 사용합니다. 내 매장에
            최적화된 예측 모델을 통해 더욱 신뢰도 있는 예측이 가능합니다.
          </Typography>
          <Typography variant="h5" paragraph>
            - 재고 관리와 예측을 한눈에
          </Typography>
          <Typography variant="body1" paragraph>
            PIXY의 인터페이스는 입력한 매장 정보와 예측 매출 정보를 직관적으로
            제공합니다. 필요한 날짜나 품목에 대한 정보를 빠르게 확인하실 수
            있습니다.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={salesImg}
            alt="Sales"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesSection;
