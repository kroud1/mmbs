import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  // 팝퍼의 앵커 요소에 대한 상태
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 검색 입력란의 상품 제목 상태
  const [productTitle, setProductTitle] = useState<string>("");

  const navigator = useNavigate();

  // 입력된 상품 제목으로 검색 페이지 이동
  const SearchAdd = () => {
    navigator(`/search/${productTitle}`);
  };

  // 검색 입력란에서 Enter 키 누를 시의 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") SearchAdd();
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#f0a500" }}>
        <Toolbar style={{ paddingRight: "10vw", paddingLeft: "10vw" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            type="button"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Box display={"flex"} sx={{ flexGrow: 1 }}>

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
