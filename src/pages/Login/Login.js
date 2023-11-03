import { Button, Col, Container, Input, Row } from "reactstrap";
import style from "./Login.module.css";
import { useContext } from "react";
import { LoginContext } from "../../App";


const Login = () => {

    const { loginID, setLoginID } = useContext(LoginContext);

    const handleIdRemChange = () => {

    }

    return (
        <Container fluid>
            <Row className={style.loginBox_container}>
                <Col xs={3}></Col>
                <Col xs={6}>
                    <Row className={style.loginBox}>
                        <Row>
                            <Col xs={12} className={style.logo_container}>
                                Groovy
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2}></Col>
                            <Col xs={8} className={style.input_id_container}>
                                <Input type="text" className={style.input_id} name="id" placeholder="ID" />
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={2}></Col>
                            <Col xs={8} className={style.input_pw_container}>
                                <Input type="password" className={style.input_pw} name="pw" placeholder="Password" />
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={2}></Col>
                            <Col xs={8} className={style.checkbox_idRem_container}>
                                <Input type="checkbox" className={style.checkbox_idRem} onChange={handleIdRemChange}></Input><span className={style.idRem_notice}>아이디 기억하기</span>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={2}></Col>
                            <Col xs={8} className={style.loginbtn_container}>
                                <Button color="primary" className={style.loginbtn}>Login</Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Login;