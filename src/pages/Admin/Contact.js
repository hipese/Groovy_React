import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./Manage.module.css";
import { Pagination, PaginationItem } from "@mui/material";
import { Input } from "reactstrap";


const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({});
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const COUNT_PER_PAGE = 10;
    const totalItems = contacts.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleContacts = contacts.slice(startIndex, endIndex);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        axios.get("/api/contact/selectExternal").then((resp) => {
            setContacts(resp.data);
        }).catch(err => {
        })
        setLoading(false);
    }, [])

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const handleAdd = (id) => {

        const isEmptyField = ['company', 'group_name', 'name', 'position', 'contact', 'email'].some(field => newContact[field] === '');
        if (isEmptyField && newContact.group_name === '') {
            alert('외부 주소록 등록을 위해 값을 모두 채워주세요.');
            return;
        }
        if (!/^\d+$/.test(newContact.contact)) {
            alert('전화번호는 숫자만 입력 가능합니다.');
            return;
        }
        if (newContact.contact.length > 11) {
            alert('전화번호는 최대 11자까지 입력 가능합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('company', newContact.company);
        formData.append('group_name', newContact.group_name || '');
        formData.append('name', newContact.name);
        formData.append('position', newContact.position);
        formData.append('contact', newContact.contact);
        formData.append('email', newContact.email);

        axios.post("/api/admin/excontact", formData, {})
            .then(() => {
                axios.get("/api/contact/selectExternal").then((resp) => {
                    setContacts(resp.data);
                });
                setNewContact({ company: "", group_name: "", name: "", position: "", contact: "", email: "" });
            })
            .catch(() => {
            });
    };

    const handleDel = (seq) => {
        axios.delete(`/api/admin/delete/contact/${seq}`).then(() => {
            axios.get("/api/contact/selectExternal").then((resp) => {
                setContacts(resp.data);
            });
            setCurrentPage(currentPage);
        })
            .catch(() => {
            });
    };

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.text}>
                    <div className={style.margin}>
                        외부 주소록 관리
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <div className={style.tableContainer}>
                    <div className={style.tableRow}>
                        <div className={style.tableHeader}>회사</div>
                        <div className={style.tableHeader}>부서</div>
                        <div className={style.tableHeader}>이름</div>
                        <div className={style.tableHeader}>직책</div>
                        <div className={style.tableHeader}>연락처</div>
                        <div className={style.tableHeader}>이메일</div>
                        <div className={style.tableHeader}>-</div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="회사 입력" className={style.company} value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="부서 입력" className={style.group_name} value={newContact.group_name} onChange={(e) => setNewContact({ ...newContact, group_name: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="이름 입력" className={style.name} value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="직책 입력" className={style.cposition} value={newContact.position} onChange={(e) => setNewContact({ ...newContact, position: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="연락처 입력" className={style.contact} value={newContact.contact} onChange={(e) => setNewContact({ ...newContact, contact: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <input type="text" placeholder="이메일 입력" className={style.email} value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
                        </div>
                        <div className={style.tableCell}>
                            <button onClick={handleAdd} className={style.addCon}>
                                등록
                            </button>
                        </div>
                    </div>
                    {search === ''
                        ? visibleContacts.map((e) => (
                            <div className={style.tableRow} key={e.seq}>
                                <div className={style.tableCell2}>{e.company}</div>
                                <div className={style.tableCell2}>{e.group_name}</div>
                                <div className={style.tableCell2}>{e.name}</div>
                                <div className={style.tableCell2}>{e.position}</div>
                                <div className={style.tableCell2}>{e.contact}</div>
                                <div className={style.tableCell2}>{e.email}</div>
                                <div className={style.buttons}>
                                    <button onClick={() => handleDel(e.seq)} className={style.del}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))
                        : contacts
                            .filter(
                                (e) =>
                                    e.company.includes(search) ||
                                    (e.group_name && e.group_name.includes(search)) ||
                                    e.name.includes(search) ||
                                    e.position.includes(search) ||
                                    e.contact.includes(search) ||
                                    e.email.includes(search)
                            )
                            .map((e) => (
                                <div className={style.tableRow} key={e.seq}>
                                    <div className={style.tableCell}>{e.company}</div>
                                    <div className={style.tableCell}>{e.group_name}</div>
                                    <div className={style.tableCell}>{e.name}</div>
                                    <div className={style.tableCell}>{e.position}</div>
                                    <div className={style.tableCell}>{e.contact}</div>
                                    <div className={style.tableCell}>{e.email}</div>
                                    <div className={style.buttons}>
                                        <button onClick={() => handleDel(e.seq)} className={style.del}>
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
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
    );
}

export default Contact;
