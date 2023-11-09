import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./Manage.module.css";
import { Pagination, PaginationItem } from "@mui/material";

const Inactive = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [boards, setBoards] = useState([]);
    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        axios.get("/api/boards/recent").then(resp => {
            setBoards(resp.data);
        })
    }, []);

    const totalItems = boards.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleBoard = boards.slice(startIndex, endIndex);

    return (
        <div className="Boardcontainer">
            <div className={style.search}>
                <input type="text" placeholder='게시글 검색'></input>
                <button>검색</button>
            </div>
            <hr></hr>
            <div className="body">
                <div className={style.margin}>
                    최근 게시물
                </div>
                <hr></hr>
                <div className={style.margin}>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Seq</th>
                                <th>Writer</th>
                                <th>Title</th>
                                <th>View_Count</th>
                                <th>Category</th>
                                <th>Write_Date</th>
                            </tr>
                            {visibleBoard.map((e) => (
                                <tr key={e.seq}>
                                    <td>{e.seq}</td>
                                    <td>{e.writer}</td>
                                    <td>
                                        <Link to={`/groovy/board/detail/${e.seq}`}>{e.title}</Link>
                                    </td>
                                    <td>{e.view_count}</td>
                                    <td>{e.category}</td>
                                    <td>{e.write_date}</td>
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

export default Inactive;