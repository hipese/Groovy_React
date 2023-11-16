import { Button, Col, Input, Row } from "reactstrap";
import style from "./Message_Room.module.css";
import { useContext, useRef, useState } from "react";
import { MessageContext, SelectContext } from "./Message"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import MessageRight from "./Message_Right";
import MessageLeft from "./Message_Left";
import MessageSystem from "./Message_System";
import { useWebSocket } from "../../WebSocketContext/WebSocketContext";

const Message_Room = () => {
    const { selectedRoom } = useContext(SelectContext)
    const { loginID } = useContext(LoginContext);
    const {messages, setMessages} = useContext(MessageContext);
    const [myMessage, setMyMessage] = useState("");
    const stompClient = useWebSocket();
    const scrollRef = useRef();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        setMyMessage("");
        axios.get(`/api/message/selectByRoomSeq`, { params: { room_seq: selectedRoom } }).then(resp => {
            setMessages(resp.data);
        }).catch(err => console.log(err))
    }, [selectedRoom])

    const onMyMessageChangeHandler = (e) => {
        setMyMessage(e.target.value);
    }

    const onKeyDownHandler = (e) => {
        if (e.key == "Enter" && e.shiftKey == false) {
            e.preventDefault();
            if (myMessage.trim().length === 0) {
                setMyMessage("");
                return;
            } 
            if (stompClient) {
                stompClient.send("/app/message", {}, JSON.stringify({room_seq : selectedRoom, id : loginID , message : myMessage}));
            }
            scrollToBottom();
            setMyMessage("");
        }
    }

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    return (
        <>
            {selectedRoom == "" ?
                <Row className={style.alert_no_room_choose}>
                    <Col xs={12} className={style.alert_no_room_choose_title} >
                        다른 사용자에게 메시지를 보내보세요.
                    </Col>
                    <Col xs={12} className={style.alert_no_room_choose_btn} >
                        <Link to="/Groovy/message/create">
                            <Button color="primary" className={style.btn_gotocreate}>채팅방 만들기</Button>
                        </Link>
                    </Col>
                </Row>
                :
                <Row className={style.chatting_room_box}>
                    <Col xs={12} style={{ width: "100%", height: "100%" }}>
                        {/* <Row className={style.chat_area_container} ref={scrollRef}> */}
                        <div className={`row ${style.chat_area_container}`} ref={scrollRef}>
                            {
                                messages.map((msg, index) => {
                                    if (msg.id === "System")
                                        return (<MessageSystem msg={msg} key={index} />)
                                    else if (msg.id == loginID)
                                        return (<MessageRight msg={msg} key={index} />)
                                    else
                                        return (<MessageLeft msg={msg} key={index} />)
                                })
                            }
                            {/* </Row> */}
                        </div>
                        <Row className={style.input_area_container}>
                            <Col xs={12} className={style.input_area}>
                                <textarea className={style.input_my_message} onChange={onMyMessageChangeHandler} onKeyDown={onKeyDownHandler} value={myMessage} placeholder="메시지 입력..."></textarea>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }

        </>
    )
}

export default Message_Room;