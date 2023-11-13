import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell.png";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWebSocket } from "../../../../../WebSocketContext/WebSocketContext";
import { LoginContext } from "../../../../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./Badge.module.css";

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
  const [open, setOpen] = React.useState(false);

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
        setOpen(true);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, loginID]);

  const handleBellClick = () => {
    // 알림창 열기/닫기 상태 변경
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationCheck = (parent_seq) => {
    axios.put(`/api/realtime_notification/${parent_seq}`)
      .then(resp => {
        fetchNotifications();
      })
      .catch(e => {
        console.error(e);
      });
    setIsNotificationOpen(!isNotificationOpen);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        확인
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    fetchNotifications();
  }, []);





  return (
    <BellContainer>
      <StyledBadge color="error" badgeContent={notifications.length} showZero>
        <BellIcon src={Bell} alt="bell" onClick={handleBellClick} />
      </StyledBadge>

      {isNotificationOpen && (
        <div className={style.noticeContainer}>
          {notifications.map((notification, index) => (
            <div key={index} className={style.notice} onClick={() => handleNotificationCheck(notification.parent_seq)}>
              <Link to={`/Groovy/signlist/detail/${notification.parent_seq}`}>
                {notification.contents.includes("승인") ? (
                  <Alert severity="success">{notification.contents}</Alert>
                ) : notification.contents.includes("반려") ? (
                  <Alert severity="error">{notification.contents}</Alert>
                ) : notification.contents.includes("도착") ? (
                  <Alert severity="info">{notification.contents}</Alert>
                ) : (
                  // 모든 조건을 만족하지 않는 경우에 대한 처리
                  // 예를 들면, 기본적인 알림 메시지를 보여줄 수 있습니다.
                  <Alert>{notification.contents}</Alert>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="알림이 도착했습니다."
          action={action}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
         }}
        />
      </div>
    </BellContainer>
  );
}

export default DotBadge;