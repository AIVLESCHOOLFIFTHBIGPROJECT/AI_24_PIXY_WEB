import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api"; // api.js를 import합니다
import PrivacyPolicyDialog from "../components/terms/PrivacyPolicyDialog";
import UseTermsDialog from "../components/terms/UseTermsDialog";
import MarketingUtilizationDialog from "../components/terms/MarketingUtilizationDialog";
import AuthHeader from "../components/AuthHeader";

const SignUp = () => {
  const [formData, setFormData] = useState({
    business_r: null,
    email: "",
    name: "",
    p_num: "",
    r_num: "",
    password: "",
    confirm_password: "",
    is_agreement1: false,
    is_agreement2: false,
    is_agreement3: false,
    store_name: "",
    verification_code: "",
  });
  const [errors, setErrors] = useState({});
  const [isAgreementAll, setIsAgreementAll] = useState(false);
  const [step, setStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
  const [isPhoneNumberCheckSent, setIsPhoneNumberCheckSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] =
    useState(false); // 사업자등록번호 유효성 상태 추가
  const navigate = useNavigate();

  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [openUseTerms, setOpenUseTerms] = useState(false);
  const [openMarketingUtilization, setOpenMarketingUtilization] =
    useState(false);

  const handleOpenPrivacyPolicy = () => {
    setOpenPrivacyPolicy(true);
  };

  const handleClosePrivacyPolicy = () => {
    setOpenPrivacyPolicy(false);
  };

  const handleOpenUseTerms = () => {
    setOpenUseTerms(true);
  };

  const handleCloseUseTerms = () => {
    setOpenUseTerms(false);
  };

  const handleOpenMarketingUtilization = () => {
    setOpenMarketingUtilization(true);
  };

  const handleCloseMarketingUtilization = () => {
    setOpenMarketingUtilization(false);
  };

  useEffect(() => {
    if (formData.is_agreement1 && formData.is_agreement2 && formData.is_agreement3) {
      setIsAgreementAll(true);
    } else {
      setIsAgreementAll(false);
    }
  }, [formData.is_agreement1, formData.is_agreement2, formData.is_agreement3]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (name === "p_num" && value.length <= 13) {
      newValue = formatPhoneNumber(value);
    }
    if (name === "r_num") {
      newValue = formatRegistrationNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    validateField(name, newValue);
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      business_r: e.target.files[0],
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "confirm_password" && key !== "verification_code") {
        data.append(key, formData[key]);
      }
    });

    try {
      await api.post("/api/user/signup/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };

  const handleAgreementAllChange = (e) => {
    const { checked } = e.target;
    setIsAgreementAll(checked);
    setFormData((prev) => ({
      ...prev,
      is_agreement1: checked,
      is_agreement2: checked,
      is_agreement3: checked,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          error = "유효한 이메일 주소를 입력하세요.";
        }
        break;
      case "password":
        if (value.length < 8 || value.length > 16) {
          error = "비밀번호는 8~16자리이어야 합니다.";
        } else if (
          !/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)
        ) {
          error =
            "비밀번호는 영문자, 숫자, 특수문자가\n하나 이상 포함되어야 합니다.";
        }
        break;
      case "confirm_password":
        if (value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      case "name":
        if (value.trim() === "") {
          error = "이름을 입력하세요.";
        }
        break;
      case "p_num":
        if (!/^010-\d{4}-\d{4}$/.test(value)) {
          error = "유효한 전화번호를 입력하세요.";
        }
        setIsPhoneNumberCheckSent(false); // 전화번호가 변경되면 중복확인 상태를 초기화
        break;
      case "r_num":
        if (!/^\d{3}-\d{2}-\d{5}$/.test(value)) {
          error = "유효한 등록번호를 입력하세요.\n예: 000-00-00000";
        }
        break;
      case "verification_code":
        if (value.trim() === "") {
          error = "인증 코드를 입력하세요.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const checkPhoneNumber = async () => {
    try {
      await api.post("/api/user/duplicate_phonenumber/normal/", {
        p_num: formData.p_num,
      });
      setIsPhoneNumberVerified(true);
      setIsPhoneNumberCheckSent(true); // 중복확인 버튼이 눌려졌음을 표시
      alert("전화번호 확인 완료");
    } catch (error) {
      console.error("전화번호 중복 확인 실패:", error);
      setIsPhoneNumberVerified(false);
      setIsPhoneNumberCheckSent(false);
      alert("전화번호가 중복되었습니다.");
    }
  };

  const checkBusinessNumber = async () => {
    try {
      const response = await api.post("/api/user/check-business/", {
        b_no: [formData.r_num.replace(/-/g, "")],
      });
      const { data } = response.data;
      if (data[0].tax_type === "국세청에 등록되지 않은 사업자등록번호입니다.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          r_num: "국세청에 등록되지 않은 사업자등록번호입니다.",
        }));
        setIsBusinessNumberVerified(false);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          r_num: "",
        }));
        setIsBusinessNumberVerified(true);
        alert("사업자등록번호 확인 완료");
      }
    } catch (error) {
      console.error("사업자등록번호 확인 실패:", error);
      setIsBusinessNumberVerified(false);
      alert("사업자등록번호 확인 실패");
    }
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length === 7) {
      value = value.replace(/^(\d{3})(\d{0,4})/, "$1-$2");
    } else if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{4})(\d{4}).*/, "$1-$2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{4})(\d{0,4}).*/, "$1-$2-$3");
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,4})/, "$1-$2");
    }
    return value;
  };

  const formatRegistrationNumber = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length === 6) {
      value = value.replace(/^(\d{3})(\d{0,2})/, "$1-$2");
    } else if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{2})(\d{5}).*/, "$1-$2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{3})(\d{2})(\d{0,5}).*/, "$1-$2-$3");
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,2})/, "$1-$2");
    }
    return value;
  };

  const handleSendCode = async () => {
    try {
      await api.post("/api/user/send-code/nonuser/", { email: formData.email });
      setIsCodeSent(true);
      setTimer(300); // 5분 타이머 시작
      alert("인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("인증 코드 전송 실패:", error);
      if (error.response) {
        // 서버 응답이 있는 경우
        if (error.response.status === 400) {
          alert(`인증 코드 전송 실패: 이미 가입된 이메일입니다.`);
        } else {
          alert(`인증 코드 전송 실패: ${error.response.status}`);
        }
      } else if (error.request) {
        // 요청이 이루어졌으나 응답이 없는 경우
        alert("인증 코드 전송 실패: 서버로부터 응답이 없습니다.");
      } else {
        // 기타 에러
        alert(`인증 코드 전송 실패: ${error.message}`);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      await api.post("/api/user/nonuser_verify/", {
        email: formData.email,
        code: formData.verification_code,
      });
      setIsVerified(true);
      alert("인증 성공");
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증 실패");
    }
  };

  const isNextDisabled = () => {
    // console.log(        !formData.email ||
    //   !formData.password ||
    //   !formData.confirm_password ||
    //   !formData.name ||
    //   !formData.p_num ||
    //   !!errors.email ||
    //   !!errors.password ||
    //   !!errors.confirm_password ||
    //   !!errors.name ||
    //   !!errors.p_num ||
    //   !isVerified ||
    //   !isPhoneNumberVerified);
    if (step === 0) {
      return !(formData.is_agreement1 && formData.is_agreement2);
    } else if (step === 1) {
      return (
        !formData.email ||
        !formData.password ||
        !formData.confirm_password ||
        !formData.name ||
        !formData.p_num ||
        !!errors.email ||
        !!errors.password ||
        !!errors.confirm_password ||
        !!errors.name ||
        !!errors.p_num ||
        !isVerified ||
        !isPhoneNumberVerified
      );
    } else if (step === 2) {
      return (
        !formData.store_name ||
        !formData.r_num ||
        !formData.business_r ||
        !!errors.store_name ||
        !!errors.r_num ||
        !isBusinessNumberVerified // 사업자등록번호 확인 상태를 고려
      );
    }
    return false;
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f5f5f5", height: '100%' }}>
        <AuthHeader></AuthHeader>
        <Box
          sx={{
            pt: "128px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //height: "90vh",
            minHeight: "100vh"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: 600,
              minHeight: 600,
              maxHeight: 1200,
              p: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 1,
              //height: "80vh",
              mb: 10,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              {(step === 0 || step === 1 || step === 2) && (
                <Typography variant="h5" align="center" gutterBottom>
                  회원가입
                </Typography>
              )}
              {step === 3 && (
                <Typography variant="h5" align="center" gutterBottom>
                  회원가입 완료
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {step === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "256px",
                    gap: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAgreementAll}
                        onChange={handleAgreementAllChange}
                        name="is_agreement_all"
                      />
                    }
                    label="모두 동의하기"
                  />
                  <Box sx={{ ml: 1, mr: 1 }}>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.is_agreement1}
                            onChange={handleChange}
                            name="is_agreement1"
                            sx={{ transform: "scale(0.8)" }}
                          />
                        }
                        label={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                          >
                            <Typography
                              sx={{
                                fontSize: "12px",
                                lineHeight: "12px",
                                height: "12px",
                                flexGrow: 1,
                              }}
                              component="span"
                            >
                              [필수] 개인정보수집동의
                            </Typography>
                          </Box>
                        }
                        style={{ width: "100%" }}
                      />
                      <Button
                        variant="text"
                        onClick={handleOpenPrivacyPolicy}
                        sx={{
                          fontSize: "12px",
                          lineHeight: "12px",
                          height: "12px",
                          minWidth: "50px",
                        }}
                      >
                        보기
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.is_agreement2}
                          onChange={handleChange}
                          name="is_agreement2"
                          sx={{ transform: "scale(0.8)" }}
                        />
                      }
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              lineHeight: "12px",
                              height: "12px",
                              flexGrow: 1,
                            }}
                            component="span"
                          >
                            [필수] 이용약관동의
                          </Typography>
                        </Box>
                      }
                      style={{ width: "100%" }}
                    />
                    <Button
                      variant="text"
                      onClick={handleOpenUseTerms}
                      sx={{
                        fontSize: "12px",
                        lineHeight: "12px",
                        height: "12px",
                        minWidth: "50px",
                      }}
                    >
                      보기
                    </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.is_agreement3}
                          onChange={handleChange}
                          name="is_agreement3"
                          sx={{ transform: "scale(0.8)" }}
                        />
                      }
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              lineHeight: "12px",
                              height: "12px",
                              flexGrow: 1,
                            }}
                            component="span"
                          >
                            [선택] 마케팅활용동의
                          </Typography>
                        </Box>
                      }
                      style={{ width: "100%" }}
                    />
                    <Button
                      variant="text"
                      onClick={handleOpenMarketingUtilization}
                      sx={{
                        fontSize: "12px",
                        lineHeight: "12px",
                        height: "12px",
                        minWidth: "50px",
                      }}
                    >
                      보기
                    </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              {step === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "256px",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Email@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={isVerified}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleSendCode}
                    disabled={isVerified}
                  >
                    {isCodeSent ? "인증 코드 재전송" : "인증 코드 전송"}
                  </Button>
                  {isCodeSent && (
                    <>
                      <TextField
                        label={`인증 코드${
                          timer > 0
                            ? ` (${Math.floor(timer / 60)}:${(
                                "0" +
                                (timer % 60)
                              ).slice(-2)})`
                            : ""
                        }`}
                        name="verification_code"
                        value={formData.verification_code}
                        onChange={handleChange}
                        required
                        error={!!errors.verification_code}
                        helperText={errors.verification_code}
                        disabled={timer <= 0 || isVerified}
                      />
                      <Button
                        variant="outlined"
                        onClick={handleVerifyCode}
                        disabled={isVerified || timer <= 0}
                      >
                        인증 코드 확인
                      </Button>
                    </>
                  )}
                  <TextField
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!!errors.password}
                    helperText={
                      errors.password && (
                        <Typography
                          variant="caption"
                          color="error"
                          component="div"
                        >
                          {errors.password.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </Typography>
                      )
                    }
                  />
                  <TextField
                    label="비밀번호 확인"
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password}
                  />
                  <TextField
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="휴대폰 번호"
                    name="p_num"
                    value={formData.p_num}
                    onChange={handleChange}
                    required
                    error={!!errors.p_num}
                    helperText={errors.p_num}
                    disabled={isPhoneNumberCheckSent}
                  />
                  <Button
                    variant="outlined"
                    onClick={checkPhoneNumber}
                    disabled={isPhoneNumberCheckSent}
                  >
                    중복 확인
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "256px",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="상호명"
                    name="store_name"
                    value={formData.store_name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="사업자등록번호"
                    name="r_num"
                    value={formData.r_num}
                    onChange={handleChange}
                    required
                    error={!!errors.r_num}
                    helperText={
                      errors.r_num && (
                        <Typography
                          variant="caption"
                          color="error"
                          component="div"
                        >
                          {errors.r_num.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </Typography>
                      )
                    }
                    disabled={isBusinessNumberVerified}
                  />
                  <Button
                    variant="outlined"
                    onClick={checkBusinessNumber}
                    disabled={isBusinessNumberVerified}
                  >
                    사업자등록번호 확인
                  </Button>
                  <Typography variant="subtitle1">
                    사업자등록증 파일 업로드
                  </Typography>
                  <input
                    type="file"
                    name="business_r"
                    onChange={handleFileChange}
                    required
                  />
                </Box>
              )}
              {step === 3 && (
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    회원가입 완료
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    지금 바로 서비스를 이용해보세요!
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {step === 0 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  sx={{ width: "256px" }}
                >
                  다음
                </Button>
              )}
              {step === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "256px",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ width: "100px" }}
                  >
                    이전
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    sx={{ width: "100px" }}
                  >
                    다음
                  </Button>
                </Box>
              )}
              {step === 2 && (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    width: "256px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ width: "100px" }}
                  >
                    이전
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isNextDisabled()}
                    sx={{ width: "100px" }}
                  >
                    회원가입
                  </Button>
                </Box>
              )}
              {step === 3 && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{ width: "300px" }}
                >
                  로그인
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <PrivacyPolicyDialog
        open={openPrivacyPolicy}
        onClose={handleClosePrivacyPolicy}
      />
      <UseTermsDialog open={openUseTerms} onClose={handleCloseUseTerms} />
      <MarketingUtilizationDialog
        open={openMarketingUtilization}
        onClose={handleCloseMarketingUtilization}
      />
    </>
  );
};

export default SignUp;
