import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./Password.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const Password = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [newPasswords, setNewPasswords] = useState({});

    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        axios.get("/api/admin/user").then(resp => {
            setUsers(resp.data);
        });
    }, [editUserId]);

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleUser = users.slice(startIndex, endIndex);

    const handleSave = (id) => {
        const formData = new FormData();
        formData.append('password', newPasswords[id] || '');

        axios.put(`/api/admin/updatePw/${id}`, formData, {})
            .then(resp => {
                setUsers(prevUsers => {
                    const updatedUsers = prevUsers.map(user => {
                        if (user.id === id) {
                            return resp.data;
                        }
                        return user;
                    });
                    return updatedUsers;
                });

                setEditUserId(null);

                setNewPasswords(prevPasswords => ({
                    ...prevPasswords,
                    [id]: '',
                }));
            })
            .catch(() => {
            });
    };

    const handleEdit = (id) => {
        setEditUserId(id);
    };

    const handleCancel = () => {
        setEditUserId(null);
    };

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <input type="text" placeholder='사용자 검색'></input>
                <button>검색</button>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.margin}>
                    비밀번호 관리
                </div>
                <hr></hr>
                <div className={style.pwDiv}>
                    <table border="1">
                        <tbody>
                            <tr align='center'>
                                <th>이름</th>
                                <th>ID</th>
                                <th>비밀번호</th>
                                <th></th>
                            </tr>
                            {visibleUser.map((e) => (
                                <tr align='center' key={e.id}>
                                    <td>{e.name}</td>
                                    <td>{e.id}</td>
                                    <td>
                                        {editUserId === e.id ? (
                                            <input type="password" className={style.pw} value={newPasswords[e.id] || ''}
                                                onChange={(event) => {
                                                    setNewPasswords(prevPasswords => ({ ...prevPasswords, [e.id]: event.target.value, }));
                                                }}
                                            />
                                        ) : "********"}
                                    </td>
                                    <td>
                                        {editUserId === e.id ? (
                                            <>
                                                <button onClick={handleCancel} className={style.cancel}>수정취소</button>
                                                <button onClick={() => handleSave(e.id)} className={style.save}>저장</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEdit(e.id)} className={style.add}>수정</button>
                                        )}
                                    </td>
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
    );
}

export default Password;
