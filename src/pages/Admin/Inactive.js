import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./Inactive.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const Inactive = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPages, setCurrentPages] = useState(1);

    const [users, setUsers] = useState([]);
    const [inactives, setInactives] = useState([]);
    const [depts, setDept] = useState([{ dept_name: "" }]);

    const [editUserId, setEditUserId] = useState(null);
    const [editInactiveId, setEditInactiveId] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    const COUNT_PER_PAGE = 5;

    useEffect(() => {
        axios.get("/api/admin/user").then(resp => {
            setUsers(resp.data);
        });
        axios.get("/api/admin/inactive").then(resp => {
            setInactives(resp.data);
        });
        axios.get("/api/admin/dept").then(resp => {
            setDept(resp.data);
        });
    }, []);

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const totalItem = inactives.length;
    const totalPage = Math.ceil(totalItem / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const onPageChange2 = (e, page) => {
        setCurrentPages(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleUser = users.slice(startIndex, endIndex);

    const startIndexs = (currentPages - 1) * COUNT_PER_PAGE;
    const endIndexs = Math.min(startIndexs + COUNT_PER_PAGE, totalItem);
    const visibleInactive = inactives.slice(startIndexs, endIndexs);

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditedUser(userToEdit);
        setEditUserId(id);
    };

    const handleEdit2 = (id) => {
        const userToEdit = inactives.find((user) => user.id === id);
        setEditedUser(userToEdit);
        setEditInactiveId(id);
    };

    const handleCancel = () => {
        setEditedUser({});
        setEditUserId(null);
    };

    const handleCancel2 = () => {
        setEditedUser({});
        setEditInactiveId(null);
    };

    const handleChange = (event, field) => {
        const { value } = event.target;
        if (editInactiveId !== null) {
            setEditedUser((prevEditedUser) => ({
                ...prevEditedUser,
                [field]: value,
            }));
        }
    };

    const handleSave = (id) => {
        axios.put(`/api/admin/updateDept/${id}`)
            .then(() => {
                axios.get("/api/admin/user").then(resp => {
                    setUsers(resp.data);
                });
                axios.get("/api/admin/inactive").then(resp => {
                    setInactives(resp.data);
                });
                setEditedUser({});
                setEditUserId(null);
            })
            .catch(() => {
            });
    };

    const handleInactive = (id) => {
        const formData = new FormData();
        formData.append('name', editedUser.name);
        formData.append('id', editedUser.id);
        formData.append('group_name', editedUser.group_name);
        formData.append('position', editedUser.position);

        axios.put(`/api/admin/update/${id}`, formData)
            .then(() => {
                axios.get("/api/admin/inactive").then(resp => {
                    setInactives(resp.data);
                });
                axios.get("/api/admin/user").then(resp => {
                    setUsers(resp.data);
                });
                setEditedUser({});
                setEditInactiveId(null);
            })
            .catch(() => {
            });
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
                    비활성 사용자
                </div>
                <hr></hr>
                <div className={style.user}>
                    <table border="1">
                        <tbody>
                            <tr align='center'>
                                <th>이름</th>
                                <th>ID</th>
                                <th>소속부서</th>
                                <th>직급</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th></th>
                            </tr>
                            {visibleUser.map((user) => (
                                <tr align='center' key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.id}</td>
                                    <td>{user.group_name}</td>
                                    <td>{user.position}</td>
                                    <td>{user.contact}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editUserId === user.id ? (
                                            <>
                                                <button onClick={handleCancel} className={style.cancel}>
                                                    취소
                                                </button>
                                                <button onClick={() => handleSave(user.id)} className={style.save}>
                                                    완료
                                                </button>
                                            </>
                                        ) : (<button onClick={() => handleEdit(user.id)} className={style.edit}>비활성화</button>)}
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
                <div className={style.user}>
                    <table border="1">
                        <tbody>
                            <tr align='center'>
                                <th>이름</th>
                                <th>ID</th>
                                <th>비활성화</th>
                                <th>직급</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th></th>
                            </tr>
                            {visibleInactive.map((user) => (
                                <tr align='center' key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.id}</td>
                                    <td>
                                        {editInactiveId === user.id ? (
                                            <select name="department" value={editedUser.group_name || ''} className={style.dept} onChange={(e) => handleChange(e, 'group_name')}>
                                                <option value="">부서입력</option>
                                                {depts.map((e) => (
                                                    <option key={e.dept_name} value={e.dept_name}>{e.dept_name}</option>
                                                ))}
                                            </select>
                                        ) : (user.group_name)}
                                    </td>
                                    <td>{user.position}</td>
                                    <td>{user.contact}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editInactiveId === user.id ? (
                                            <>
                                                <button onClick={handleCancel2} className={style.cancel}>
                                                    취소
                                                </button>
                                                <button onClick={() => handleInactive(user.id)} className={style.save}>
                                                    완료
                                                </button>
                                            </>
                                        ) : (<button onClick={() => handleEdit2(user.id)} className={style.edit}>해제</button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <Pagination
                        count={totalPage}
                        page={currentPages}
                        onChange={onPageChange2}
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

export default Inactive;
