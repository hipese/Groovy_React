import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./Inactive.module.css";
import { Pagination, PaginationItem } from "@mui/material";
import { Input } from "reactstrap";

const Inactive = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPages, setCurrentPages] = useState(1);

    const [users, setUsers] = useState([]);
    const [inactives, setInactives] = useState([]);
    const [depts, setDept] = useState([{ dept_name: "" }]);

    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');

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

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    };

    const inputChangeHandler2 = (e) => {
        setSearch2(e.target.value);
    };

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.margin}>
                    비활성화
                </div>
                <hr></hr>
                <div className={style.user}>
                    <div className={style.tableContainer}>
                        <div className={style.tableRow}>
                            <div className={style.tableHeader}>이름</div>
                            <div className={style.tableHeader}>ID</div>
                            <div className={style.tableHeader}>소속부서</div>
                            <div className={style.tableHeader}>직급</div>
                            <div className={style.tableHeader}>전화번호</div>
                            <div className={style.tableHeader}>이메일</div>
                            <div className={style.tableHeader}>-</div>
                        </div>
                        {search === ''
                            ? visibleUser.map((user) => (
                                <div className={style.tableRow} key={user.id}>
                                    <div className={style.tableCell}>{user.name}</div>
                                    <div className={style.tableCell}>{user.id}</div>
                                    <div className={style.tableCell}>{user.group_name}</div>
                                    <div className={style.tableCell}>{user.position}</div>
                                    <div className={style.tableCell}>{user.contact}</div>
                                    <div className={style.tableCell}>{user.email}</div>
                                    <div className={style.tableCell}>
                                        {editUserId === user.id ? (
                                            <>
                                                <button onClick={handleCancel} className={style.cancel}>
                                                    취소
                                                </button>
                                                <button onClick={() => handleSave(user.id)} className={style.save}>
                                                    완료
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEdit(user.id)} className={style.edit}>
                                                비활성화
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                            : users
                                .filter(
                                    (e) =>
                                        e.name.includes(search) ||
                                        e.id.includes(search) ||
                                        (e.group_name && e.group_name.includes(search)) ||
                                        e.position.includes(search) ||
                                        e.contact.includes(search) ||
                                        e.email.includes(search)
                                )
                                .map((user) => (
                                    <div className={style.tableRow} key={user.id}>
                                        <div className={style.tableCell}>{user.name}</div>
                                        <div className={style.tableCell}>{user.id}</div>
                                        <div className={style.tableCell}>{user.group_name}</div>
                                        <div className={style.tableCell}>{user.position}</div>
                                        <div className={style.tableCell}>{user.contact}</div>
                                        <div className={style.tableCell}>{user.email}</div>
                                        <div className={style.tableCell}>
                                            {editUserId === user.id ? (
                                                <>
                                                    <button onClick={handleCancel} className={style.cancel}>
                                                        취소
                                                    </button>
                                                    <button onClick={() => handleSave(user.id)} className={style.save}>
                                                        완료
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleEdit(user.id)} className={style.edit}>
                                                    비활성화
                                                </button>
                                            )}
                                        </div>
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
                <div className={style.search}>
                    <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler2}></Input>
                </div>
                <hr></hr>
                <div className={style.margin}>비활성 사용자</div>
                <hr></hr>
                <div className={style.user}>
                    <div className={style.tableContainer}>
                        <div className={style.tableRow} align='center'>
                            <div className={style.tableHeader}>이름</div>
                            <div className={style.tableHeader}>ID</div>
                            <div className={style.tableHeader}>비활성화</div>
                            <div className={style.tableHeader}>직급</div>
                            <div className={style.tableHeader}>전화번호</div>
                            <div className={style.tableHeader}>이메일</div>
                            <div className={style.tableHeader}>-</div>
                        </div>
                        {search2 === ''
                            ? visibleInactive.map((user) => (
                                <div className={style.tableRow} align='center' key={user.id}>
                                    <div className={style.tableCell}>{user.name}</div>
                                    <div className={style.tableCell}>{user.id}</div>
                                    <div className={style.tableCell}>
                                        {editInactiveId === user.id ? (
                                            <div className={style.deptContainer}>
                                                <select
                                                    name="department"
                                                    value={editedUser.group_name || ''}
                                                    className={style.dept}
                                                    onChange={(e) => handleChange(e, 'group_name')}
                                                >
                                                    <option value="">부서입력</option>
                                                    {depts.map((e) => (
                                                        <option key={e.dept_name} value={e.dept_name}>
                                                            {e.dept_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                            <div className={style.tableCell}>{user.group_name}</div>
                                        )}
                                    </div>
                                    <div className={style.tableCell}>{user.position}</div>
                                    <div className={style.tableCell}>{user.contact}</div>
                                    <div className={style.tableCell}>{user.email}</div>
                                    <div className={style.tableCell}>
                                        {editInactiveId === user.id ? (
                                            <>
                                                <button onClick={handleCancel2} className={style.cancel}>
                                                    취소
                                                </button>
                                                <button onClick={() => handleInactive(user.id)} className={style.save}>
                                                    완료
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEdit2(user.id)} className={style.edit}>
                                                해제
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                            : inactives
                                .filter(
                                    (e) =>
                                        e.name.includes(search2) ||
                                        e.id.includes(search2) ||
                                        e.position.includes(search2) ||
                                        e.contact.includes(search2) ||
                                        e.email.includes(search2)
                                )
                                .map((user) => (
                                    <div className={style.tableRow} align='center' key={user.id}>
                                        <div className={style.tableCell}>{user.name}</div>
                                        <div className={style.tableCell}>{user.id}</div>
                                        <div className={style.tableCell}>
                                            {editInactiveId === user.id ? (
                                                <div className={style.deptContainer}>
                                                    <select
                                                        name="department"
                                                        value={editedUser.group_name || ''}
                                                        className={style.dept}
                                                        onChange={(e) => handleChange(e, 'group_name')}
                                                    >
                                                        <option value="">부서입력</option>
                                                        {depts.map((e) => (
                                                            <option key={e.dept_name} value={e.dept_name}>
                                                                {e.dept_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : (
                                                <div className={style.tableCell}>{user.group_name}</div>
                                            )}
                                        </div>
                                        <div className={style.tableCell}>{user.position}</div>
                                        <div className={style.tableCell}>{user.contact}</div>
                                        <div className={style.tableCell}>{user.email}</div>
                                        <div className={style.tableCell}>
                                            {editInactiveId === user.id ? (
                                                <>
                                                    <button onClick={handleCancel2} className={style.cancel}>
                                                        취소
                                                    </button>
                                                    <button onClick={() => handleInactive(user.id)} className={style.save}>
                                                        완료
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleEdit2(user.id)} className={style.edit}>
                                                    해제
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                    </div>
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
