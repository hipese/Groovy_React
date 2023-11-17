import { Col, Row } from "reactstrap";
import style from "./Message_Chat_Component.module.css";
import { useContext } from "react";
import { ProfileContext, SelectContext } from "./Message";
import { format } from 'date-fns';

const MessageLeft = (props) => {
    const { profiles } = useContext(ProfileContext);
    const {selectedRoom} = useContext(SelectContext)
    return(
        <Col xs={12} className={style.msg_left_container}>
            <Row className={style.msg_left}>
                <Col xs={3} className={style.msg_left_img_container}>
                    {
                        profiles.filter(profile => profile.room_seq == selectedRoom).filter((profile) => profile.id === props.msg.id).map((profile, index) => {
                            return (
                                <div className={style.profile_box} key={index}>
                                    {
                                         profile.profile_image ?
                                         <img src={`/profiles/${profile.profile_image}`} key={index} alt="profile" className={style.profile_image} ></img> :
                                         <img src={`/assets/Default_pfp.svg`} key={index} alt="profile" className={style.profile_image}></img>
                                    }
                                </div>
                            )
                        })
                    }
                </Col>
                <Col xs={8} className={style.msg_left_info_container}>
                    <Row className={style.msg_left_name_container}>
                        <Col xs={12} className={style.msg_left_name}>
                        {
                            profiles.filter(profile => profile.id == props.msg.id)[0].name
                        }
                        </Col>
                    </Row>
                    <Row className={style.msg_left_contents_container}>
                        <Col className={style.msg_left_contents}>
                            {props.msg.contents}
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} className={style.msg_left_time_container}>
                    {
                        format(new Date(props.msg.write_time), "a h:mm")
                    }
                </Col>
            </Row>
        </Col>
    )
}

export default MessageLeft;