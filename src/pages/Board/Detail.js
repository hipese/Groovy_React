import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css"

const Detail = () => {

    const { seq } = useParams();
    const [isEdit, setEdit] = useState(false);
    const [backupBoard, setBackupBoard] = useState({}); // Backup 
    const navi = useNavigate();
    const [Board, setBoard] = useState({ seq: "", title: "", writer: "", contents: "", file: "", like: "", profile: "", view: "", category: "", date: "" });

    const handleDelete = () => {
        axios.delete(`/api/boards/${seq}`).then(resp => {
            navi("/groovy/board")
        }).catch((error) => {
            console.error("삭제중 오류 발생", error);
        });
    }

    const handleUpdate = () => {
        axios.put(`/api/boards/${seq}`, Board).then(resp => {
            setBackupBoard({ ...Board });
            setEdit(false);
        }).catch((error) => {
            console.error("수정중 오류 발생", error);
        });
    }

    const handleCancel = () => {
        setBoard({ ...backupBoard });
        setEdit(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard(prev => ({ ...prev, [name]: value }));
    }

    useEffect(e => {
        axios.get(`/api/boards/${seq}`).then(resp => {
            setBoard(resp.data);
            setBackupBoard(resp.data);
        });
    }, []);

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
                        <td>{isEdit ? <input type="text" name="title" value={Board.title} onChange={handleChange}></input> : Board.title}</td>
                        <td>{isEdit ? <input type="text" name="contents" value={Board.contents} onChange={handleChange}></input> : Board.contents}</td>
                        <td>{Board.view_count}</td>
                        <td>{isEdit ? <input type="text" name="category" value={Board.category} onChange={handleChange}></input> : Board.category}</td>
                        <td>{Board.write_date}</td>
                    </tr>
                    <tr>
                        <td colSpan={7} align="end" className={style.buttons}>
                            {isEdit ? "" : <Link to="/groovy/board"><button>Back</button></Link>}
                            {isEdit ? "" : <button onClick={handleDelete}>Del</button>}
                            {isEdit ? "" : <button onClick={() => { setEdit(true) }}>Edit</button>}
                            {isEdit ? <button onClick={handleUpdate}>Submit</button> : ""}
                            {isEdit ? <button onClick={handleCancel}>Cancel</button> : ""}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            {/* 댓글 */}
        </div>
    );
}

export default Detail;