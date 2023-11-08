import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./List.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const MailToMe = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [mails, setMails] = useState([]);
    const COUNT_PER_PAGE = 15;

    useEffect(() => {
        axios.get("/api/mails/tome").then(resp => {
            setMails(resp.data);
        })
    }, []);

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
                    내게쓴메일함
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Seq</th>
                                <th>삭제</th>
                                <th>Title</th>
                                <th>Write_Date</th>
                            </tr>
                            {visibleMail.map((e) => (
                                <tr key={e.seq}>
                                    <td>{e.seq}</td>
                                    <td><button>삭제</button></td>
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

export default MailToMe;