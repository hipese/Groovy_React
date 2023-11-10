// DotBadge.js

import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell.png";
import { useWebSocket } from "../../../../../WebSocketContext/WebSocketContext";
import { LoginContext } from "../../../../../App";

const StyledBadge = styled(Badge)({
  "& .MuiBadge-dot": {
    position: "absolute",
    top: 2,
    right: 5,
    scale: "0.7",
  },
});

const BellIcon = styled("img")({
  width: "30px",
  height: "32px",
  opacity: "0.8",
  "&:hover": {
    cursor: "pointer",
  },
});

const BellContainer = styled(Box)({
  position: "absolute",
  top: "15px",
  right: "70px",
});

function DotBadge() {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const stompClient = useWebSocket();
  const { loginID } = useContext(LoginContext);

  useEffect(() => {
    // WebSocket으로부터 메시지를 받았을 때 실행되는 콜백 함수
    const handleWebSocketMessage = (message) => {
      const parsedMessage = JSON.parse(message.body);

      // 새로운 알림을 배열에 추가
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        parsedMessage.message,
      ]);


    };

    // stompClient가 있을 때만 구독 설정
    if (stompClient) {
      // /user/{loginID}/queue/notifications 라는 주제로 메시지를 받도록 설정
      const subscription = stompClient.subscribe('/topic/' + loginID, (response) => {
        console.log(response);
        console.log(JSON.parse(response.body));
        handleWebSocketMessage(response);
      });
      // 컴포넌트가 언마운트 될 때 구독 취소
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, loginID]);

  const handleBellClick = () => {
    // 알림창을 열 때 모든 알림 삭제

    // 알림창 열기/닫기 상태 변경
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <BellContainer>
      <StyledBadge color="error" badgeContent={notifications.length} showZero>
        <BellIcon src={Bell} alt="bell" onClick={handleBellClick} />
      </StyledBadge>

      {isNotificationOpen && notifications.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            width: "300px",
            padding: "20px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {notifications.map((notification, index) => (
            <div key={index}>{notification}</div>
          ))}
        </div>
      )}
    </BellContainer>
  );
}

export default DotBadge;
