import { Button, Col, Container, Input, Row } from "reactstrap";
import style from "./Message_Create.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

let Message_Create = () => {
    const [contacts, setContacts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("/api/contact/selectAll").then((resp) => {
            resp.data.forEach((member) => {
                if(member.group_name == null)
                    member.group_name = "-";
            })
            console.log(resp.data);
            setContacts(resp.data);
        }).catch(err => {
            console.log(err);
        })

    }, [])  

    const checkboxChangeHandler = (e) => {
        const {id} = e.target.dataset;
        if(e.target.checked) {
            const copy = [...checked, id]
            setChecked(copy);
        } else {
            const copy = checked.filter(prev => prev != id)
            setChecked(copy);
        }
    }

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    }


    return(
        <Container>
            <Row className={style.search_row}>
                <Col xs={10}></Col>
                <Col xs={2} className={style.search_container}>
                    <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
                </Col>
            </Row>
            <Row className={style.checked_member_list_container}>
            <Row className={style.checked_member_list} style={checked.length==0 ? {height:1}:{height:"auto"}}>
                {
                    contacts.filter(member => checked.includes(member.id)).map(member => {
                        let member_info = `${member.group_name} ${member.name} ${member.position}`;
                        
                        return (
                            <div className={style.checked_member}>
                                <div className={style.checked_member_profile_container}>
                                    {
                                        member.profile_image ?
                                        <img src={`/profiles/${member.profile_image}`} alt="profile" className={style.checked_profile_image} ></img> :
                                        <img src={`/assets/Default_pfp.svg`} alt="profile" className={style.checked_profile_image}></img>
                                    }
                                </div>
                                <div className={style.checked_member_name_container}>
                                    {member_info}
                                </div>
                            </div>
                        )
                    })        
                }
            </Row>
            </Row>

            <Row className={style.member_row}>
                <Col xs={12} className={style.members_list_container}>
                    <Row className={style.members_list}>
                        {
                            search == ""
                            ?
                            contacts.map((member) => {
                                let member_info = `${member.group_name} ${member.name} ${member.position}`;
                                return (
                                    <Row className={style.member_object} key={member.id}>
                                        <Col xs={1} className={style.checkbox_container}>
                                            <Input type="checkbox" className={style.checkbox_selectUser} data-id={member.id} onChange={checkboxChangeHandler} checked={checked.includes(member.id)}></Input>
                                        </Col>
                                        <Col xs={3} className={style.profile_container}>
                                            {
                                                member.profile_image ?
                                                <img src={`/profiles/${member.profile_image}`} alt="profile" className={style.profile_image} ></img> :
                                                <img src={`/assets/Default_pfp.svg`} alt="profile" className={style.profile_image}></img>
                                            }
                                        </Col>
                                        <Col xs={8} className={style.info_container}>
                                            {member_info}
                                        </Col>
                                    </Row>

                                )
                            })
                            :
                            contacts.filter(member => member.group_name.includes(search) || member.name.includes(search) || member.position.includes(search))
                            .map((member) => {
                                let member_info = `${member.group_name} ${member.name} ${member.position}`;
                                return (
                                    <Row className={style.member_object} key={member.id}>
                                        <Col xs={1} className={style.checkbox_container}>
                                            <Input type="checkbox" className={style.checkbox_selectUser} data-id={member.id} onChange={checkboxChangeHandler} checked={checked.includes(member.id)}></Input>
                                        </Col>
                                        <Col xs={2} className={style.profile_container}>
                                            {
                                                member.profile_image ?
                                                <img src={`/profiles/${member.profile_image}`} alt="profile" className={style.profile_image} ></img> :
                                                <img src={`/assets/Default_pfp.svg`} alt="profile" className={style.profile_image}></img>
                                            }
                                        </Col>
                                        <Col xs={9} className={style.info_container}>
                                            {member_info}
                                        </Col>
                                    </Row>

                                )
                            })       
                        }

                    </Row>
                </Col>
            </Row>
            <Row className={style.btn_container}>
                <Button color="primary" className={style.btn_create} style={checked.length == 0 ? {bottom:"-20%"} : {bottom:"5%"}}>채팅방 만들기</Button>
            </Row>
        </Container>
    );
}

export default Message_Create;