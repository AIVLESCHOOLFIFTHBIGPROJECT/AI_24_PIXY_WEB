import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logoHero from "../assets/logo-hero.svg";
import logo from "../assets/logo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AuthHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const isLargeScreen = useMediaQuery("(min-width:1920px)");
  const [isTop, setIsTop] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const heroSectionHeight =
        document.getElementById("banner-section")?.offsetHeight || 0;
      setIsTop(position < heroSectionHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerStyle = {
    transition: "all 0.3s",
    backgroundColor: isTop ? "transparent" : "white",
    boxShadow: isTop ? "none" : "0px 2px 4px -1px rgba(0,0,0,0.2)",
  };

  const buttonStyle = {
    color: isTop ? "white" : "black",
    fontWeight: 600,
    fontSize: "clamp(0.875rem, 1vw, 1rem)",
  };

  return (
    <AppBar elevation={0} sx={headerStyle}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1920px",
          mx: "auto",
          px: {
            xs: "5vw",
            sm: "7vw",
            md: "9vw",
            lg: isLargeScreen ? "340px" : "calc((100vw - 1240px) / 2)",
          },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img src={logo} alt="Pixy Logo" height="30" />
            </Link>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default AuthHeader;
