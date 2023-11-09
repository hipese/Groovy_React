import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import admin from "./assets/admin.svg";
import approval from "./assets/approval.png";
import board from "./assets/board.png";
import calendar from "./assets/calendar.svg";
import contacts from "./assets/bxs-contact.svg";
import layout from "./assets/layout.svg";
import setting from "./assets/setting.svg";
import survey from "./assets/survey.png";
import list from "./assets/trello.svg";
import message from "./assets/message.svg";
import mail from "./assets/mail.svg";
import down from "./assets/down.svg";

const styles = {
  dropdown: {
    display: "block",

  },
  button: {
    marginTop: "15px",
    marginLeft: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  dropdownMenu: {
    border: "1px solid black",
    borderRadius: "5px",
    position: "fixed",
    zIndex: "9999",
    top: "60px",
    left: "90px",
    padding: "30px",
    display: "none",
    backgroundColor: "white",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    listStyle: "none",
    minWidth: "200px",
    maxWidth: "350px",
  },
  item: {
    flex: "0 0 50%",
  },
  link: {
    textDecoration: "none",
    display: "block",
    color: "black",
    height: "40px",
  },
  activeDropdownMenu: {
    display: "block",
  },
};
const Item = styled.div`
  line-height: 40px;
  padding-left: 10px;
  &:hover {
    background-color: rgba(0, 200, 255, 0.1);
  }
`;
const List = styled.li`
  &:hover {
    color: rgba(0, 100, 255);
  }
`;

// Dropdown 컴포넌트 정의
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };
    this.toggleState = this.toggleState.bind(this);
    this.dropdownRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  // 마운트 되었을 때, 이벤트 리스너 추가
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  // 언마운트 되었을 때, 이벤트 리스너 제거
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleState() {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  }

  // 드롭다운 메뉴 바깥을 클릭하면 드롭다운 메뉴를 닫음
  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
      this.setState({
        isOpened: false,
      });
    }
  }

  render() {
    const { isOpened } = this.state;
    const dropdownMenuStyle = isOpened
      ? { ...styles.dropdownMenu, ...styles.activeDropdownMenu }
      : styles.dropdownMenu;

    return (
      <div style={styles.dropdown} ref={this.dropdownRef}>
        <button style={styles.button} onClick={this.toggleState}>
          메뉴
          <img src={down} alt="" width={"20px"} height={"15px"} />
        </button>
        <div style={dropdownMenuStyle}>
          <ul style={styles.list}>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/dashboard" style={styles.link}>
                    <img src={layout} alt="" width={"15px"} height={"15px"} />{" "}
                    개요
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/contacts" style={styles.link}>
                    <img src={contacts} alt="" width={"15px"} height={"15px"} />{" "}
                    주소록
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/message" style={styles.link}>
                    <img src={message} alt="" width={"15px"} height={"15px"} />{" "}
                    메시징
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/mail" style={styles.link}>
                    <img src={mail} alt="" width={"15px"} height={"15px"} />{" "}
                    메일
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/survey" style={styles.link}>
                    <img src={survey} alt="" width={"15px"} height={"15px"} />{" "}
                    설문
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/list" style={styles.link}>
                    <img src={list} alt="" width={"15px"} height={"15px"} />{" "}
                    할일
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/calendar" style={styles.link}>
                    <img src={calendar} alt="" width={"15px"} height={"15px"} />{" "}
                    캘린더
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/board" style={styles.link}>
                    <img src={board} alt="" width={"15px"} height={"15px"} />{" "}
                    게시판
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/signlist" style={styles.link}>
                    <img src={approval} alt="" width={"15px"} height={"15px"} />{" "}
                    전자결재
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/attendence" style={styles.link}>
                    <img src={setting} alt="" width={"15px"} height={"15px"} />{" "}
                    근태관리
                </Link>
              </Item>
            </List>
            <List style={styles.item} onClick={this.toggleState}>
              <Item>
                <Link to="/Groovy/admin" style={styles.link}>
                    <img src={admin} alt="" width={"15px"} height={"15px"} />{" "}
                    관리
                </Link>
              </Item>
            </List>
          </ul>
        </div>
      </div>
    );
  }
}

export default Dropdown;
