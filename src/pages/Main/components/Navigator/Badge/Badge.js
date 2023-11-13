import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell.png";
import { useWebSocket } from "../../../../../WebSocketContext/WebSocketContext";
import { LoginContext } from "../../../../../App";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const dropdownRef = React.useRef(null); // 드롭다운 참조를 위한 ref


  const fetchNotifications = () => {
    axios.get('/api/realtime_notification')
      .then(resp => {
        setNotifications(prevNotifications => resp.data);
        console.log(resp.data);
      })
      .catch(e => {
        console.error(e);
      });
  };


  useEffect(() => {
    const handleWebSocketMessage = (message) => {
      // WebSocket 메시지를 처리하고 상태를 업데이트
      const receivedMessage = JSON.parse(message.body);
      console.log(receivedMessage);

      // 서버에서 받은 메시지 구조를 클라이언트 상태 구조로 변환
      const transformedMessage = {
        parent_seq: receivedMessage.parent_seq,
        // recipient: receivedMessage.recipient,
        contents: receivedMessage.message, // 서버의 'message'를 클라이언트의 'contents'로 변환
        // write_date: receivedMessage.write_date,
      };
      console.log(transformedMessage);
      setNotifications((prevNotifications) => [...prevNotifications, transformedMessage]);
    };

    if (stompClient) {
      const subscription = stompClient.subscribe('/topic/' + loginID, (response) => {
        handleWebSocketMessage(response);
      });

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
  }, []);
  
  //알림창 범위를 벗어나는 부분을 클릭하면 닫히게 하는 코드
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  return (
    <BellContainer>
      <StyledBadge color="error" badgeContent={notifications.length} showZero>
        <BellIcon src={Bell} alt="bell" onClick={handleBellClick} />
      </StyledBadge>

      {isNotificationOpen && (
        <div
          ref={dropdownRef} 
          style={{
            position: "absolute",
            top: "40px",
            right: "5px",
            width: "300px",
            padding: "20px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {notifications.map((notification, index) => (
            <div key={index}><Link to={`/Groovy/signlist/detail/${notification.parent_seq}`}>{notification.contents}</Link></div>
          ))}
        </div>
      )}
    </BellContainer>
  );
}

export default DotBadge;