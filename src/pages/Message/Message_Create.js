import { Button, Col, Container, Input, Row } from "reactstrap";
import style from "./Message_Create.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import MuiButton  from '@mui/material/Button';
import { useNavigate } from "react-router";
import { LoginContext } from "../../App";

let Message_Create = () => {
    const navi = useNavigate();
    const {loginID, setLoginID} = useContext(LoginContext)
    const [contacts, setContacts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [room_name, setRoom_name] = useState("");

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") 
            return;
        setOpen(false);
    };

    const onClickHandler = () => {
        if(room_name === "")
            return;
        axios.post("/api/message/createRoom",checked,{params:{room_name:room_name}}).then(resp=>{
            navi("/Groovy/message");
        }).catch(err => {
            console.log(err);
        })
    }

    const room_nameChangeHandler = (e) => {
        setRoom_name(e.target.value);
        console.log(room_name)
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
                            <div className={style.checked_member} key={member.id}>
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
                            contacts.filter(member => member.id != loginID)
                            .map((member) => {
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
                            contacts.filter(member =>(member.id != loginID) && (member.group_name.includes(search) || member.name.includes(search) || member.position.includes(search)))
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
                <Button className={style.btn_create} style={checked.length == 0 ? {bottom:"-20%"} : {bottom:"5%"}} onClick={handleClickOpen}>채팅방 만들기</Button>
            </Row>
            <Row>
            <Dialog open={open} onClose={handleClose} keepMounted maxWidth={"sm"} fullWidth>
        <DialogTitle>채팅방 이름 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            사용하실 채팅방 이름을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="room_name"
            label="채팅방 이름"
            type="text"
            fullWidth
            variant="standard"
            onChange={room_nameChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton className={style.dialog_btn} onClick={handleClose}>취소</MuiButton>
          <MuiButton className={style.dialog_btn} onClick={onClickHandler}>방 만들기</MuiButton>
        </DialogActions>
      </Dialog>
            </Row>
        </Container>
    );
}

export default Message_Create;