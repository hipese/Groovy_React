import { Col, Container, Input, Row } from "reactstrap";
import style from "./Contact.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

const Contact_Favorite = () => {

    const [contacts, setContacts] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("/api/contact/selectFavorite").then((resp) => {
            setContacts(resp.data);
            axios.get("/api/contact/favorite").then((resp2) => {
                setFavorite(resp2.data);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const favoriteFilledHandler = (e) => {
        console.log("Unfavorite!")
        console.log("target : " + e.target);
        const {id} = e.target.dataset;
        console.log("clicked id : " + id)
        axios.delete(`/api/contact/delFavorite/${id}`).then((resp) => {
            console.log(resp.data)
            setFavorite(resp.data);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Row className={style.search_row}>
                <Col xs={10}></Col>
                <Col xs={2} className={style.search_container}>
                    <Input placeholder="검색" className={style.input_search} onChange={inputChangeHandler}></Input>
                </Col>
            </Row>

            <Row className={style.contacts_row}>
                <Col xs={12} className={style.contacts_list_container}>
                    <Row className={style.contacts_list}>
                        <Row className={style.contacts_list_header}>
                            <Col xs={1} className={style.header_favorite}><StarIcon></StarIcon></Col>
                            <Col xs={2} className={style.header_group}>부서</Col>
                            <Col xs={2} className={style.header_name}>이름</Col>
                            <Col xs={1} className={style.header_position}>직책</Col>
                            <Col xs={3} className={style.header_contact}>연락처</Col>
                            <Col xs={3} className={style.header_email}>이메일</Col>
                        </Row>

                        {
                            search == "" 
                            ?
                            contacts.map((member) => {
                                if(favorite.some(fav => fav == member.id))
                                return (
                                    <Row className={style.contact_object} key={member.id}>
                                        <Col xs={1} className={style.favorite_container}>
                                            <StarIcon onClick={favoriteFilledHandler} className={style.favorite_filled} data-id={member.id}></StarIcon>
                                        </Col>
                                        <Col xs={2} className={style.group_container}>
                                            {member.group_name}
                                        </Col>
                                        <Col xs={2} className={style.name_container}>
                                            {member.name}
                                        </Col>
                                        <Col xs={1} className={style.position_container}>
                                            {member.position}
                                        </Col>
                                        <Col xs={3} className={style.contact_container}>
                                            {member.contact}
                                        </Col>
                                        <Col xs={3} className={style.email_container}>
                                            {member.email}
                                        </Col>
                                    </Row>

                                )
                                else 
                                return "";
                            })
                            :
                            contacts.filter(member => member.name.includes(search) || member.position.includes(search) || member.contact.includes(search) || member.email.includes(search))
                            .map((member) => {
                                if(favorite.some(fav => fav == member.id))
                                return (
                                    <Row className={style.contact_object} key={member.id}>
                                        <Col xs={1} className={style.favorite_container}>
                                            <StarIcon onClick={favoriteFilledHandler} className={style.favorite_filled} data-id={member.id}></StarIcon>
                                        </Col>
                                        <Col xs={2} className={style.group_container}>
                                            {member.group_name}
                                        </Col>
                                        <Col xs={2} className={style.name_container}>
                                            {member.name}
                                        </Col>
                                        <Col xs={1} className={style.position_container}>
                                            {member.position}
                                        </Col>
                                        <Col xs={3} className={style.contact_container}>
                                            {member.contact}
                                        </Col>
                                        <Col xs={3} className={style.email_container}>
                                            {member.email}
                                        </Col>
                                    </Row>

                                )
                                else 
                                return "";
                            })
                        }

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact_Favorite;