import { useContext } from "react";
import * as React from 'react';
import { MemberContext } from "../../../../Groovy/Groovy";
import styles from "./MypageIndex.module.css"
import { styled } from "@mui/material/styles";
import { Avatar, BottomNavigation, BottomNavigationAction, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../../../App";
import axios from "axios";

const StyledAvatar = styled(Avatar)({
    width: "200px",
    height: "200px",
    border: "1px solid #000000",
    borderRadius: "0%",
    "&:hover": {
        opacity: "0.8",
        cursor: "pointer",
    },
});
const ProfileContainer = styled("div")({
    display: 'flex',      // Flexbox 레이아웃 사용
    justifyContent: 'center', // 가로 방향 가운데 정렬
    alignItems: 'center', // 세로 방향 가운데 정렬
    width: '100%',       // 부모 컨테이너의 전체 너비
    height: '100%',      // 부모 컨테이너의 전체 높이
});

const style = {
    width: '100%',
};

const MypageIndex = () => {

    const navigate = useNavigate();
    const { loginID, setLoginID }=useContext(LoginContext)
    const [value, setValue] = React.useState(0);
    const members = useContext(MemberContext);


    const handleEdit = () => {

    }

    const handlenaiv1 = () => {
        navigate("")
    }

    const handlenaiv2 = () => {
        navigate("surveyList")
    }
    const handleOutout = () => {
        console.log(loginID)

        const confirmLogout = window.confirm("로그아웃하시겠습니까?");
        if (confirmLogout) {

            axios.post("/auth/logout").then(resp => {
                console.log(resp.data);
                setLoginID("");
                navigate("/");
            })

        }
    }

    const handles=()=>{

    }

    return (
        <div className={styles.container} >
            <div className={styles.title}>
                {`${members.member.group_name} ${members.member.position}`}
            </div>
            <div className={styles.body}>
                <div className={styles.imageDiv}>
                    {members.member.profile_image ? <ProfileContainer>
                        <StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile"/>
                    </ProfileContainer> : <ProfileContainer>
                        <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile"/>
                    </ProfileContainer>}
                </div>
                <div className={styles.nameText}>
                    {members.member.name}
                </div>
                <div className={styles.email}>
                    {members.member.email}
                </div>

                <div className={styles.alarmsDiv}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="success">
                            오늘은 출석했습니다.
                        </Alert>
                        {/* <Alert variant="outlined" severity="error">
                            결석입니다.
                        </Alert> */}
                    </Stack>
                </div>

            </div>

            <div className={styles.footer}>

                <div className={styles.itemdiv}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            flexDirection: 'column',
                            '& .MuiBottomNavigationAction-root': {
                                width: '100%', // 각 BottomNavigationAction의 너비를 100%로 설정
                                // 라벨 스타일을 오버라이드합니다.
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '20px', // 라벨의 폰트 크기를 20px로 설정
                                    textAlign: 'left', // 라벨의 텍스트를 왼쪽으로 정렬
                                    marginRight: '75px', // 라벨의 텍스트에 왼쪽 여백을 추가
                                    whiteSpace: 'nowrap', // 줄바꿈 없이 한 줄에 표시
                                },
                            },
                            width: '100%',
                            minHeight: '100%',
                            backgroundColor: 'aliceblue',
                            border: '1px solid rgb(15, 129, 49)'
                        }}
                    >
                        <BottomNavigationAction label="정보수정" onClick={handlenaiv1} />
                        <BottomNavigationAction label="설문조사" onClick={handlenaiv2} />
                    </BottomNavigation>
                </div>

                <div className={styles.btndiv}>
                    <div className={styles.footerbtn}>
                        <Button variant="contained" onClick={handleOutout}>로그 아웃</Button>
                    </div>
                    <div className={styles.footerbtn}>
                        <Button variant="contained" onClick={handles}>고객 센터</Button>
                    </div>

                </div>

                <div className={styles.endTitle}>
                    <img src="/assets/Groovylogo.png"/>
                </div>
            </div>
        </div>
    );
}

export default MypageIndex;