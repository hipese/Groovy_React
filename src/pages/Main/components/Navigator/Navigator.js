import styles from "./Navigator.module.css";
import DropDowns from "./DropDown/DropDowns";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import logo from "./assets/다운로드.png";
import Avatar from "./Avatar/Avatar";
import Badge from "./Badge/Badge";

const Navigator = () => {
  return (
    <Container className={styles.container} fluid>
      <Row>
        <Col>
          <img
            src={logo}
            alt="logo"
            width={"80px"}
            height={"60px"}
            className={styles.logo}
          />
          <div className="DropDown">
            <DropDowns />
          </div>
          <div className={styles.name}>○○○ 님</div>
          <Badge />
          <Avatar />
        </Col>
      </Row>
    </Container>
  );
};

export default Navigator;
