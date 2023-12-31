import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Position.module.css';
import { Input } from "reactstrap";

const Position = () => {
    const [positions, setPositions] = useState([]);
    const [newPosition, setNewPosition] = useState('');
    const [editPositionId, setEditPositionId] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/admin/position').then((resp) => {
            setPositions(resp.data);
        });
    }, []);

    const handleCancel = () => {
        setEditPositionId(null);
    };

    const handleAdd = () => {
        if (positions.some((position) => position.position === newPosition)) {
            alert('이미 존재하는 직위입니다');
            return;
        }

        if (newPosition.trim() === '') {
            alert('값을 채워주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('position', newPosition);

        axios
            .post('/api/admin/position', formData, {})
            .then(() => {
                axios.get('/api/admin/position').then((resp) => {
                    setPositions(resp.data);
                });
                setNewPosition('');
            })
            .catch(() => {
            });
    };

    const handleDel = (position) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmDelete) {
            axios
                .delete(`/api/admin/deleteP/${position}`)
                .then(() => {
                    axios.get('/api/admin/position').then((resp) => {
                        setPositions(resp.data);
                    });
                })
                .catch(() => {
                });
        }
    };

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    };

    const filteredPosition = search === ''
        ? positions
        : positions.filter(
            (e) =>
                e.position.includes(search)
        );

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
            </div>
            <hr />
            <div className="body">
                <div className={style.margin}>직위 관리</div>
                <hr />
                <div className={style.position}>
                    <div className={style.tableContainer}>
                        <div className={style.tableRow} align="center">
                            <div className={style.tableHeader}>직위</div>
                        </div>
                        <div className={style.tableRow}>
                            <div className={style.tableCell}>
                                <input
                                    type="text"
                                    placeholder="직위입력"
                                    className={style.pos}
                                    value={newPosition}
                                    onChange={(e) => setNewPosition(e.target.value)}
                                />
                            </div>
                            <div className={style.tableCell}>
                                {editPositionId === null ? (
                                    <button onClick={handleAdd} className={style.edit}>
                                        추가
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={handleCancel} className={style.cancel}>
                                            취소
                                        </button>
                                        <button
                                            onClick={() => handleAdd(editPositionId)}
                                            className={style.save}
                                        >
                                            완료
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {filteredPosition.map((e) => (
                            <div className={style.tableRow} align="center" key={e.position}>
                                <div className={style.tableCell}>{e.position}</div>
                                <div className={style.tableCell}>
                                    <button
                                        onClick={() => handleDel(e.position)}
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

export default Position;
