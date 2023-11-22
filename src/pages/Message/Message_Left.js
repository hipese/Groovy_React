import { Col, Row } from "reactstrap";
import style from "./Message_Chat_Component.module.css";
import { useContext } from "react";
import { MembersInfoContext, ProfileContext, SelectContext } from "./Message";
import { format } from 'date-fns';

const MessageLeft = (props) => {
    const { profiles } = useContext(ProfileContext);
    const {selectedRoom} = useContext(SelectContext);
    const { membersInfo } = useContext(MembersInfoContext);

    const memberInfo = membersInfo.find((memberInfo) => memberInfo.id === props.msg.id);

    return(
        <Col xs={12} className={style.msg_left_container}>
            <Row className={style.msg_left}>
                <Col xs={3} className={style.msg_left_img_container}>
                    <div className={style.profile_box}>
                        {
                            memberInfo.profile_image ?
                            <img src={`/profiles/${memberInfo.profile_image}`} alt="profile" className={style.profile_image} ></img> :
                            <img src={`/assets/Default_pfp.svg`} alt="profile" className={style.profile_image}></img>
                        }
                    </div>
                </Col>
                <Col xs={8} className={style.msg_left_info_container}>
                    <Row className={style.msg_left_name_container}>
                        <Col xs={12} className={style.msg_left_name}>
                        {
                            memberInfo.name + " " + memberInfo.position
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