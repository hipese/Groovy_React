import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { MemberContext } from "../../../../Groovy/Groovy";
import MypageDropDown from "../DropDown/MypageDropDown";


// 뱃지의 스타일을 지정
const StyledBadge = styled(Badge)(({ theme }) => ({
  // 색상 지정
  "& .MuiBadge-badge": {
    backgroundColor: "limegreen",
    color: "limegreen",
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
  aspectRatio: "1/1",
  "&:hover": {
    opacity: "0.8",
    cursor: "pointer",
  },
});
const ProfileContainer = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  position: "absolute",
  right: "20px",
  top: "12.5px",
});

const DropdownContainer = styled("div")({
  position: "absolute",
  top: "30px", // 버튼의 바닥에서 얼마나 떨어져 나타낼지
  right: "30px", // 오른쪽 끝에서 얼마나 떨어져 나타낼지
  width: "300px",
  height: "100px",
  backgroundColor: "white",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  padding: "0px 0px",
  zIndex: 1000, // 다른 요소들 위에 나타나게 하기 위함
  border: "1px solid #ddd", // 테두리 추가
  borderRadius: "8px", // 모서리 둥글기 조절
});

// 뱃지를 이용하여 프로필 사진을 띄움
function BadgeAvatars() {

  const members = React.useContext(MemberContext);
  const [showDropdown, setShowDropdown] = React.useState(false); // 드롭다운 상태
  const dropdownRef = React.useRef(null); // 드롭다운 참조를 위한 ref

  // 드롭다운 표시를 토글하는 함수
  const handleAvatarClick = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setShowDropdown((prev) => !prev);
  };


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); // 드롭다운을 닫습니다.
    }
  };

  //범위를 벗어나면 닫히도록 하는 Effect
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <ProfileContainer>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <StyledAvatar
            src={members.member.profile_image ? `/profiles/${members.member.profile_image}` : `/assets/Default_pfp.svg`}
            alt="profile"
            onClick={handleAvatarClick} // 클릭 이벤트 핸들러 추가
          />
          {showDropdown && (
            <DropdownContainer ref={dropdownRef}>
              <MypageDropDown closeDropdown={handleAvatarClick} />
            </DropdownContainer>
          )}
        </StyledBadge>
      </ProfileContainer>
    </Stack>
  );
}

export default BadgeAvatars;
