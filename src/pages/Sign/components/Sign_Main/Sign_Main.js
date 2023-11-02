import { Col, Container, Row } from "reactstrap";
import style from "./Sign_Main.module.css"
import DocumentList from "../../../Components/Table/DocumentList";

const Sign_Main = () => {
    return (
        <div className={style.sign_container}>
            <div className={style.header}>
                전자결제 홈
                <hr />
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>결제 대기중인 문서</div>
                <div className={style.text}>승인할 문서 11건이 있습니다.</div>
                <DocumentList />
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>결제 진행 문서</div>
                <div className={style.text}>진행중 문서가 11건이 있습니다.</div>
                <DocumentList />
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>완료 문서</div>
                <div className={style.text}>완료된 문서가 11건이 있습니다.</div>
                <DocumentList />
            </div>
      
        </div>
    );
}

export default Sign_Main;