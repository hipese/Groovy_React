import DocumentList from "../Components/Table/DocumentList";
import style from "./Attendence.module.css";
import AttendenceMain from "./AttendenceMain/AttendenceMain";
import { Routes, Route } from "react-router-dom";

const Attendence = () => {
    return (
        <div className={style.sign_container}>
            <Routes>
                <Route path="/" element={<AttendenceMain />} />
            </Routes>
        </div>
    );
}

export default Attendence;