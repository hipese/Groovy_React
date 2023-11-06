import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./Board.module.css";

const List = () => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get("/api/boards").then(resp => {
            setBoards(resp.data);
        })
    }, []);


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
                                <th>Contents</th>
                                <th>View_Count</th>
                                <th>Category</th>
                                <th>Write_Date</th>
                            </tr>
                            {boards.map((e) => (
                                <tr key={e.seq}>
                                    <td>{e.seq}</td>
                                    <td>{e.writer}</td>
                                    <td>
                                        <Link to={`/groovy/board/detail/${e.seq}`}>{e.title}</Link>
                                    </td>
                                    <td>{e.contents}</td>
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
                    pagenation
                </div>
            </div>
        </div>
    )
}

export default List;