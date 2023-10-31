import { Col, Container, Row } from "reactstrap";
import style from "./Sign_Main.module.css"
const Sign_Main = () => {
    return (
        <Container>
            <div className={style.header}>
                전자결제 홈
                <hr />
            </div>

            <div className={style.body}>
                결제 대기중인 문서
                <div></div>
                <div>승인할 문서 11건이 있습니다.</div>
                <Row className={style.tableBox}>
                    <Col xs="2">문서번호</Col>
                    <Col xs="3">기안일</Col>
                    <Col xs="1">결제양식</Col>
                    <Col xs="5">제목</Col>
                    <Col xs="1">첨부</Col>
                </Row>
            </div>

        </Container>
    );
}

export default Sign_Main;