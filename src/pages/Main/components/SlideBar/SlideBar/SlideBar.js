import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import styles from "./SlideBar.module.css";
import { Routes, Route, Link } from "react-router-dom";

import AdminSlide from "./Admin/AdminSlide";
import AttendenceSlide from "./Attendence/AttendenceSlide";
import BoardSlide from "./Board/BoardSlide";
import CalendarSlide from "./Calendar/CalendarSlide";
import ContactsSlide from "./Contact/ContactSlide";
import DashBoardSlide from "./DashBoard/DashBoardSlide";
import EMailSlide from "./Email/EmailSlide";
import MessageSlide from "./Message/MessageSlide";
import SignSlide from "./Sign/SignSlide";
import SurveySlide from "./Survey/SurveySlide";
import ToDoListSlide from "./ToDoList/ToDoListSlide";




const SlideBar = () => {
  return (
    <div className={styles.slide}>
      <Routes>
        <Route path="/" element={<DashBoardSlide />} />
        <Route path="/admin/*" element={<AdminSlide />} />
        <Route path="/attendence/*" element={<AttendenceSlide />} />
        <Route path="/board/*" element={<BoardSlide />} />
        <Route path="/calendar/*" element={<CalendarSlide />} />
        <Route path="/contacts/*" element={<ContactsSlide />} />
        <Route path="/mail/*" element={<EMailSlide />} />
        <Route path="/message/*" element={<MessageSlide />} />
        <Route path="/sign/*" element={<SignSlide />} />
        <Route path="/survey/*" element={<SurveySlide />} />
        <Route path="/list/*" element={<ToDoListSlide />} />
      </Routes>
      </div>
  );
};

export default SlideBar;