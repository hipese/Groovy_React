import { Link } from "react-router-dom";
import style from "./Sign_Progress.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, PaginationItem } from "@mui/material";

const Sign_Progress = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sign_list, setSign_list] = useState([]);
    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        axios.get("/api/signlist").then((resp) => {
            setSign_list(resp.data);
        });
    }, []);

    const totalItems = sign_list.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleSignList = sign_list.slice(startIndex, endIndex);

    return (
        <div className={style.sign_container}>
            <div className={style.header}>
                결제진행중
                <hr />
            </div>
            <div className={style.documents}>
                <div className={style.titleText}>결제 진행중인 문서</div>
                <div className={style.text}>{`진행중 문서가 ${sign_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>첨부</div>
                </div>

                {visibleSignList.map((e, i) => {
                    return (
                        <div className={style.tableRow} key={i}>
                            <div>{e.seq}</div>
                            <div>{e.write_date}</div>
                            <div>{e.document_type}</div>
                            <div>{e.writer}</div>
                            <div className={style.titleContainer}>
                                <Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link>
                            </div>
                            <div>파일 아이콘</div>
                        </div>
                    );
                })}
            </div>
            <div className={style.pagenation}>
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
                        <PaginationItem {...item} sx={{ fontSize: 12 }} />
                    )}
                />
            </div>
        </div>
    );
};

export default Sign_Progress;
