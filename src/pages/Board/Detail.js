import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";

import { LoginContext } from '../../App';

const Detail = () => {
    const { loginID } = useContext(LoginContext);
    const { seq } = useParams();
    const navi = useNavigate();
    const [Board, setBoard] = useState({
        seq: "",
        title: "",
        writer: "",
        contents: "",
        file: "",
        view_count: "",
        category: "",
        write_date: ""
    });

    const handleDelete = () => {
        axios
            .delete(`/api/boards/${seq}`)
            .then((resp) => {
                navi("/groovy/board");
            })
            .catch((error) => {
                console.error("삭제중 오류 발생", error);
            });
    };

    useEffect(() => {
        axios.get(`/api/boards/${seq}`).then((resp) => {
            setBoard(resp.data);
        });
    }, [seq]);

    return (
        <div className={style.boardContainer}>
            <table border={1}>
                <thead>
                    <tr>
                        <th colSpan={7}>{`${Board.writer} 님의 메세지`}</th>
                    </tr>
                    <tr>
                        <th>Seq</th>
                        <th>Writer</th>
                        <th>Title</th>
                        <th>Contents</th>
                        <th>View_Count</th>
                        <th>Category</th>
                        <th>Write_Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Board.seq}</td>
                        <td>{Board.writer}</td>
                        <td>{Board.title}</td>
                        <td>{Board.contents}</td>
                        <td>{Board.view_count}</td>
                        <td>{Board.category}</td>
                        <td>{Board.write_date}</td>
                    </tr>
                    <tr>
                        <td colSpan={7} align="end" className={style.buttons}>
                            {loginID == Board.writer ? (
                                <>
                                    <Link to="/groovy/board">
                                        <button>Back</button>
                                    </Link>
                                    <button onClick={handleDelete}>Del</button>
                                    <Link to={`/groovy/board/update/${seq}`}>
                                        <button>Edit</button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/groovy/board">
                                    <button>Back</button>
                                </Link>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            {/* 댓글 */}
        </div>
    );
};

export default Detail;
