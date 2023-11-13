import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Position.module.css';

const Dept = () => {
    const [depts, setDepts] = useState([]);
    const [newDept, setNewDept] = useState('');
    const [editDeptId, setEditDeptId] = useState(null);

    useEffect(() => {
        axios.get('/api/admin/dept').then((resp) => {
            setDepts(resp.data);
        });
    }, []);

    const handleCancel = () => {
        setEditDeptId(null);
    };

    const handleAdd = () => {
        if (depts.some((dept) => dept.dept_name === newDept)) {
            alert('이미 존재하는 직무입니다');
            return;
        }

        if (newDept.trim() === '') {
            alert('값을 채워주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('dept_name', newDept);

        axios
            .post('/api/admin/dept', formData, {})
            .then(() => {
                axios.get('/api/admin/dept').then((resp) => {
                    setDepts(resp.data);
                });
                setNewDept('');
            })
            .catch(() => {
            });
    };

    const handleDel = (deptName) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmDelete) {
            axios
                .delete(`/api/admin/deleteD/${deptName}`)
                .then(() => {
                    axios.get('/api/admin/dept').then((resp) => {
                        setDepts(resp.data);
                    });
                })
                .catch(() => {
                });
        }
    };

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <input type="text" placeholder="사용자 검색" />
                <button>검색</button>
            </div>
            <hr />
            <div className="body">
                <div className={style.margin}>직무 관리</div>
                <hr />
                <div className={style.position}>
                    <table border="1">
                        <tbody>
                            <tr align="center">
                                <th>직무</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="직무 입력"
                                        className={style.pos}
                                        value={newDept}
                                        onChange={(e) => setNewDept(e.target.value)}
                                    />
                                </td>
                                <td>
                                    {editDeptId === null ? (
                                        <button onClick={handleAdd} className={style.edit}>
                                            추가
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handleCancel} className={style.cancel}>
                                                취소
                                            </button>
                                            <button onClick={() => handleAdd(editDeptId)} className={style.save}>
                                                완료
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                            {depts.map((e) => (
                                <tr align="center" key={e.dept_name}>
                                    <td>{e.dept_name}</td>
                                    <td>
                                        <button onClick={() => handleDel(e.dept_name)} className={style.del}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Dept;
