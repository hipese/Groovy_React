import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "../DashBoard/DashBoard";
import Admin from "../Admin/Admin";
import Attendence from "../Attendence/Attendence";
import Board from "../Board/Board";
import Calendar from "../Calendar/Calendar";
import Email from "../Email/Email";
import Message_Route from "../Message/Message_Route";
import Survey from "../Survey/Survey";
import ToDoList from "../ToDoList/ToDoList";
import Navigator from "../Main/components/Navigator/Navigator";
import { Container, List } from "reactstrap";
import SlideBar from "../Main/components/SlideBar/SlideBar/SlideBar";
import { useContext, useEffect, useState, createContext } from "react";
import { LoginContext } from "../../App";
import Sign_List from "../Sign/components/Sign_List/Sign_List";
import Mypagelist from "../Mypage/components/Mypagelist";
import axios from "axios";
import Contact_Route from "../Contact/Contact_Route";
import WebSocketProvider from "../../WebSocketContext/WebSocketContext";
import { useCalendar } from "./useCalendar";
import { useToDoList } from "./useToDoList";

export const ListContext = createContext();
export const ToDoListContext = createContext();

const MemberContext = createContext();
const VacationContext = createContext();
const DepartmentContext = createContext({
    department: [],
    setDepartment: () => { },
});

const Groovy = () => {

    const navi = useNavigate();
    const { loginID, setLoginID } = useContext(LoginContext);

    useEffect(() => {
        let intervalId = null;
        const checkLoginStatus = async () => {
            try {
                const resp = await axios.get("/auth/check-session");
                if (resp.data.loggedIn === false) {
                    clearInterval(intervalId); // 인터벌 취소
                    setLoginID("")
                    navi("/"); // 로그인 페이지로 이동
                }
            } catch (error) {
                console.error("Session check failed", error);
                clearInterval(intervalId); // 인터벌 취소
                navi("/"); // 로그인 페이지로 이동
            }
        };

        intervalId = setInterval(checkLoginStatus, 15000);

        // 컴포넌트가 언마운트되거나 인터벌이 취소될 때 정리
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [navi]);


    // 드롭다운의 표시 상태를 관리하는 state
    const [department, setDepartment] = useState([]);

    //작성자의 휴가정보를 뿌리기 위한 변수
    const [myVacation, setMyVacation] = useState({}); //(나중에 년도 검색할거면 이거 배열로 바꾸고 로직 추가해야함) 

    useEffect(() => {
        axios.get("/api/vacation/myVacation").then(resp => {
            setMyVacation(resp.data);
        })
    }, [])

    // 드롭다운 내용을 관리하는 배열
    useEffect(() => {
        axios.get("/api/member/department").then(resp => {
            setDepartment(resp.data);
        });
    }, []);


    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get("/api/member").then(resp => {
            setMember(resp.data);
        });
    }, []);

    const location = useLocation();


    useEffect(() => {
        axios.get("/auth/isLogined").then((resp) => {
            console.log("ID from Groovy.js : " + resp.data);
            if (resp.data == "" || resp.data == null || resp.data == undefined) {
                navi("/");
            } else {
                setLoginID(resp.data);
            }
        });

        if (location.pathname === "/Groovy/" || location.pathname === "/Groovy") {
            navi("/Groovy/dashboard");
        }
    }, []);

    // Calendar 상위 컴포넌트에서 사용할 상태와 함수
    const { dbList, refreshList } = useCalendar();

    // ToDoList 상위 컴포넌트에서 사용할 상태와 함수
    const { todoList, setTodoList, toggleStar, ListAdded, tdlbg } = useToDoList();

    return (
        <WebSocketProvider>
            <MemberContext.Provider value={{ member, setMember }}>
                <VacationContext.Provider value={{ myVacation, setMyVacation }}>
                    <DepartmentContext.Provider value={{ department, setDepartment }}>
                        <div>
                            <Container className="NaviContainer g-0" fluid>
                                <Navigator />
                            </Container>
                            <ListContext.Provider value={{ refreshList }}>
                                <ToDoListContext.Provider value={{ todoList, setTodoList, toggleStar, ListAdded, tdlbg }}>
                                    <div className="SlideContainer">
                                        <SlideBar refreshList={refreshList} />
                                    </div>
                                </ToDoListContext.Provider>
                            </ListContext.Provider>

                            <div className="MainContainer">
                                <Routes>
                                    <Route path="dashboard/*" element={<DashBoard />} />
                                    <Route path="admin/*" element={<Admin />} />
                                    <Route path="attendence/*" element={<Attendence />} />
                                    <Route path="board/*" element={<Board />} />
                                    <Route path="calendar/*" element={
                                        <ListContext.Provider value={{ dbList, refreshList }}>
                                            <Calendar />
                                        </ListContext.Provider>
                                    } />
                                    <Route path="contacts/*" element={<Contact_Route />} />
                                    <Route path="dashboard/*" element={<DashBoard />} />
                                    <Route path="mail/*" element={<Email />} />
                                    <Route path="message/*" element={<Message_Route />} />
                                    <Route path="mypagelist/*" element={<Mypagelist />} />
                                    <Route path="signlist/*" element={<Sign_List />} />
                                    <Route path="survey/*" element={<Survey />} />
                                    <Route path="list/*" element={
                                        <ToDoListContext.Provider value={{ todoList, setTodoList, toggleStar, ListAdded, tdlbg }}>
                                            <ToDoList />
                                        </ToDoListContext.Provider>
                                    } />
                                </Routes>

                            </div>
                        </div>
                    </DepartmentContext.Provider>
                </VacationContext.Provider>
            </MemberContext.Provider>
        </WebSocketProvider>
    );
};

export default Groovy;
export { MemberContext, DepartmentContext, VacationContext };
