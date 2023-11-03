import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {

    const [messages, setMessages] = useState([{}])

    // useEffect() : 화면을 구성하는것과 관련없는 부가적 기능을 통제하기 위해 사용
    // 2번째 인자가 언제 실행되는지를 의미
    // []는 마운트 될때 한번만 실행되어라를 의미
    useEffect(() => {
        axios.get("/api/messages").then(resp => {
            setMessages(resp.data)
        });
    }, []);

    return (
        <table border={1}>
            <thead>
                <tr>
                    <th colSpan={3}>Message List</th>
                </tr>
                <tr>
                    <th></th>
                    <th>작성자</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((e, i) => {
                    return (
                        <tr key={i}>
                            <td>{e.seq}</td>
                            <td><Link to={`/detail/${e.seq}`}>{e.writer}</Link></td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan={3} align="center">
                        <Link to="/"><button>Back</button></Link>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default List;