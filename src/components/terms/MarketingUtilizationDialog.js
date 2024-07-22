// src/components/MarketingUtilizationDialog.js

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const MarketingUtilizationDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>마케팅 정보 수신 동의서</DialogTitle>
      <DialogContent>
        <Typography variant="body1" component="div">
          pixy('회사')는 고객님께 보다 나은 서비스를 제공하고자, 마케팅 정보를 제공해드리고자 합니다. 이에 따라, 고객님께서는 아래의 내용을 확인하시고 마케팅 정보 수신에 동의하실 수 있습니다.
          <br /><br />
          1. 수집하는 개인정보 항목<br />
          회사는 마케팅 정보 수신을 위해 다음과 같은 개인정보 항목을 수집합니다.
          <br /><br />
          - 이름<br />
          - 이메일 주소<br />
          - 전화번호<br />
          - 주소<br /><br />
          2. 마케팅 정보의 수신 목적<br />
          회사는 수집한 개인정보를 다음과 같은 목적을 위해 사용합니다.
          <br /><br />
          - 신규 서비스 및 신제품 안내<br />
          - 이벤트 및 프로모션 정보 제공<br />
          - 고객 맞춤형 서비스 및 혜택 제공<br />
          - 설문조사 및 고객 의견 수렴<br /><br />
          3. 마케팅 정보의 수신 방법<br />
          회사는 다음과 같은 방법으로 마케팅 정보를 제공합니다.
          <br /><br />
          - 이메일<br />
          - 문자 메시지(SMS/MMS)<br />
          - 전화<br />
          - 우편물<br /><br />
          4. 마케팅 정보 수신 동의 여부<br />
          고객님께서는 마케팅 정보 수신에 동의하지 않을 권리가 있으며, 동의를 거부하더라도 서비스 이용에는 제한이 없습니다. 다만, 동의를 거부하실 경우, 유익한 정보를 받아보실 수 없습니다.
          <br /><br />
          5. 동의 철회 방법<br />
          고객님께서는 언제든지 마케팅 정보 수신 동의를 철회하실 수 있습니다. 동의 철회는 다음과 같은 방법으로 가능합니다.
          <br /><br />
          - 이메일: privacy@pixy.com<br />
          - 전화: 02-1234-5678<br />
          - 문자 메시지: 수신된 문자에 '수신거부' 회신<br />
          - 우편: 서울특별시 강남구 테헤란로 123, pixy 고객센터<br /><br />
          6. 동의서 내용<br />
          아래의 체크박스를 선택하시면, 마케팅 정보 수신에 동의하는 것으로 간주됩니다.
          <br /><br />
          □ 이메일로 마케팅 정보 수신에 동의합니다.<br />
          □ 문자 메시지(SMS/MMS)로 마케팅 정보 수신에 동의합니다.<br />
          □ 전화로 마케팅 정보 수신에 동의합니다.<br />
          □ 우편물로 마케팅 정보 수신에 동의합니다.<br /><br />
          고객님의 개인정보는 마케팅 정보 수신 목적 외에는 사용되지 않으며, 개인정보 보호법 등 관련 법령에 따라 안전하게 관리됩니다.
          <br /><br />
          [동의서 제출]<br /><br />
          고객님의 성명: ____________________<br />
          이메일 주소: ____________________<br />
          전화번호: ____________________<br />
          주소: ____________________<br /><br />
          고객님의 서명: ____________________<br />
          날짜: ____________________
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

export default MarketingUtilizationDialog;
