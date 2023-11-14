import { Button, Col, Input, Row } from "reactstrap";
import style from "./Message_Room.module.css";
import { useContext, useRef, useState } from "react";
import { SelectContext } from "./Message"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import MessageRight from "./Message_Right";
import MessageLeft from "./Message_Left";
import MessageSystem from "./Message_System";

const Message_Room = () => {
    const {selectedRoom} = useContext(SelectContext)
    const {loginID} = useContext(LoginContext);
    const [messages, setMessages] = useState([]);
    const [myMessage, setMyMessage] = useState("");
    const placeholderElement = useRef(null);
    
    useEffect(() => {
        setMyMessage("");
        console.log("selectedRoom : " + selectedRoom)
        axios.get(`/api/message/selectByRoomSeq`,{params:{room_seq : selectedRoom}}).then(resp => {
            setMessages(resp.data);
        }).catch(err=>console.log(err)).finally(console.log(messages));
    },[selectedRoom])

    const onMyMessageChangeHandler = (e) => {
        setMyMessage(e.target.value);
    }

    const onKeyDownHandler = (e) => {
        if(e.key == "Enter" && e.shiftKey == false)
            console.log(myMessage);
    }

    return (
        <>
            { selectedRoom == "" ? 
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
                    <Col xs={12} style={{width:"100%", height:"100%"}}>
                        <Row className={style.chat_area_container}>
                            {
                                messages.map((msg, index) => {
                                    if(msg.id === "System")
                                        return (<MessageSystem msg={msg} key={index} />)
                                    else if(msg.id == loginID)
                                        return (<MessageRight msg={msg} key={index} />)
                                    else
                                        return (<MessageLeft msg={msg} key={index} />)
                                })
                            }
                        </Row>
                        <Row className={style.input_area_container}>
                            <Col xs={12} className={style.input_area}>
                                <textarea className={style.input_my_message} onChange={onMyMessageChangeHandler} onKeyDown={onKeyDownHandler} value={myMessage} placeholder="메시지 입력..."></textarea>
                                {/* <div className={style.input_placeholder} ref={placeholderElement}>메시지를 입력...</div> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            
        </>
    )
}

export default Message_Room;