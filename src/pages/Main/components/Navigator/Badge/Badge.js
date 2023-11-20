import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell2.svg";
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
import Grow from '@mui/material/Grow';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

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

  const dropdownRef = React.useRef(null); // 드롭다운 참조를 위한 ref
  const notificationsRef = useRef(notifications);

  useEffect(() => {
    notificationsRef.current = notifications;
  }, [notifications])


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
        contents: receivedMessage.message, // 서버의 'message'를 클라이언트의 'contents'로 변환
      };
      console.log(transformedMessage);
      if (!((window.location.pathname.includes("/Groovy/message") && transformedMessage.contents.includes("메시지")) || (!window.location.pathname.includes("/Groovy/message") && notificationsRef.current.filter(notice => notice.contents.includes("메시지")).length >= 1))) {
        setNotifications((prevNotifications) => [transformedMessage, ...prevNotifications]);
        setOpen(true);
      }
    };

    if (stompClient) {
      const subscription = stompClient.subscribe('/queue/' + loginID, (response) => {
        handleWebSocketMessage(response);
      });

      const newTopicSubscription = stompClient.subscribe('/topic/board', (response) => {
        handleWebSocketMessage(response);
      });

      return () => {
        subscription.unsubscribe();
        newTopicSubscription.unsubscribe();
      };
    }
  }, [stompClient, loginID]);


  //아이콘을 클릭하여 창을 닫음
  const handleBellClick = (event) => {
    event.stopPropagation();
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    } else {
      setIsNotificationOpen(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }
    if (isNotificationOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNotificationOpen]);



  const handleNotificationCheck = async (parent_seq) => {
    if (parent_seq != null) {
      const realtime_notificationResponse = await axios.put(`/api/realtime_notification/${parent_seq}`)
        .then(resp => {

        })
        .catch(e => {
          console.error(e);
        });
    }
    fetchNotifications();
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

      <Grow in={isNotificationOpen}>
        <div ref={dropdownRef} className={style.noticeContainer}>
          {notifications.map((notification, index) => (
            <div key={index} className={style.notice} onClick={() => handleNotificationCheck(notification.parent_seq)}>
              {notification.contents.includes("결재") && (
                <Link to={`/Groovy/signlist/detail/${notification.parent_seq}`}>
                  {notification.contents.includes("승인") ? (
                    <Alert severity="success">{notification.contents}</Alert>
                  ) : notification.contents.includes("반려") ? (
                    <Alert severity="error">{notification.contents}</Alert>
                  ) : notification.contents.includes("도착") ? (
                    <Alert severity="info">{notification.contents}</Alert>
                  ) : (
                    <React.Fragment />
                  )}
                </Link>
              )}

              {notification.contents.includes("휴가") && (
                <Link to={`/Groovy/attendence/detail/${notification.parent_seq}`}>
                  {notification.contents.includes("승인") ? (
                    <Alert severity="success">{notification.contents}</Alert>
                  ) : notification.contents.includes("반려") ? (
                    <Alert severity="error">{notification.contents}</Alert>
                  ) : notification.contents.includes("도착") ? (
                    <Alert severity="info">{notification.contents}</Alert>
                  ) : (
                    <React.Fragment />
                  )}
                </Link>
              )}

              {notification.contents.includes("메시지") //&& location.pathname != "/Groovy/message/"
                //&& notifications.filter(notice => notice.contents.includes("메시지")).length <= 1 
                && (
                  <Link to={`/Groovy/message/`}>
                    <Alert severity="info">{notification.contents}</Alert>
                  </Link>
                )}

              {notification.contents.includes("프로젝트")
                && (
                  <Link to={`/Groovy/dashboard/project/content/${notification.parent_seq}`}>
                    <Alert severity="info">{notification.contents}</Alert>
                  </Link>
                )}

              {notification.contents.includes("공지") && (
                <Link to={`/Groovy/board/com`}>
                  <Alert severity="info">{notification.contents}</Alert>
                </Link>
              )}

            </div>
          ))}
          {notifications.length === 0 && (
            <div className={style.notice}>
              <CommentsDisabledIcon /><br />
              알림이 없습니다.
            </div>
          )}
        </div>
      </Grow>

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