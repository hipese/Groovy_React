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
import { formatISO, parseISO, addDays } from 'date-fns';
import WebSocketProvider from "../../WebSocketContext/WebSocketContext";

export const ListContext = createContext();
export const ToDoListContext = createContext();
const MemberContext = createContext();

const Groovy = () => {
    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get("/api/member").then(resp => {
            setMember(resp.data);
        });
    }, []);

    const location = useLocation();
    const navi = useNavigate();
    const { loginID, setLoginID } = useContext(LoginContext);
    const [dbList, setdbList] = useState([{}]);

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
    const refreshList = () => {
        axios.get("/api/calendar").then((res) => {
            const NewEvents = res.data.map(transformEventDataToCalendarEvent);
            setdbList(NewEvents);
        });

        function transformEventDataToCalendarEvent(event) {
            return {
                extendedProps: {
                    seq: event.seq,
                    write_date: event.write_date,
                    contents: event.contents,
                    title: event.title,
                    start: event.starttime,
                    end: formatISO(addDays(parseISO(event.endtime), 1)),
                },
                title: event.title,
                start: event.starttime,
                end: formatISO(addDays(parseISO(event.endtime), 1)),
                color: "white",
                textColor: "black",
                borderColor: "black",
                allDay: true,
                classNames: ['myData-event'],
            };
        }
    };

    useEffect(() => {
        refreshList();
    }, []);
    // ToDoList 상위 컴포넌트에서 사용할 상태와 함수
    const [todoList, setTodoList] = useState([]);
    const getTodoList = async () => {
        try {
            const res = await axios.get("/api/tdList");
            let updatedTodoList = res.data.map(todo => ({ ...todo, isActive: false }));

            const bookmarksRes = await axios.get("/api/tdlbookmark");
            const bookmarks = bookmarksRes.data;

            // 즐겨찾기 목록과 현재 todo 목록 매핑
            updatedTodoList = updatedTodoList.map(todo => {
                const isBookmarked = bookmarks.some(bookmark => bookmark.parent_seq === todo.seq);
                return { ...todo, isActive: isBookmarked };
            });
            setTodoList(updatedTodoList);

        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    }
    useEffect(() => {
        getTodoList();
    }, []);
    const ListAdded = () => { 
        getTodoList();
    }



    return (
        <WebSocketProvider>
            <MemberContext.Provider value={{ member, setMember }}>
                <div>
                    <Container className="NaviContainer g-0" fluid>
                        <Navigator />
                    </Container>
                    <ListContext.Provider value={{ refreshList }}>
                        <div className="SlideContainer">
                            <SlideBar refreshList={refreshList} />
                        </div>
                    </ListContext.Provider>

                    <div className="MainContainer">
                        <Routes>
                            <Route path="dashboard/*" element={<DashBoard />} />
                            <Route path="admin/*" element={<Admin />} />
                            <Route path="attendence/*" element={<Attendence />} />
                            <Route path="board/*" element={<Board />} />
                            <Route path="calendar/*" element={
                                <ListContext.Provider value={{ dbList, setdbList, refreshList }}>
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
                                <ToDoListContext.Provider value={{ todoList, setTodoList, ListAdded }}>
                                    <ToDoList />
                                </ToDoListContext.Provider>
                                } />
                        </Routes>

                    </div>
                </div>

            </MemberContext.Provider>
        </WebSocketProvider>
    );
};

export default Groovy;
export { MemberContext };
