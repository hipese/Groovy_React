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
    <Container className={styles.slidebar} fluid>
      <Routes>
        <Route path="/" element={<DashBoardSlide />} />
        <Route path="/Admin" element={<AdminSlide />} />
        <Route path="/Attendence" element={<AttendenceSlide />} />
        <Route path="/Board" element={<BoardSlide />} />
        <Route path="/Calendar" element={<CalendarSlide />} />
        <Route path="/Contacts" element={<ContactsSlide />} />
        <Route path="/EMail" element={<EMailSlide />} />
        <Route path="/Message" element={<MessageSlide />} />
        <Route path="/Sign" element={<SignSlide />} />
        <Route path="/Survey" element={<SurveySlide />} />
        <Route path="/ToDoList" element={<ToDoListSlide />} />
      </Routes>
    </Container>
  );
};

export default SlideBar;
