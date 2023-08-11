import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { AGE_LIST, CATEGORY_LIST } from "../../constants/navigation";

interface Props {
  setAnchorEl: (parameter: null | HTMLElement) => void;
}

function PoperMenuItem({ setAnchorEl }: Props) {
  const navigate = useNavigate();

  const menuItemHandler = (url: string) => {
    // Poper를 닫기 위해 setAnchorEl 함수 호출
    setAnchorEl(null);

    // 주어진 페이지로 이동
    navigate(url);
  };

  // 메뉴 그룹을 렌더링하는 함수
  const renderMenuGroup = (
    group: any,
    isLastGroupItem: (title: string) => boolean
  ) => (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {/* 각 메뉴 그룹의 타이틀 표시 */}
        <Typography
          mb={2}
          fontWeight={600}
          textAlign="center"
          variant="subtitle1"
          component="div"
        >
          {group.title}
        </Typography>
        {/* 각 메뉴 그룹의 서브타이틀 리스트를 반복적으로 표시 */}
        {/* group(각 리스트의 요소) */}
        {group.subTitles.map((item: any) => (
          <Typography
            pl={2}
            mb={1}
            mt={2}
            variant="subtitle2"
            component="div"
            onClick={() => menuItemHandler(item.url)}
          >
            {item.subTitle}
          </Typography>
        ))}
      </Box>

      {/* 주어진 판별 함수 - isLastGroupItem을 사용해서 마지막 메뉴 아이템이 아닐 경우
      구분자를 표시
       */}
      {/* 각각의 group의 title을 사용하여 isLastGroupItem 함수로 구분자 표시  */}
      {!isLastGroupItem(group.title) && (
        <Divider
          style={{ borderColor: "#b3894f" }}
          orientation="vertical"
          flexItem
        />
      )}
    </>
  );

  return (
    <Box
      display="flex"
      width={"80vw"}
      sx={{
        border: 2,
        borderColor: "#B3894F",
        p: 1,
        bgcolor: "background.paper",
        borderRadius: 2,
        mt: 1,
      }}
    >
      {/* 카테고리 리스트를 반복적으로 렌더링 */}
      {CATEGORY_LIST.map((category) =>
        renderMenuGroup(
          category,
          (title) => title === CATEGORY_LIST[CATEGORY_LIST.length - 1].title
        )
      )}

      {/* 나이별 카테고리 아이템을 렌더링 */}
      {AGE_LIST.map((age) =>
        renderMenuGroup(age, (title) => title === "4~7세")
      )}
    </Box>
  );
}

export default PoperMenuItem;
