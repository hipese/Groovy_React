import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navigator from "./pages/Main/components/Navigator/Navigator";
import SlideBar from "./pages/Main/components/SlideBar/SlideBar/SlideBar";
import ToDoList from "./pages/ToDoList/ToDoList";
import Calendar from "./pages/Calendar/Calendar";
import Board from "./pages/Board/Board";
import Attendence from "./pages/Attendence/Attendence";
import Contact from "./pages/Contact/Contact";
import DashBoard from "./pages/DashBoard/DashBoard";
import Email from "./pages/Email/Email";
import Message from "./pages/Message/Message";
import Sign_Main from "./pages/Sign/components/Sign_Main/Sign_Main";
import Survey from "./pages/Survey/Survey";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <Router>
      <Navigator />
      <SlideBar />
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route path="attendence" element={<Attendence />} />
        <Route path="board" element={<Board />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="email" element={<Email />} />
        <Route path="message" element={<Message />} />
        <Route path="sign" element={<Sign_Main />} />
        <Route path="survey" element={<Survey />} />
        <Route path="todolist" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
