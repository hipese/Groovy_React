import axios from "axios";
import { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
    const { seq } = useParams();
    const [Mail, setMail] = useState({ seq: "", sender: "", receipient: "", title: "", contents: "", write_date: "" });

    useEffect(() => {
        axios.get(`/api/mails/${seq}`).then((resp) => {
            setMail(resp.data);
        });
    }, [seq]);

    return (
        <div className={style.boardContainer}>
            <table border={1}>
                <thead>
                    <tr>
                        <th colSpan={7}>{`${Mail.sender} 님의 메세지`}</th>
                    </tr>
                    <tr>
                        <th>Seq</th>
                        <th>sender</th>
                        <th>receipient</th>
                        <th>Title</th>
                        <th>Contents</th>
                        <th>Write_Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Mail.seq}</td>
                        <td>{Mail.sender}</td>
                        <td>{Mail.receipient}</td>
                        <td>{Mail.title}</td>
                        <td>{Mail.contents}</td>
                        <td>{Mail.write_date}</td>
                    </tr>
                    <tr>
                        <td colSpan={7} align="end" className={style.buttons}>
                            <Link to="/groovy/mail">
                                <button>Back</button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
        </div>
    );
};

export default Detail;
