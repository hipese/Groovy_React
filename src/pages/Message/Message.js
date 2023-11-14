import { Col, Container, Input, Row } from "reactstrap";
import style from "./Message.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Message_Room from "./Message_Room";
import { createContext } from "react";

const SelectContext = createContext();
const ProfileContext = createContext();
let Message = () => {
    
    const [selectedRoom, setSelectedRoom] = useState("");
    const [roomInfo, setRoomInfo] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [recentMessage, setRecentMessage] = useState([]);

    useEffect(() => {
        axios.get(`/api/message/getRoomInfo`).then(resp => {
            setRoomInfo(resp.data)
            axios.get(`/api/message/getProfiles`).then(resp => {
                setProfiles(resp.data)
                axios.get(`/api/message/getRecentMessage`).then(resp => {
                    setRecentMessage(resp.data) 
                }).catch(err => {
                    console.log(err.data)
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err);
        }).finally(()=>{
            console.log(roomInfo);
            console.log(profiles);
            console.log(recentMessage);
        })
    }, [])

    const roomObjectClickHandler = (room_seq) => {
        setSelectedRoom(room_seq);
    }

    return (
        <Container className={style.container}>
            <Row className={style.row_container}>
                <Col className={style.chat_room_list_container}>
                    <Row className={style.chat_room_list}>
                        {
                            recentMessage.map(room => {
                                return (
                                    <Row className={style.chat_room_object} key={room.room_seq} onClick={()=>(roomObjectClickHandler(room.room_seq))}>
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
                                                        if(index <= 1)
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
                                                <Col xs={12} className={style.room_name}>
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
                                    </Row>
                                )
                            })
                            
                        }
                    </Row>
                </Col>
                <Col className={style.chat_room_container}>
                    <SelectContext.Provider value={{ selectedRoom }}>
                        <ProfileContext.Provider value={{ profiles }}>
                            <Message_Room/>
                        </ProfileContext.Provider>
                    </SelectContext.Provider>
                </Col>
            </Row>
        </Container>
    )
};

export default Message;
export {SelectContext, ProfileContext};