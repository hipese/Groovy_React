import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import style from "./Contact.module.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box, CircularProgress, Pagination, PaginationItem } from "@mui/material";

const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );
};

const Contact_Group = () => {

    const [contacts, setContacts] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const COUNT_PER_PAGE = 10;
    const totalItems = contacts.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleContacts = contacts.slice(startIndex, endIndex);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        axios.get("/api/contact/selectGroup").then((resp) => {
            resp.data.forEach((member) => {
                if(member.group_name == null)
                    member.group_name = "-";
            })
            setContacts(resp.data);
            axios.get("/api/contact/favorite").then((resp2) => {
                setFavorite(resp2.data);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
        setLoading(false);
    }, [])

    const inputChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const favoriteEmptyHandler = (e) => {
        console.log("Favorite!")
        console.log("target : " + e.target);
        const {id} = e.target.dataset;
        console.log("clicked id : " + id)
        axios.post("/api/contact/setFavorite",{target_id:id}).then((resp) => {
            console.log(resp.data)
            setFavorite(resp.data);
        }).catch(err => {
            console.log(err)
        })
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

    if (loading) {
        // 데이터 로딩 중에는 로딩창을 표시
        return <CircularIndeterminate />;
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
                            visibleContacts.map((member) => {
                                return (
                                    <Row className={style.contact_object} key={member.id}>
                                        <Col xs={1} className={style.favorite_container}>
                                            {
                                                favorite.some(target => target == member.id)
                                                ? <StarIcon onClick={favoriteFilledHandler} className={style.favorite_filled} data-id={member.id}></StarIcon>
                                                : <StarBorderIcon onClick={favoriteEmptyHandler} className={style.favorite_empty} data-id={member.id}></StarBorderIcon>
                                            }
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
                            })
                            :
                            contacts.filter(member => member.name.includes(search) || member.position.includes(search) || member.contact.includes(search) || member.email.includes(search))
                            .map((member) => {
                                return (
                                    <Row className={style.contact_object} key={member.id}>
                                        <Col xs={1} className={style.favorite_container}>
                                            {
                                                favorite.some(target => target == member.id)
                                                ? <StarIcon onClick={favoriteFilledHandler} className={style.favorite_filled} data-id={member.id}></StarIcon>
                                                : <StarBorderIcon onClick={favoriteEmptyHandler} className={style.favorite_empty} data-id={member.id}></StarBorderIcon>
                                            }
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
                            })
                        }

                    </Row>
                </Col>
            </Row>

            <Row>
            <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={onPageChange}
                        size="medium"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "15px 0",
                        }}
                        renderItem={(item) => (
                            <PaginationItem {...item} sx={{ fontSize: 12 }} />
                        )}
                    />
            </Row>
        </Container>
    );
}

export default Contact_Group;