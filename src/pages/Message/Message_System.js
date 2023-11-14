import { Col } from "reactstrap";
import style from "./Message_Chat_Component.module.css";


const MessageSystem = (props) => {
    return (
        <Col xs={12} className={style.system_msg_container}>
            <div className={style.system_msg}>{props.msg.contents}</div>
        </Col>
    )
}

export default MessageSystem;