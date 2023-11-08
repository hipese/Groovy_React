import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import DashBoard from "../DashBoard/DashBoard";
import Admin from "../Admin/Admin";
import Attendence from "../Attendence/Attendence";
import Board from "../Board/Board";
import Calendar from "../Calendar/Calendar";
import Email from "../Email/Email";
import Message from "../Message/Message";
import Survey from "../Survey/Survey";
import ToDoList from "../ToDoList/ToDoList";
import Navigator from "../Main/components/Navigator/Navigator";
import { Container } from "reactstrap";
import SlideBar from "../Main/components/SlideBar/SlideBar/SlideBar";
import { useContext, useEffect, createContext, useState } from "react";
import { LoginContext } from "../../App";
import Sign_List from "../Sign/components/Sign_List/Sign_List";
import Mypagelist from "../Mypage/components/Mypagelist";
import axios from "axios";
import Contact_Route from "../Contact/Contact_Route";

const MemberContext = createContext();



const Groovy = () => {

    // 맴버변수 
    const [member, setMember] = useState({});
    

    useEffect(() => {
        axios.get("/api/member").then(resp => {
            setMember(resp.data)
      
        });
    }, []);


    const location = useLocation();
    const navi = useNavigate();
    const { loginID, setLoginID } = useContext(LoginContext);

    // useEffect(e=>{
    //     if(!loginID) {
    //         navi("/")
    //     }
    // }, []);

    useEffect(e => {

        axios.get("/auth/isLogined").then((resp) => {
            console.log("ID from Groovy.js : " + resp.data)
            if (resp.data == "" || resp.data == null || resp.data == undefined) {
                navi("/");
            } else {
                setLoginID(resp.data);
            }
        })

        if (location.pathname == "/Groovy/" || location.pathname == "/Groovy") {
            navi("/Groovy/dashboard");
        }
    }, []);


    return (
        <MemberContext.Provider value={{ member, setMember}}>
            <div>
                <Container className="NaviContainer g-0" fluid>
                    <Navigator />
                </Container>
                <div className="SlideContainer">
                    <SlideBar />
                </div>
                <div className="MainContainer">
                    <Routes>
                        <Route path="dashboard/*" element={<DashBoard />} />
                        <Route path="admin/*" element={<Admin />} />
                        <Route path="attendence/*" element={<Attendence />} />
                        <Route path="board/*" element={<Board />} />
                        <Route path="calendar/*" element={<Calendar />} />
                        <Route path="contacts/*" element={<Contact_Route />} />
                        <Route path="dashboard/*" element={<DashBoard />} />
                        <Route path="mail/*" element={<Email />} />
                        <Route path="message/*" element={<Message />} />
                        <Route path="mypagelist/*" element={<Mypagelist />} />
                        <Route path="signlist/*" element={<Sign_List />} />
                        <Route path="survey/*" element={<Survey />} />
                        <Route path="list/*" element={<ToDoList />} />
                    </Routes>
                </div>
            </div>
        </MemberContext.Provider>
    )
}

export default Groovy;
export { MemberContext };