import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import img from "../assets/쥐돌이.png";
import { Link } from 'react-router-dom';


// 뱃지의 스타일을 지정
const StyledBadge = styled(Badge)(({ theme }) => ({
  // 색상 지정
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "red",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    // 뱃지 css 위치 및 크기 지정
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  // 겉에 테두리가 퍼지는 효과
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledAvatar = styled(Avatar)({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  border: "1px solid #000000",
  "&:hover": {
    opacity: "0.8",
    cursor: "pointer",
  },
});
const ProfileContainer = styled("div")({
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  position: "absolute",
  right: "20px",
  top: "12.5px",
});

// 뱃지를 이용하여 프로필 사진을 띄움
function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <ProfileContainer>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Link to="mypagelist">
            <StyledAvatar src={img} alt="profile" />
          </Link>
        </StyledBadge>
      </ProfileContainer>
    </Stack>
  );
}

export default BadgeAvatars;
