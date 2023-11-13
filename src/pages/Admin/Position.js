import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Position.module.css';

const Position = () => {
    const [positions, setPositions] = useState([]);
    const [newPosition, setNewPosition] = useState('');
    const [editPositionId, setEditPositionId] = useState(null);

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

    return (
        <div className="Admincontainer">
            <div className={style.search}>
                <input type="text" placeholder="사용자 검색" />
                <button>검색</button>
            </div>
            <hr />
            <div className="body">
                <div className={style.margin}>직위 관리</div>
                <hr />
                <div className={style.position}>
                    <table border="1">
                        <tbody>
                            <tr align="center">
                                <th>직위</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="직위 입력"
                                        className={style.pos}
                                        value={newPosition}
                                        onChange={(e) => setNewPosition(e.target.value)}
                                    />
                                </td>
                                <td>
                                    {editPositionId === null ? (
                                        <button onClick={handleAdd} className={style.edit}>
                                            추가
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handleCancel} className={style.cancel}>
                                                취소
                                            </button>
                                            <button onClick={() => handleAdd(editPositionId)} className={style.save}>
                                                완료
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                            {positions.map((e) => (
                                <tr align="center" key={e.position}>
                                    <td>{e.position}</td>
                                    <td>
                                        <button onClick={() => handleDel(e.position)} className={style.del}>
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

export default Position;
