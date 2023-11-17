import { Col, Container, Input, Row } from "reactstrap";
import style from "./Message.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message_Room from "./Message_Room";
import { createContext } from "react";
import { useWebSocket } from "../../WebSocketContext/WebSocketContext";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from "react";
import MuiButton from "@mui/material/Button";

const SelectContext = createContext();
const ProfileContext = createContext();
const MessageContext = createContext();
let Message = () => {

    const [selectedRoom, setSelectedRoom] = useState("");
    const [roomInfo, setRoomInfo] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [recentMessage, setRecentMessage] = useState([]);
    const stompClient = useWebSocket();
    const [messages, setMessages] = useState([]);
    const recentMessageRef = useRef(recentMessage);
    const messagesRef = useRef(messages);
    const selectedRoomRef = useRef(selectedRoom);
    const roomInfoRef = useRef(roomInfo);
    const [openDialog, setOpenDialog] = useState(false);
    const [leaveRoom, setLeaveRoom] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        recentMessageRef.current = recentMessage;
    }, [recentMessage])
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages])
    useEffect(() => {
        selectedRoomRef.current = selectedRoom;
    }, [selectedRoom])
    useEffect(() => {
        roomInfoRef.current = roomInfo;
    }, [roomInfo])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomInfoResponse = await axios.get(`/api/message/getRoomInfo`);
                setRoomInfo(() => {
                    // Stomp 구독
                    if (stompClient) {
                        roomInfoResponse.data.forEach(info => {
                            let subscription = stompClient.subscribe('/topic/message/' + info.seq, (response) => {
                                receiveMessage(response);
                            });
                            console.log(subscription)
                            setSubscriptions(prev => [...prev, {room_seq : info.seq, subscription : subscription}]);
                        });
                    }
                    return roomInfoResponse.data;
                });

                const profilesResponse = await axios.get(`/api/message/getProfiles`);
                setProfiles(profilesResponse.data);

                const recentMessageResponse = await axios.get(`/api/message/getRecentMessage`);
                setRecentMessage(recentMessageResponse.data);


            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [stompClient]); // 필요한 경우 의존성 추가


    const receiveMessage = (resp) => {
        console.log(recentMessageRef)
        const copyRecent = [JSON.parse(resp.body)].concat(recentMessageRef.current.filter(recent => recent.room_seq != JSON.parse(resp.body).room_seq));
        setRecentMessage(copyRecent);
        if(JSON.parse(resp.body).room_seq == selectedRoomRef.current) {
            setMessages([...messagesRef.current, JSON.parse(resp.body)]);
            axios.put("/api/message/readMessage", null, { params: { room_seq: selectedRoomRef.current } }).then(resp => {
                const copyInfo = roomInfoRef.current.map(info => {
                    if (info.seq == selectedRoomRef.current)
                        info.is_read = true;
                    return info;
                })
                setRoomInfo(copyInfo)
            }).catch(err => console.log(err))
        } else {
            const copyInfo = roomInfoRef.current.map(info => {
                if (info.seq == JSON.parse(resp.body).room_seq)
                    info.is_read = false;
                return info;
            })
            setRoomInfo(copyInfo)
        }
            
    }

    const roomObjectClickHandler = (room_seq) => {

        setSelectedRoom(room_seq);
        axios.put("/api/message/readMessage", null, { params: { room_seq: room_seq } }).then(resp => {
            const copy = roomInfo.map(info => {
                if (info.seq == room_seq)
                    info.is_read = true;
                return info;
            })
            setRoomInfo(copy)
        }).catch(err => console.log(err))
    }

    const closeSvgClickHandler = (room_seq) => {
        setLeaveRoom(room_seq);
        setOpenDialog(true)
    }

    const dialogAgree = () => {
        axios.delete("/api/message/leaveRoom",{params : {room_seq : leaveRoom}}).then((resp) => {
            let copy = recentMessage.filter(prev => prev.room_seq != leaveRoom)
            setRecentMessage(copy);
        }).catch(err => console.log(err)).finally( () => {
            subscriptions.find((sub) => sub.room_seq == leaveRoom).subscription.unsubscribe();
            const copySubs = subscriptions.filter(sub => sub.room_seq != leaveRoom);
            setSubscriptions(copySubs);
            setLeaveRoom("");
            setSelectedRoom("");
        });

        setOpenDialog(false)
    }

    const dialogDisagree = () => {
        setOpenDialog(false)
    }



    return (
        <Container className={style.container} fluid>
            <Row className={style.row_container}>
                <Col className={style.chat_room_list_container}>
                    <Row className={style.chat_room_list}>
                        {
                            recentMessage.map(room => {
                                return (
                                    <Row className={style.chat_room_object} key={room.room_seq} onClick={() => (roomObjectClickHandler(room.room_seq))}>
                                        <Col xs={4} className={style.room_profile_container}>
                                            <Row className={style.room_profile}>
                                                {
                                                    profiles.filter(profile => profile.room_seq == room.room_seq).length == 1
                                                        ?
                                                        profiles.filter(profile => profile.room_seq == room.room_seq).map((profile, index) => {
                                                            return (
                                                                <Col xs={12} className={style.profile_box} key={index}>
                                                                    {
                                                                        profile.profile_image ?
                                                                            <img src={`/profiles/${profile.profile_image}`} key={index} alt="profile" className={style.profile_image} ></img> :
                                                                            <img src={`/assets/Default_pfp.svg`} key={index} alt="profile" className={style.profile_image}></img>
                                                                    }
                                                                </Col>
                                                            )
                                                        })
                                                        :
                                                        <Col xs={12} className={style.profile_multibox}>
                                                            {profiles.filter(profile => profile.room_seq == room.room_seq).map((profile, index) => {
                                                                if (index <= 1)
                                                                    return (
                                                                        <>
                                                                            {
                                                                                profile.profile_image ?
                                                                                    <img src={`/profiles/${profile.profile_image}`} key={index} alt="profile" className={index ? style.profile_image1 : style.profile_image2} ></img> :
                                                                                    <img src={`/assets/default.png`} alt="profile" key={index} className={index ? style.profile_image1 : style.profile_image2}></img>
                                                                            }
                                                                        </>
                                                                    )
                                                            })}
                                                        </Col>
                                                }
                                            </Row>
                                        </Col>
                                        <Col xs={8} className={style.room_info_container}>
                                            <Row className={style.room_name_container}>
                                                <Col xs={12} className={style.room_name_object}>
                                                    {
                                                        roomInfo.filter(info => info.seq == room.room_seq)[0].room_name
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className={style.recent_message_container}>
                                                <Col xs={12} className={style.recent_message}>
                                                    {room.contents}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <div className={style.is_read} key={room.room_seq} hidden={roomInfo.filter(info => info.seq == room.room_seq)[0].is_read}></div>
                                        <Tooltip title="나가기">
                                            <CloseIcon className={style.closeIcon} color="action" fontSize="small" onClick={(e)=>{e.stopPropagation(); closeSvgClickHandler(room.room_seq)}}></CloseIcon>
                                        </Tooltip>
                                    </Row>
                                )
                            })

                        }
                    </Row>
                </Col>
                <Col className={style.chat_room_container}>
                    <MessageContext.Provider value={{ messages, setMessages }}>
                        <SelectContext.Provider value={{ selectedRoom }}>
                            <ProfileContext.Provider value={{ profiles }}>
                                <Message_Room />
                            </ProfileContext.Provider>
                        </SelectContext.Provider>
                    </MessageContext.Provider>
                </Col>
            </Row>
            <Dialog
                open={openDialog}
                keepMounted
                onClose={dialogDisagree}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"방을 나가시겠습니까?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        방을 나가면 다시 복구 할 수 없습니다.<br></br>
                        정말로 나가시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={dialogDisagree}>취소</MuiButton>
                    <MuiButton onClick={dialogAgree}>확인</MuiButton>
                </DialogActions>
            </Dialog>
        </Container>
    )
};

export default Message;
export { SelectContext, ProfileContext, MessageContext };