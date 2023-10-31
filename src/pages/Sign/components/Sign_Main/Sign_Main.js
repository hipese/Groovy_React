import { Container } from "reactstrap";
import style from "./Sign_Main.module.css"
const Sign_Main = () => {
    return (
        <Container>
            <div className={style.header}>
                전자결제 홈
            </div>
        </Container>
    );
}

export default Sign_Main;