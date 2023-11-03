import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./Board.module.css";

const Board = () => {

    const [boards, setBoards] = useState([]);
    console.log(boards)

    useEffect(() => {
        axios.get('api/boards').then(resp => {
            setBoards(resp.data);
            console.log(setBoards)
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
                                <th>Like</th>
                                <th>Title</th>
                                <th>File</th>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>View</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                            {boards.map((e) => (
                                <tr key={e.seq}>
                                    <td>{e.seq}</td>
                                    <td>{e.like}</td>
                                    <td>
                                        <Link to={`/board/detail/${e.seq}`}>{e.title}</Link>
                                    </td>
                                    <td>{e.file}</td>
                                    <td>{e.profile}</td>
                                    <td>{e.name}</td>
                                    <td>{e.view}</td>
                                    <td>{e.category}</td>
                                    <td>{e.date}</td>
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

export default Board;