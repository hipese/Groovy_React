import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { blue } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import style from "./List.module.css";
import { Pagination, PaginationItem } from "@mui/material";
import { Input } from "reactstrap";
import { LoginContext } from '../../App';
const MailToMe = () => {
    const [search, setSearch] = useState('');

    const { loginID } = useContext(LoginContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [mails, setMails] = useState([]);
    const COUNT_PER_PAGE = 8;

    useEffect(() => {
        LoadMails();
    }, []);

    const LoadMails = () => {
        axios.get(`/api/mails/tome/${loginID}`).then(resp => {
            setMails(resp.data);
        })
    }

    const totalItems = mails.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleMail = mails.slice(startIndex, endIndex);

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    };

    const handleDelete = (seq) => {
        const formData = new FormData();
        formData.append('member_id', loginID);
        axios.put(`/api/mails/sent/${seq}`, formData).then((resp) => {
            LoadMails();
        })
        axios.put(`/api/mails/inbox/${seq}`, formData).then((resp) => {
            LoadMails();
        })
            .catch((error) => {
            });
    };

    const markAsRead = (seq) => {
        axios.put(`/api/mails/read/${seq}`).then((resp) => {
            LoadMails();
        })
            .catch(() => {
            });
    };

    return (
        <div className="Mailcontainer">
            <div className={style.search}>
                <Input placeholder="메일 검색" className={style.input_search} onChange={inputChangeHandler}></Input>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.margin}>
                    내게쓴메일함
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <div className={style.mailTable}>
                        <div className={style.tableRow}>
                            <div className={style.tableHeader}>삭제</div>
                            <div className={style.tableHeader}>읽음</div>
                            <div className={style.tableHeader}>파일</div>
                            <div className={style.tableHeader}>-</div>
                            <div className={style.tableHeader}>제목</div>
                            <div className={style.tableHeader}>작성일</div>
                        </div>
                        {search === ''
                            ? visibleMail.map((e) => (
                                <div key={e.seq} className={style.tableRow}>
                                    <div className={style.tableCell}>
                                        <button onClick={() => handleDelete(e.seq)}>삭제</button>
                                    </div>
                                    <div className={style.tableCell}>
                                        {e.is_read !== true ? (
                                            <EmailIcon sx={{ color: blue[200] }} />
                                        ) : (
                                            <DraftsIcon sx={{ color: grey[400] }} />
                                        )}

                                    </div>
                                    <div className={style.tableCell}>
                                        {e.mfseq !== 0 && (
                                            <InsertLinkIcon
                                                sx={{ color: blue[200] }}
                                            />
                                        )}
                                    </div>
                                    <div className={style.tableCell}>
                                        {e.name}
                                    </div>
                                    <div className={style.tableCell}>
                                        <Link to={`/groovy/mail/detail/${e.parent_seq}`} onClick={() => markAsRead(e.seq)}>{e.title}</Link>
                                    </div>
                                    <div className={style.tableCell}>{e.write_date}</div>
                                </div>
                            ))
                            : mails
                                .filter(
                                    (e) =>
                                        e.name.includes(search) ||
                                        (e.group_name && e.group_name.includes(search)) ||
                                        e.position.includes(search) ||
                                        e.title.includes(search) ||
                                        e.contents.includes(search) ||
                                        e.email.includes(search)
                                )
                                .map((e) => (<div key={e.seq} className={style.tableRow}>
                                    <div className={style.tableCell}>
                                        <button onClick={() => handleDelete(e.seq)}>삭제</button>
                                    </div>
                                    <div className={style.tableCell}>
                                        {e.is_read !== true ? (
                                            <EmailIcon sx={{ color: blue[200] }} />
                                        ) : (
                                            <DraftsIcon sx={{ color: grey[400] }} />
                                        )}

                                    </div>
                                    <div className={style.tableCell}>
                                        {e.mfseq !== 0 && (
                                            <InsertLinkIcon
                                                sx={{ color: blue[200] }}
                                            />
                                        )}
                                    </div>
                                    <div className={style.tableCell}>
                                        {e.name}
                                    </div>
                                    <div className={style.tableCell}>
                                        <Link to={`/groovy/mail/detail/${e.parent_seq}`} onClick={() => markAsRead(e.seq)}>{e.title}</Link>
                                    </div>
                                    <div className={style.tableCell}>{e.write_date}</div>
                                </div>
                                ))}
                    </div>
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