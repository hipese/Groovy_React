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
import Main from "../../quiz02/src/pages/Main/conpenents";
import Message from "./pages/Message/Message";
import Sign_Main from "./pages/Sign/components/Sign_Main/Sign_Main";
import Survey from "./pages/Survey/Survey";

function App() {
  return (
    <Router>
      <Navigator />
      <SlideBar />
      <Routes>
        <Route path="admin" elemen={<Admin/>}/> 
        <Route path="attendence" elemen={<Attendence/>}/>
        <Route path="board" elemen={<Board/>}/>
        <Route path="calendar" elemen={<Calendar/>}/>
        <Route path="contact" elemen={<Contact/>}/>
        <Route path="dashboard" elemen={<DashBoard/>}/>
        <Route path="email" elemen={<Email/>}/>
        <Route path="main" elemen={<Main/>}/>
        <Route path="message" elemen={<Message/>}/>
        <Route path="sign" elemen={<Sign_Main/>}/>
        <Route path="survey" elemen={<Survey/>}/>
        <Route path="todolist" elemen={<ToDoList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
