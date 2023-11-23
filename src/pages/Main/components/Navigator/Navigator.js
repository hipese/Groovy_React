import React, { useContext } from "react";
import styles from "./Navigator.module.css";
import DropDowns from "./DropDown/DropDowns";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import logo from "./assets/Groovy.png";
import Avatar from "./Avatar/Avatar";
import Badge from "./Badge/Badge";
import { MemberContext } from "../../../Groovy/Groovy";
import { Link } from "react-router-dom";

const Navigator = () => {
  const members = useContext(MemberContext);
  return (
    <Container className={styles.container} fluid>
      <Row>
        <Col>
          <Link to="/Groovy/dashboard">
          <img
            src={logo}
            alt="logo"
            width={"130px"}
            height={"50px"}
            className={styles.logo}
          />
          </Link>
          <div className="DropDown">
            <DropDowns />
          </div>
          <div className={styles.name}>{members.member.name} {members.member.position}님</div>
          <Badge />
          <Avatar />
        </Col>
      </Row>
    </Container>
  );
};

export default Navigator;
