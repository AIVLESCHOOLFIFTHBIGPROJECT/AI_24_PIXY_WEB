import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import customLLMImg from "../../assets/home_sample1.png";

const CustomLLMSection = () => {
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
          <img
            src={customLLMImg}
            alt="Custom LLM"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            고객 응대를 위한 AI 기술
          </Typography>
          <Typography variant="body1" paragraph>
            Pixy Custom은 각 매장의 특성과 요구에 맞춘 커스텀 LLM(Large Language
            Model) 기능을 제공합니다. 매장의 데이터를 분석하여 최적의 언어
            모델을 학습하고, 고객의 질문에 더 정확하게 답변합니다.
          </Typography>
          <Typography variant="h5" paragraph>
            - 맞춤형 언어 모델 학습
          </Typography>
          <Typography variant="body1" paragraph>
            각 매장의 특성과 데이터에 맞춰 학습된 언어 모델을 사용하여 신뢰도
            높은 결과를 제공합니다.
          </Typography>
          <Typography variant="h5" paragraph>
            - 직관적인 인터페이스 제공
          </Typography>
          <Typography variant="body1" paragraph>
            사용하기 쉽게 설계된 인터페이스를 통해 매장 관리자는 커스텀 LLM
            기능을 간편하게 사용하고, 고객은 STT(Speech-to-Text) 및
            TTS(Text-to-Speech) 기능으로 음성 서비스를 이용할 수 있습니다.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomLLMSection;
