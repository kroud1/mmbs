import React, { useState, KeyboardEvent } from "react";
import { useUserStore } from "../../stores";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import PersonIcon from "@mui/icons-material/Person";

import logo from "../../assets/images/logo.png";



// 로고
// 페이지명
// 로그인, 로그아웃

function Header() {
  // 사용자 정보와 removeUser 함수를 useUserStore에서 가져오기.
  const { user, removeUser } = useUserStore();

  // react-cookie 라이브러리 사용 : 쿠키에 대한 상태와 함수 가져오기.
  // cookies.token : 라이브러리의 토큰 사용 가능
  const [cookies, setCookies] = useCookies();

  // 로그아웃 핸들러
  const logOutHandler = () => {
    // 토큰 쿠키를 삭제
    setCookies("token", "", { expires: new Date() });
    // 사용자 정보 제거
    removeUser();
  };

  // 드로어 메뉴 상태 관리
  // 드로어(슬라이딩 메뉴)의 상태를 관리하는 state
  const [state, setState] = useState({ right: false });

  // 드로어 메뉴 토글 핸들러
  const toggleDrawer =
    (open: boolean) => (e: React.KeyboardEvent | React.MouseEvent) => {
      // 키보드의 'tab' 또는 'shift' 키가 눌려있을 때는 드로어 토글을 하지 X
      if (
        (e.type === "keydown" && (e as unknown as KeyboardEvent).key === "Tab") ||
        (e as unknown as KeyboardEvent).key === "Shift"
      ) {
        return;
      }
      // 드로어 상태 변경
      setState({ right: open });
    };

  // 드로어 메뉴의 리스트 컴포넌트
  const list = () => (
    <Box>
      <Box>
        <TagFacesIcon />
        <Typography>
          안녕하세요.{" "}
          <Typography>{user != null && <>{user.userName}</>}</Typography>님
        </Typography>
      </Box>
      {/* 드로어 메뉴 리스트를 Link 태그로 작성 */}
    </Box>
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        ml="10vw"
        mr="10vw"
        p={2}
      >
        <Box flex={1}>
          <Box component="img" src={logo} sx={{ height: "3.3em" }}></Box>
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Link to={""}>
            <Typography variant="h3">몽몽 책방</Typography>
          </Link>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          {/* 토큰 ? 참 : 거짓 */}
          {cookies.token ? (
            // 토큰이 존재한다면
            <Link to={""}>
              <Typography
                variant="subtitle1"
                m={2}
                onClick={() => logOutHandler()}
              >
                로그아웃
              </Typography>
            </Link>
          ) : (
            // 토큰이 존재하지 않는다면
            <Link to={""}>
              <Typography variant="subtitle1" m={2}>
                로그인
              </Typography>
            </Link>
          )}
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderColor: "#000000" }}
          />
          <Link to={""}>
            <Typography ml={2} mr={2} component={"span"}>
              회원가입
            </Typography>
          </Link>

            {/* 토큰이 있는 경우에 출력 && 연산자 사용 */}
          {cookies.token && (
          <>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: "#000000" }}
            />
            <IconButton onClick={toggleDrawer(true)}>
              <PersonIcon sx={{ marginRight: 2, marginLeft: 2 }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Header;
