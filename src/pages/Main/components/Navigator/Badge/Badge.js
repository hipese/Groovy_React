import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell.png";
import { useWebSocket } from "../../../../../WebSocketContext/WebSocketContext";
import { LoginContext } from "../../../../../App";
import axios from "axios";

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
  const [notifications, setNotifications] = useState({ seq: "", recipient: "", title: "", contents: "", write_date: "" });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const stompClient = useWebSocket();
  const { loginID } = useContext(LoginContext);

  const fetchNotifications = () => {
    axios.get('/api/realtime_notification')
      .then(resp => {
        setNotifications(prevNotifications => resp.data);
        console.log(notifications);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    // WebSocket으로부터 메시지를 받았을 때 실행되는 콜백 함수
    const handleWebSocketMessage = (message) => {
      fetchNotifications();
      console.log(notifications);
    };

    // stompClient가 있을 때만 구독 설정
    if (stompClient) {
      const subscription = stompClient.subscribe('/topic/' + loginID, (response) => {
        // console.log(response);
        // console.log(JSON.parse(response.body));
        handleWebSocketMessage(response);
      });
      // 컴포넌트가 언마운트 될 때 구독 취소
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, loginID]);

  const handleBellClick = () => {
    // 알림창 열기/닫기 상태 변경
    setIsNotificationOpen(!isNotificationOpen);
    console.log(isNotificationOpen);

    if (isNotificationOpen) {
      axios.put('/api/realtime_notification')
        .then(resp => {
          setNotifications([]);
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [notifications]);


  return (
    <BellContainer>
      <StyledBadge color="error" badgeContent={notifications.length} showZero>
        <BellIcon src={Bell} alt="bell" onClick={handleBellClick} />
      </StyledBadge>

      {isNotificationOpen && (
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
            <div key={index}>{notification.contents}</div>
          ))}
        </div>
      )}
    </BellContainer>
  );
}

export default DotBadge;