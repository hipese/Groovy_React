import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import styles from "./SlideBar.module.css";

const SlideBar = () => {
  return (
    <Container className={styles.slidebar} fluid>
      <Row>
        <Col>
          <button className={styles.btn}>
            <strong>+</strong> 추가
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default SlideBar;
