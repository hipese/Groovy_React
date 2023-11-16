import style from "./Attendence.module.css";
import AttendenceMain from "./AttendenceMain/AttendenceMain";
import { Routes, Route } from "react-router-dom";
import AttendenceStatus from "./AttendenceStatus/AttendenceStatus";
import AttendenceWrite from "./AttendenceWrite/AttendenceWrite";
import Attendence_Detail from "./AttendenceDetail/AttendenceDetail";
import AttendenceWait from "./AttendenceWait/AttendenceWait";
import AttendenceComplete from "./AttendenceComplete/AttendenceComplete";
import AttendenceProgress from "./AttendenceProgress/AttendenceProgress";

const Attendence = () => {
    return (
        <div className={style.sign_container}>
            <Routes>
                <Route path="/" element={<AttendenceMain />} />
                <Route path="/attendenceStatus" element={<AttendenceStatus />} />
                <Route path="/attendenceWrite" element={<AttendenceWrite />} />
                <Route path="/detail/:seq" element={<Attendence_Detail />} />
                <Route path="/attendenceWait" element={<AttendenceWait />} />
                <Route path="/attendenceProgress" element={<AttendenceProgress />} />
                <Route path="/attendenceComplete" element={<AttendenceComplete />} />
            </Routes>
        </div>
    );
}

export default Attendence;