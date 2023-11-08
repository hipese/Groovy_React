import { Route, Routes } from "react-router-dom";
import Message from "./Message";
import Message_Create from "./Message_Create";

let Message_Route = () => {
    return (
        <Routes>
            <Route path="/" element={<Message />} />
            <Route path="/create" element={<Message_Create />} />
        </Routes>
    )
}

export default Message_Route;