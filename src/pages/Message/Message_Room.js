import { Row } from "reactstrap";
import style from "./Message_Room.module.css";
import { useContext } from "react";
import { SelectContext } from "./Message"
import { useEffect } from "react";

const Message_Room = () => {
    const {selectedRoom} = useContext(SelectContext)
    
    useEffect(() => {
        console.log("selectedRoom : " + selectedRoom)
    },[selectedRoom])

    return (
        <Row className={style.chatting_room_box}>
            asdf
        </Row>
    )
}

export default Message_Room;