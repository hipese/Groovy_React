import { Col } from "reactstrap";
import style from "./Message_Chat_Component.module.css";

const MessageRight = (props) => {
    return (
        <Col xs={12} className={style.msg_right_container}>
            <div className={style.msg_right}>{props.msg.contents}</div>
        </Col>
    )
} 

export default MessageRight;