import { Col, Row } from "reactstrap";
import style from "./Message_Chat_Component.module.css";
import { format } from 'date-fns';

const MessageRight = (props) => {
    return (
        <Col xs={12} className={style.msg_right_container}>
            <Row className={style.msg_right}>
                <Col xs={1} className={style.msg_right_time_container}>
                    {
                        format(new Date(props.msg.write_time), "a h:mm")
                    }
                </Col>
                <Col xs={11} className={style.msg_right_contents}>
                <div className={style.msg_right}>{props.msg.contents}</div>
                </Col>
            </Row>
            
        </Col>
    )
} 

export default MessageRight;