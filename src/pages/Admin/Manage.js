import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from "./Manage.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const Manage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [depts, setDept] = useState([{ dept_name: "" }]);
    const [positions, setPosition] = useState([{ position: "" }]);
    const [editUserId, setEditUserId] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', id: '', password: '', department: '', position: '', contact: '', email: '' });
    const [editedUser, setEditedUser] = useState({});

    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        axios.get("/api/admin/user").then(resp => {
            setUsers(resp.data);
        });
        axios.get("/api/admin/dept").then(resp => {
            setDept(resp.data);
        });
        axios.get("/api/admin/position").then(resp => {
            setPosition(resp.data);
        });
    }, []);

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleUser = users.slice(startIndex, endIndex);

    const handleAdd = (id) => {

        if (users.some(user => user.id === newUser.id)) {
            alert('이미 존재하는 ID입니다. 다른 ID를 사용해주세요.');
            return;
        }
        if (!/^\d+$/.test(newUser.id)) {
            alert('ID는 숫자만 입력 가능합니다.');
            return;
        }
        if (!/^\d+$/.test(newUser.contact)) {
            alert('전화번호는 숫자만 입력 가능합니다.');
            return;
        }
        if (newUser.contact.length > 11) {
            alert('전화번호는 최대 11자까지 입력 가능합니다.');
            return;
        }
        const isEmptyField = ['name', 'id', 'password', 'position', 'contact', 'email'].some(field => newUser[field] === '');
        if (isEmptyField && newUser.department === '') {
            alert('사용자 등록을 위해 값을 모두 채워주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newUser.name);
        formData.append('id', newUser.id);
        formData.append('password', newUser.password);
        formData.append('group_name', newUser.department || '');
        formData.append('position', newUser.position);
        formData.append('contact', newUser.contact);
        formData.append('email', newUser.email);

        axios.post("/api/admin", formData, {})
            .then(() => {
                axios.get("/api/admin/user").then(resp => {
                    setUsers(resp.data);
                });
                setNewUser({ name: '', id: '', password: '', department: '', position: '', contact: '', email: '' });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleChange = (event, field) => {
        const { value } = event.target;
        if (editUserId !== null) {
            setEditedUser((prevEditedUser) => ({
                ...prevEditedUser,
                [field]: value,
            }));
        }
    };

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user.id === id);
        setEditedUser(userToEdit);
        setEditUserId(id);
    };

    const handleCancel = () => {
        setEditedUser({});
        setEditUserId(null);
    };

    const handleDel = (id) => {
        const confirmDelete = window.confirm(`${newUser.name}(사번: ${newUser.id})님을 진짜로 삭제하시겠습니까? 
삭제된 사용자는 더이상 로그인 할 수 없으며, 데이터가 즉시 삭제됩니다.`);

        if (confirmDelete) {
            axios
                .delete(`/api/admin/delete/${id}`)
                .then(() => {
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                    setCurrentPage(currentPage);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleSave = (id) => {
        const formData = new FormData();
        formData.append('name', editedUser.name);
        formData.append('id', editedUser.id);
        formData.append('group_name', editedUser.group_name);
        formData.append('position', editedUser.position);

        axios.put(`/api/admin/update/${id}`, formData)
            .then(() => {
                axios.get("/api/admin/user").then(resp => {
                    setUsers(resp.data);
                });
                setEditedUser({});
                setEditUserId(null);
            })
            .catch((error) => {
                console.error(error);
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
                    사용자 관리
                </div>
                <div className={style.text}>
                    <div className={style.margin}>
                        • 사용자
                    </div>
                    <div>11명 (사용: 11 / 일시정지: 0)</div>
                </div>
                <br></br>
                <hr></hr>
                <div>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <th>ID</th>
                                <th>비밀번호</th>
                                <th>소속부서</th>
                                <th>직급</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th><input type="text" placeholder='이름 입력' className={style.name} value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></th>
                                <th><input type="text" placeholder='ID 입력' className={style.id} value={newUser.id} onChange={(e) => setNewUser({ ...newUser, id: e.target.value })} /></th>
                                <th><input type="password" placeholder='비밀번호 입력' className={style.pw} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></th>
                                <th>
                                    <select name="department" value={newUser.department} className={style.dept} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}>
                                        <option value="">부서입력</option>
                                        {depts.map((e) => (
                                            <option key={e.dept_name} value={e.dept_name}>{e.dept_name}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <select name="position" value={newUser.position} className={style.position} onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}>
                                        <option value="">직급입력</option>
                                        {positions.map((e) => (
                                            <option key={e.position} value={e.position}>{e.position}</option>
                                        ))}
                                    </select>
                                </th>
                                <th><input type="text" placeholder='전화번호 입력' className={style.contact} value={newUser.contact} onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })} /></th>
                                <th><input type="text" placeholder='이메일 입력' className={style.email} value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></th>
                                <th><button onClick={handleAdd} className={style.add}>사용자 등록</button></th>
                            </tr>
                            {visibleUser.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        {editUserId === user.id ? (
                                            <input type="text" name="name" value={editedUser.name || ''} className={style.name} onChange={(e) => handleChange(e, 'name')} />
                                        ) : (user.name)}
                                    </td>
                                    <td>{user.id}</td>
                                    <td>********</td>
                                    <td>
                                        {editUserId === user.id ? (
                                            <select name="department" value={editedUser.group_name || ''} className={style.dept} onChange={(e) => handleChange(e, 'group_name')}>
                                                <option value="">부서입력</option>
                                                {depts.map((e) => (
                                                    <option key={e.dept_name} value={e.dept_name}>{e.dept_name}</option>
                                                ))}
                                            </select>
                                        ) : (user.group_name)}
                                    </td>
                                    <td>
                                        {editUserId === user.id ? (
                                            <select name="position" value={editedUser.position || ''} className={style.position} onChange={(e) => handleChange(e, 'position')}>
                                                <option value="">직급입력</option>
                                                {positions.map((e) => (
                                                    <option key={e.position} value={e.position}>{e.position}</option>
                                                ))}
                                            </select>
                                        ) : (user.position)}
                                    </td>
                                    <td>{user.contact}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editUserId === user.id ? (
                                            <>
                                                <button onClick={handleCancel} className={style.cancel}>
                                                    수정취소
                                                </button>
                                                <button onClick={() => handleSave(user.id)} className={style.save}>
                                                    완료
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(user.id)} className={style.edit}>
                                                    수정
                                                </button>
                                                <button onClick={() => handleDel(user.id)} className={style.del}>
                                                    삭제
                                                </button>
                                            </>
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

export default Manage;
