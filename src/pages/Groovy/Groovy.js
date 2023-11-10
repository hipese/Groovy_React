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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import WebSocketProvider from "../../WebSocketContext/WebSocketContext";

export const ListContext = createContext();
const MemberContext = createContext();

const Groovy = () => {
    const [member, setMember] = useState({});
    const [stompClient, setStompClient] = useState(null);

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

    const initializeWebSocket = () => {
        const socket = new SockJS('/ws-message');
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            client.subscribe('/topic/users', (response) => {
                console.log(response);
                console.log(JSON.parse(response.body));
            });

            setStompClient(client); // 웹 소켓 클라이언트 설정
        });
    };

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
                            <Route path="list/*" element={<ToDoList />} />
                        </Routes>

                    </div>
                </div>

            </MemberContext.Provider>
        </WebSocketProvider>
    );
};

export default Groovy;
export { MemberContext };
