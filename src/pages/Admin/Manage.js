import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./Manage.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const Manage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const COUNT_PER_PAGE = 10;

    // useEffect(() => {
    //     axios.get("/api/admin").then(resp => {
    //         setUsers(resp.data);
    //     })
    // }, []);

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleUser = users.slice(startIndex, endIndex);

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
                <hr></hr>
                <div className={style.text}>
                    <div className={style.margin}>
                        사용자 관리
                    </div>
                    <div className={style.margin}>11명 (사용: 11 / 일시정지: 0)</div>
                </div>
                <br></br>
                <div>
                    <button className={style.btn}>사용자 등록</button>
                </div>
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
                                <th><input type="text" placeholder='이름 입력' className={style.name} /></th>
                                <th><input type="text" placeholder='ID 입력' className={style.id} /></th>
                                <th><input type="password" placeholder='비밀번호 입력' className={style.pw} /></th>
                                <th>
                                    <select name="department" value={users.department} className={style.dept}>
                                        <option value="">부서입력</option>
                                        <option value="개발1팀">개발1팀</option>
                                        <option value="관리부">관리부</option>
                                        <option value="인사부">인사부</option>
                                        <option value="총무부">총무부</option>
                                    </select>
                                </th>
                                <th>
                                    <select name="position" value={users.position} className={style.position}>
                                        <option value="">직급입력</option>
                                        <option value="대표">대표</option>
                                        <option value="부장">부장</option>
                                        <option value="팀장">팀장</option>
                                        <option value="대리">대리</option>
                                        <option value="사원">사원</option>
                                    </select>
                                </th>
                                <th><input type="text" placeholder='전화번호 입력' className={style.contact} /></th>
                                <th><input type="text" placeholder='이메일 입력' className={style.email} /></th>
                                <th><button className={style.save}>저장</button></th>
                            </tr>
                            {visibleUser.map((e) => (
                                <tr key={e.name}>
                                    <td>{e.id}</td>
                                    <td>{e.password}</td>
                                    <td>{e.group_name}</td>
                                    <td>{e.position}</td>
                                    <td>{e.contact}</td>
                                    <td>{e.email}</td>
                                    <td>
                                        <button>수정</button>
                                        <button>수정취소</button>
                                        <button>저장</button>
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
    )
}

export default Manage;