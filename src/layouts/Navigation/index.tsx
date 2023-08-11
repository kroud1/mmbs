import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Popper,
  InputBase,
} from "@mui/material";
import { alpha } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "styled-components";

import MenuComponent from "../../components/MenuItem";
import PoperMenuItem from "../../components/PoperMenuItem";
import { AGE_LIST, CATEGORY_LIST } from "../../constants/navigation";

function Navigation() {
  // 팝퍼의 앵커 요소에 대한 상태 관리 (Propper 위치 조정용)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 검색 입력란의 상품 제목 상태 관리
  const [productTitle, setProductTitle] = useState<string>("");

  const navigate = useNavigate();

  // 입력된 상품 제목으로 검색 페이지 이동
  const handleSearch = () => {
    navigate(`/search/${productTitle}`);
  };

  // 검색 입력란에서 Enter 키 누를 시의 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // 메뉴 아이콘 클릭 이벤트 핸들러
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popper" : undefined;

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
            {/* 카테고리 목록 - CATEGORY_LIST를 순회하여 요소 가져오기*/}
            {CATEGORY_LIST.map((category) => (
              <MenuComponent
                title={category.title}
                url={category.url}
                subTitles={category.subTitles}
              />
            ))}
            <Divider
              style={{ borderColor: "#ffffff" }}
              orientation="vertical"
              flexItem
            />
            {/* {} : 태그(HTML안에 문법 사용),  () : 문법 안에 HTML 사용할 때 */}
            {/* 연령대별 목록 */}
            {AGE_LIST.map((age) => (
              <MenuComponent
                title={age.title}
                url={age.url}
                subTitles={age.subTitles}
              />
            ))}
          </Box>
          <Popper
            id={id}
            open={isOpen}
            placement="bottom-start"
            anchorEl={anchorEl}
            sx={{ zIndex: 999 }}
          >
            <PoperMenuItem setAnchorEl={setAnchorEl} />
          </Popper>
          <Search>
            <IconButton>
              <SearchIconWrapper />
            </IconButton>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setProductTitle(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// npm i styled-components
const Search = styled.div`
  position: relative;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) => alpha(props.theme.palette.common.white, 0.15)};
  &:hover {
    background-color: ${(props) =>
      alpha(props.theme.palette.common.white, 0.25)};
  }
  margin-left: 0;
  width: 100%;
  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin-left: ${(props) => props.theme.spacing(1)}px;
    width: auto;
  }
`;

const SearchIconWrapper = styled.div`
  padding: ${(props) => `${props.theme.spacing(0, 2)}px`};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  & .MuiInputBase-input {
    padding: ${(props) => props.theme.spacing(1, 1, 1, 0)}px;
    padding-left: calc(1em + ${(props) => props.theme.spacing(4)}px);
    transition: ${(props) => props.theme.transitions.create("width")};
    width: 100%;
    @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
      width: 12ch;
      &:focus {
        width: 20ch;
      }
    }
  }
`;

export default Navigation;
