import { Button, Col, Container, Input, Row } from "reactstrap";
import style from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "./Cookie";


const Login = () => {

    const navi = useNavigate();
    const { loginID, setLoginID } = useContext(LoginContext);
    const [acc, setAcc] = useState({id:"", password:""})
    const [remID, setRem] = useState(false);

    useEffect((e)=>{
        if(loginID != "") {
            navi("/Groovy/dashboard");
        }
    },[])

    useEffect((e) => {
        console.log("useEffect Activated")
        if(remID) {
            setCookie("GroovyID", acc.id,{path:'/'})
            console.log("Cookie has been set");
        } else {
            setCookie("GroovyID", "",{path:'/', maxAge:0})
            console.log("Cookie has been eliminated");
        }
            
    },[remID, acc.id])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAcc(prev => ({...prev, [name] : value}));
    }

    const handleIdRemChange = (isChecked) => {
        if(isChecked) {
            setRem(true);
        } else {
            setRem(false);
        }
        console.log(isChecked)
    }

    const handleLogin = () => {
        axios.post("/auth/login", acc).then(resp => {
            
        }).catch( () => {
            alert("아이디와 비밀번호를 다시 확인해주십시오.")
        });
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
                                <Input type="text" className={style.input_id} name="id" placeholder="ID" onChange={handleChange} value={acc.id} />
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={2}></Col>
                            <Col xs={8} className={style.input_pw_container}>
                                <Input type="password" className={style.input_pw} name="password" placeholder="Password" onChange={handleChange} value={acc.password} />
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
                                <Button color="primary" className={style.loginbtn} onClick={handleLogin}>Login</Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Login;