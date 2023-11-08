import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import style from "./List.module.css";
import { Pagination, PaginationItem } from "@mui/material";

import { LoginContext } from '../../App';

const SendMail = () => {

    const { loginID } = useContext(LoginContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [mails, setMails] = useState([]);
    const COUNT_PER_PAGE = 15;

    useEffect(() => {
        LoadMails();
    }, []);

    const LoadMails = () => {
        axios.get(`/api/mails/send/${loginID}`).then(resp => {
            setMails(resp.data);
        }).catch(error => {
            console.error("데이터 불러오기 중 오류 발생", error);
        });
    }

    const handleDelete = (seq) => {
        axios.put(`/api/mails/sent/${seq}`).then((resp) => {
            LoadMails();
        })
            .catch((error) => {
                console.error("삭제중 오류 발생", error);
            });
    };

    const totalItems = mails.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleMail = mails.slice(startIndex, endIndex);

    return (
        <div className="Mailcontainer">
            <div className={style.search}>
                <input type="text" placeholder='메일 검색'></input>
                <button>검색</button>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.margin}>
                    보낸메일함
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Seq</th>
                                <th>삭제</th>
                                <th>Sender</th>
                                <th>receipient</th>
                                <th>Title</th>
                                <th>Write_Date</th>
                            </tr>
                            {visibleMail.map((e) => (
                                <tr key={e.seq}>
                                    <td>{e.seq}</td>
                                    <td><button onClick={() => handleDelete(e.seq)}>Del</button></td>
                                    <td>{e.sender}</td>
                                    <td>{e.receipient}</td>
                                    <td>
                                        <Link to={`/groovy/mail/detail/${e.seq}`}>{e.title}</Link>
                                    </td>
                                    <td>{e.write_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={onPageChange}
                        size="medium"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "15px 0",
                        }}
                        renderItem={(item) => (
                            <PaginationItem {...item} sx={{ fontSize: 15 }} />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SendMail;