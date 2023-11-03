import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css"

const Detail = () => {

    const { seq } = useParams();
    const [isEdit, setEdit] = useState(false);
    const [backupMessage, setBackupMessage] = useState({}); // Backup 
    const navi = useNavigate();
    const [message, setMessage] = useState({ seq: "", writer: "", message: "" });

    const handleDelete = () => {
        axios.delete(`/api/boards/${seq}`).then(resp => {
            navi("/board")
        }).catch((error) => {
            console.error("삭제중 오류 발생", error);
        });
    }

    const handleUpdate = () => {
        axios.put(`/api/boards/${seq}`, message).then(resp => {
            setBackupMessage({ ...message });
            setEdit(false);
        }).catch((error) => {
            console.error("수정중 오류 발생", error);
        });
    }

    const handleCancel = () => {
        setMessage({ ...backupMessage });
        setEdit(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage(prev => ({ ...prev, [name]: value }));
    }

    useEffect(e => {
        axios.get(`/api/boards/${seq}`).then(resp => {
            setMessage(resp.data);
            setBackupMessage(resp.data);
        });
    }, []);

    return (
        <div className={style.boardContainer}>
            <table border={1}>
                <thead>
                    <tr>
                        <th colSpan={3}>{`${message.writer} 님의 메세지`}</th>
                    </tr>
                    <tr>
                        <th>Like</th>
                        <th>Seq</th>
                        <th>Title</th>
                        <th>Contents</th>
                        <th>File</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>View</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{message.like}</td>
                        <td>{message.seq}</td>
                        <td>{isEdit ? <input type="text" name="writer" value={message.writer} onChange={handleChange}></input> : message.writer}</td>
                        <td>{isEdit ? <input type="text" name="message" value={message.message} onChange={handleChange}></input> : message.message}</td>
                    </tr>
                    <tr>
                        <td>{isEdit ? <input type="file" name="file" value={message.profile} onChange={handleChange}></input> : message.profile}</td>
                        <td>{message.name}</td>
                        <td>{message.view}</td>
                        <td>{isEdit ? <input type="text" name="category" value={message.category} onChange={handleChange}></input> : message.category}</td>
                        <td>{message.date}</td>
                    </tr>
                    <tr>
                        <td colSpan={9} align="end" className={style.buttons}>
                            {isEdit ? "" : <Link to="/board"><button>Back</button></Link>}
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