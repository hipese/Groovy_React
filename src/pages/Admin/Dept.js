import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Position.module.css';
import { Input } from "reactstrap";

const Dept = () => {
    const [depts, setDepts] = useState([]);
    const [newDept, setNewDept] = useState('');
    const [editDeptId, setEditDeptId] = useState(null);
    const [search, setSearch] = useState('');

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

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    };

    const filteredDept = search === ''
        ? depts
        : depts.filter(
            (e) =>
                (e.dept_name && e.dept_name.includes(search))
        );

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
            </div>
            <hr />
            <div className="body">
                <div className={style.margin}>직무 관리</div>
                <hr />
                <div className={style.position}>
                    <div className={style.tableContainer}>
                        <div className={style.tableRow} align="center">
                            <div className={style.tableHeader}>직무</div>
                        </div>
                        <div className={style.tableRow}>
                            <div className={style.tableCell}>
                                <input
                                    type="text"
                                    placeholder="직무입력"
                                    className={style.pos}
                                    value={newDept}
                                    onChange={(e) => setNewDept(e.target.value)}
                                />
                            </div>
                            <div className={style.tableCell}>
                                {editDeptId === null ? (
                                    <button onClick={handleAdd} className={style.edit}>
                                        추가
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={handleCancel} className={style.cancel}>
                                            취소
                                        </button>
                                        <button
                                            onClick={() => handleAdd(editDeptId)}
                                            className={style.save}
                                        >
                                            완료
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {filteredDept.map((e) => (
                            <div className={style.tableRow} align="center" key={e.dept_name}>
                                <div className={style.tableCell}>{e.dept_name}</div>
                                <div className={style.tableCell}>
                                    <button
                                        onClick={() => handleDel(e.dept_name)}
                                        className={style.del}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Dept;
