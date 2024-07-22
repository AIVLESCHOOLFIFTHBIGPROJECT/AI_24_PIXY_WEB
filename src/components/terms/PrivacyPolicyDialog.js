import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const PrivacyPolicyDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>개인정보처리방침</DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">
          제1조 (개인정보의 처리 목적)<br />
          pixy('회사')는 다음의 목적을 위해 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.<br /><br />
          1. 무인매장 서비스 제공 및 관리<br />
          &nbsp;&nbsp;&nbsp;&nbsp;CCTV를 통한 매장 내 활동 감지<br />
          &nbsp;&nbsp;&nbsp;&nbsp;판매량 예측 및 분석<br />
          &nbsp;&nbsp;&nbsp;&nbsp;무인매장 운영 및 관리<br />
          &nbsp;&nbsp;&nbsp;&nbsp;회원 가입 및 관리<br />
          2. 회원제 서비스 이용에 따른 본인 확인<br />
          &nbsp;&nbsp;&nbsp;&nbsp;회원자격 유지 및 관리<br />
          &nbsp;&nbsp;&nbsp;&nbsp;불만 처리 등 민원 처리<br />
          3. 마케팅 및 광고에의 활용<br />
          &nbsp;&nbsp;&nbsp;&nbsp;신규 서비스 개발 및 맞춤 서비스 제공<br />
          &nbsp;&nbsp;&nbsp;&nbsp;이벤트 및 광고성 정보 제공 및 참여 기회 제공<br />
          4. 고객 지원 및 서비스 개선<br />
          &nbsp;&nbsp;&nbsp;&nbsp;고객 문의 응대<br />
          &nbsp;&nbsp;&nbsp;&nbsp;서비스 개선을 위한 데이터 분석<br />
          5. 법적 의무 준수<br />
          &nbsp;&nbsp;&nbsp;&nbsp;관련 법령 준수<br /><br />
          제2조 (처리하는 개인정보의 항목)<br />
          회사는 다음의 개인정보 항목을 처리하고 있습니다.<br />
          1. 회원 가입 시: 이름, 이메일, 비밀번호, 전화번호, 주소<br />
          2. 무인매장 서비스 이용 시: CCTV 영상, 방문 시간, 구매 내역, IP 주소, 쿠키, 서비스 이용 기록<br />
          3. 고객 문의 시: 이름, 이메일, 문의 내용<br /><br />
          제3조 (개인정보의 처리 및 보유 기간)<br />
          회사는 법령에 따른 개인정보 보유 및 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유 및 이용 기간 내에서 개인정보를 처리 및 보유합니다.<br />
          1. 회원 가입 및 관리: 회원 탈퇴 시까지<br />
          2. 무인매장 서비스 제공: 서비스 이용 계약 기간 동안<br />
          3. 마케팅 및 광고: 동의 철회 시까지<br /><br />
          제4조 (개인정보의 제3자 제공)<br />
          회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.<br /><br />
          제5조 (개인정보처리 위탁)<br />
          회사는 원활한 개인정보 업무 처리를 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.<br />
          1. 위탁받는 자: ABC 보안회사<br />
          &nbsp;&nbsp;&nbsp;&nbsp;위탁하는 업무의 내용: 무인매장 내 CCTV 관리 및 운영<br />
          2. 위탁받는 자: XYZ 데이터 분석 회사<br />
          &nbsp;&nbsp;&nbsp;&nbsp;위탁하는 업무의 내용: 판매량 예측 및 데이터 분석<br />
          3. 위탁받는 자: 123 고객지원센터<br />
          &nbsp;&nbsp;&nbsp;&nbsp;위탁하는 업무의 내용: 고객 문의 응대 및 지원 서비스<br /><br />
          제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사 방법)<br />
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br />
          1. 개인정보 열람 요청<br />
          2. 오류 등이 있을 경우 정정 요청<br />
          3. 삭제 요청<br />
          4. 처리 정지 요청<br /><br />
          제7조 (개인정보의 안전성 확보 조치)<br />
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br />
          1. 관리적 조치: 내부 관리 계획 수립 및 시행, 정기적 직원 교육<br />
          2. 기술적 조치: 개인정보처리시스템 등의 접근 권한 관리, 고유식별정보의 암호화<br />
          3. 물리적 조치: 전산실, 자료 보관실 등의 접근 통제<br /><br />
          제8조 (개인정보 보호 책임자)<br />
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.<br />
          개인정보 보호 책임자: 최성찬<br />
          연락처: 02-1234-5678, privacy@pixy.com<br /><br />
          제9조 (개인정보처리방침 변경)<br />
          이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있을 경우에는 변경 사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.<br />
          공고일자: 2024년 7월 18일<br />
          시행일자: 2024년 7월 25일
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
