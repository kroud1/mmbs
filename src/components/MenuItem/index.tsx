import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem, Typography } from "@mui/material";

interface Props {
  title: string;
  url: string;
  subTitles: any[];
}

function MenuComponent({ title, subTitles }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isOpen = Boolean(anchorEl);

  // 텍스트를 클릭했을 때 메뉴를 표시하기 위한 핸들러
  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // 메뉴를 닫기 위한 핸들러
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 메뉴 항목을 클릭했을 때 액션 핸들러
  const handleMenuItemClick = (url: string) => {
    handleMenuClose();
    navigate(url);
  };

  return (
    <Box component="span" sx={{ flexGrow: 1 }}>
      <Typography
        textAlign={"center"}
        variant="subtitle1"
        fontSize={20}
        onClick={handleMenuOpen}
      >
        {title}
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        sx={{ pt: 1.5, pb: 1.5, mt: 2 }}
      >
        {subTitles.map((sub) => (
          <MenuItem
            key={sub.url}
            sx={{ minWidth: "10vw", pt: 1.5, pb: 1.5 }}
            onClick={() => handleMenuItemClick(sub.url)}
          >
            {sub.subTitle}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MenuComponent;
