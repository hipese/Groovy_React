import { Button, Col, Container, Input, Row } from "reactstrap";
import style from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./Cookie";


const Login = () => {
    const navi = useNavigate();
    const { loginID, setLoginID } = useContext(LoginContext);
    const [acc, setAcc] = useState({id:"", password:""})
    const [remID, setRem] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect((e)=>{
        if(loginID != "") {
            navi("/Groovy/dashboard");
        }
        axios.get("/auth/isLogined").then(resp => {
            if(resp.data != "") {
                setLoginID(resp.data);
                navi("/Groovy/dashboard");
            }
        })
        if(getCookie("GroovyID") !== undefined) {
            setAcc({id : getCookie("GroovyID"), password:""});
            setRem(true);
        }
    },[])

    if(isLoading) {
        return(
            <Container>
                <Row style={{marginTop : "30%"}}>
                    <Col className="text-center" style={{fontWeight:1000, fontSize:"10em"}}>Loading...</Col>
                </Row>
            </Container>
        )
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAcc(prev => {
            if(remID && name == "id") {
                setCookie("GroovyID",value);
            }
            return {...prev,[name]:value};
        });
        
    }

    const handleIdRemChange = (e) => {
        setRem(e.target.checked);
        if(!e.target.checked) {
            removeCookie("GroovyID");
        } else {
            setCookie("GroovyID", acc.id);
        }
    }

    const handleLogin = () => {
        axios.post("/auth/login", acc).then(resp => {
            setLoginID(resp.data);
            navi("/Groovy/dashboard")
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
                                <Input type="checkbox" className={style.checkbox_idRem} onChange={handleIdRemChange} checked={remID}></Input><span className={style.idRem_notice}>아이디 기억하기</span>
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