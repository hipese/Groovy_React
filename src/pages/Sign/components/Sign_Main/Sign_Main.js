import { Col, Container, Row } from "reactstrap";
import style from "./Sign_Main.module.css"
const Sign_Main = () => {
    return (

        <Container>
            <div className={style.sign_container}>
                <div className={style.header}>
                    전자결제 홈
                    <hr />
                </div>

                <div className={style.body}>

                    <div className={style.documents}>
                        
                    </div>
                    <div className={style.titleText}>결제 대기중인 문서</div>
                    <div className={style.text}>승인할 문서 11건이 있습니다.</div>

                    <div className={style.tableBox}>
                        <div className={`${style.tableRow} ${style.tableHead}`}>
                            <div>문서번호</div>
                            <div>기안일</div>
                            <div>결제양식</div>
                            <div>기안자</div>
                            <div>제목</div>
                            <div>첨부</div>
                        </div>

                        <div className={style.tableRow}>
                            <div>2023</div>
                            <div>2023-10-24</div>
                            <div>품의서</div>
                            <div>안성진</div>
                            <div>휴가 신청</div>
                            <div>파일 아이콘</div>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Sign_Main;