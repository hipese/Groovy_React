import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Bell from "../assets/bell.png";

// 뱃지에 스타일을 적용
const StyledBadge = styled(Badge)({
  "& .MuiBadge-dot": {
    position: "absolute",
    top: 2,
    right: 5,
    scale: "0.7",
    // display: "none", // 이걸로 뱃지를 숨기고 보이게 할 수 있음
  },
});

const BellIcon = styled("img")({
  width: "30px",
  height: "32px",
  opacity: "0.8",
  "&: hover": {
    cursor: "pointer",
  },
});

const BellContainer = styled(Box)({
  position: "absolute",
  top: "15px",
  right: "65px",
});

function DotBadge() {
  return (
    <BellContainer>
      <StyledBadge color="error" variant="dot">
        <BellIcon src={Bell} alt="bell" />
      </StyledBadge>
    </BellContainer>
  );
}

export default DotBadge;
