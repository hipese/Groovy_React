import style from "./Attendence.module.css";
import AttendenceMain from "./AttendenceMain/AttendenceMain";
import { Routes, Route } from "react-router-dom";
import AttendenceStatus from "./AttendenceStatus/AttendenceStatus";

const Attendence = () => {
    return (
        <div className={style.sign_container}>
            <Routes>
                <Route path="/" element={<AttendenceMain />} />
                <Route path="/attendenceStatus" element={<AttendenceStatus />} />
            </Routes>
        </div>
    );
}

export default Attendence;