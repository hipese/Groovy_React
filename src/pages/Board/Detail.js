import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import { Pagination, PaginationItem } from "@mui/material";

import { LoginContext } from '../../App';

const Detail = () => {
    const { loginID } = useContext(LoginContext);

    const { seq } = useParams();
    const navi = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const COUNT_PER_PAGE = 4;

    const [Board, setBoard] = useState({ seq: "", title: "", writer: "", contents: "", file: "", view_count: "", category: "", write_date: "" });
    const [Reply, setReply] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [showReply, setShowReply] = useState(false);
    const [editingReplyIndex, setEditingReplyIndex] = useState(null);
    const [editedReply, setEditedReply] = useState('');

    const handleDelete = () => {
        axios
            .delete(`/api/boards/com/${seq}`)
            .then((resp) => {
                navi("/groovy/board");
            })
            .catch(() => { });
    };

    useEffect(() => {
        axios.get(`/api/boards/com/${seq}`).then((resp) => {
            setBoard(resp.data);
        });
    }, [seq]);

    useEffect(() => {
        if (Board.category === "자유") {
            axios.get(`/api/reply/com/${seq}`).then((resp) => {
                setReply(resp.data);
                setShowReply(true);
            });
        }
    }, [Board]);


    const handleAddReply = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            const formData = new FormData();
            formData.append('writer', loginID);
            formData.append('contents', newReply);
            formData.append('parent_seq', Board.seq);

            axios.post(`/api/reply`, formData)
                .then((resp) => {
                    axios.get(`/api/reply/com/${seq}`).then((resp) => {
                        setReply(resp.data);
                    });
                    setNewReply('');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleEditClick = (index) => {
        setEditingReplyIndex(index);
        setEditedReply(Reply[index].contents);
    };

    const handleCancelEdit = () => {
        setEditingReplyIndex(null);
        setEditedReply('');
    };

    const handleSaveEdit = (editedContents) => {
        setEditingReplyIndex(null);
        setEditedReply('');
    };

    const totalItems = Reply.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleReply = Reply.slice(startIndex, endIndex);

    return (
        <div className={style.boardContainer}>
            <table border={1}>
                <thead>
                    <tr>
                        <th colSpan={7}>{`${Board.writer} 님의 메세지`}</th>
                    </tr>
                    <tr>
                        <th>Seq</th>
                        <th>Writer</th>
                        <th>Title</th>
                        <th>Contents</th>
                        <th>View_Count</th>
                        <th>Category</th>
                        <th>Write_Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Board.seq}</td>
                        <td>{Board.writer}</td>
                        <td>{Board.title}</td>
                        <td>{Board.contents}</td>
                        <td>{Board.view_count}</td>
                        <td>{Board.category}</td>
                        <td>{Board.write_date}</td>
                    </tr>
                    <tr>
                        <td colSpan={7} align="end" className={style.buttons}>
                            {loginID == Board.writer ? (
                                <>
                                    <Link to="/groovy/board">
                                        <button>Back</button>
                                    </Link>
                                    <button onClick={handleDelete}>Del</button>
                                    <Link to={`/groovy/board/update/${seq}`}>
                                        <button>Edit</button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/groovy/board">
                                    <button>Back</button>
                                </Link>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {showReply && (
                <>
                    <hr />
                    <div>
                        <div className={style.reply}>
                            <textarea
                                className={style.replyForm}
                                rows="4"
                                placeholder="댓글을 입력하세요."
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                onKeyDown={handleAddReply}
                            />
                        </div>
                        <div className={style.reply}>
                            {visibleReply.map((reply, index) => (
                                <div key={reply.seq} className={style.replyDiv}>
                                    <div className={style.profile}>
                                        <img src={reply.profile_image ? `/profiles/${reply.profile_image}` : `/assets/Default_pfp.svg`} alt="profile" />
                                    </div>
                                    <div className={style.text}>
                                        <p>{reply.name} {reply.group_name} {reply.position}</p>
                                        {editingReplyIndex === index ? (
                                            <>
                                                <textarea className={style.replyForm} rows="4" value={editedReply} onChange={(e) => setEditedReply(e.target.value)} />
                                                <div className={style.btn}>
                                                    <button onClick={() => handleSaveEdit(editedReply)}>완료</button>
                                                    <button onClick={handleCancelEdit}>취소</button>
                                                </div>
                                            </>
                                        ) : (<p>{reply.contents}</p>)}
                                        <p>{reply.write_date}</p>
                                    </div>
                                    <div className={style.btn}>
                                        {editingReplyIndex !== index && loginID == reply.writer && (
                                            <>
                                                <button onClick={() => handleEditClick(index)}>수정</button>
                                                <button>삭제</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
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
                </>
            )}
        </div>
    );
};

export default Detail;
