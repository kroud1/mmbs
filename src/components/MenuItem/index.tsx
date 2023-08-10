import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  url: string;
  subTitles: any[];
}

function MenuComponent({ title, subTitles }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigator = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemHandler = (url: string) => {
    setAnchorEl(null);
    navigator(url);
  };

  return (
    <Box>
      <Typography
        textAlign={"center"}
        variant="subtitle1"
        fontSize={20}
        onClick={handleClick}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default MenuComponent;
