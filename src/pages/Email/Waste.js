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

const Waste = () => {
    const { loginID } = useContext(LoginContext);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [mails, setMails] = useState([]);
    const COUNT_PER_PAGE = 8;

    const LoadMails = () => {
        Promise.all([
            axios.get(`/api/mails/waste/inbox/${loginID}`),
            axios.get(`/api/mails/waste/send/${loginID}`)
        ])
        .then(([inboxResp, sendResp]) => {
            const inboxMails = inboxResp.data.map(item => ({ ...item, isInbox: true }));
            const sentMails = sendResp.data.map(item => ({ ...item, isInbox: false }));

            const combinedMails = [...inboxMails, ...sentMails];

            setMails(combinedMails);
        })
        .catch(error => {
        });
    };

    useEffect(() => {
        LoadMails();
    }, []);

    const handleDelete = (seq, isInbox) => {
        const deleteEndpoint = isInbox ? `/api/mails/inbox/${seq}` : `/api/mails/sent/${seq}`;
        axios.delete(deleteEndpoint).then(() => {
            LoadMails();
        })
        .catch(() => {
        });
    };

    const totalItems = mails.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleMails = mails.slice(startIndex, endIndex);

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    };

    const markAsRead = (seq) => {
        axios.put(`/api/mails/read/${seq}`).then(() => {
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
                    휴지통 [ {totalItems} ]
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <div className={style.mailTable}>
                        <div className={style.tableRow}>
                            <div className={style.tableHeader}>삭제</div>
                            <div className={style.tableHeader}>수신확인</div>
                            <div className={style.tableHeader}>파일</div>
                            <div className={style.tableHeader}>-</div>
                            <div className={style.tableHeader}>받는이</div>
                            <div className={style.tableHeader}>제목</div>
                            <div className={style.tableHeader}>작성일</div>
                        </div>
                        {search === ''
                            ? visibleMails.map((e) => (
                                <div key={e.seq} className={style.tableRow}>
                                <div className={style.tableCell}>
                                    <button onClick={() => handleDelete(e.seq, e.isInbox)} >삭제</button>
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
                                <div className={style.tableCell}>{e.name} {e.group_name} {e.position}</div>
                                <div className={style.tableCell}>{e.email}</div>
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
                                        e.email.includes(search)
                                )
                                .map((e) => (<div key={e.seq} className={style.tableRow}>
                                    <div className={style.tableCell}>
                                        <button onClick={() => handleDelete(e.seq, e.isInbox)} >삭제</button>
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
                                    <div className={style.tableCell}>{e.name} {e.group_name} {e.position}</div>
                                    <div className={style.tableCell}>{e.email}</div>
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

export default Waste;