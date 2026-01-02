
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { DarkMode, LightMode, Language as LanguageIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode, setLanguage } from "@/store/ui/uiSlice";
import { logout } from "@/store/auth/authSlice";
import { selectUserInfo } from "@/store/auth/selectors";
import { useNavigate } from "react-router";
import Divider from "@mui/material/Divider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  padding: "6px 10px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 420,
  boxShadow: theme.shadows[1],
}));

export default function NavBar({ onOpenSidebar, title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  
  const mode = useSelector((state) => state.ui.mode);
  const language = useSelector((state) => state.ui.language);
  const userInfo = useSelector(selectUserInfo);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);
  
  const displayTitle = title || t("navbar.dashboard");

  // Get user initials for avatar
  const getInitials = () => {
    if (userInfo?.name) {
      return userInfo.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (userInfo?.email) {
      return userInfo.email[0].toUpperCase();
    }
    return "U";
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLanguage));
  };

  const handleToggleMode = () => {
    dispatch(toggleMode());
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1}}>
      <Toolbar 
        sx={{ 
          gap: 2, 
          py: 1.25,
        }}
      >
        {/* Mobile menu icon */}
        <IconButton
          edge={theme.direction === "rtl" ? "end" : "start"}
          onClick={onOpenSidebar}
          sx={{ display: { xs: "inline-flex", md: "none" }, color: theme.palette.text.primary }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand */}
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            {displayTitle}
          </Typography>
        </Box>

        {/* Search */}
        <Box 
          sx={{ 
            flex: 1, 
            display: "flex", 
            justifyContent: "center",
            order: 2,
          }}
        >
          <Search>
            <SearchIcon sx={{ [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: 1, opacity: 0.6 }} />
            <InputBase 
              placeholder={t("navbar.searchPlaceholder")} 
              inputProps={{ "aria-label": "search" }} 
              sx={{ width: "100%" }}
              dir={theme.direction}
            />
          </Search>
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, order: 3 }}>
          {/* Language Toggle */}
          <Tooltip title={language === "en" ? "العربية" : "English"}>
            <IconButton
              onClick={handleLanguageToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          {/* Mode Toggle */}
          <Tooltip title={t("navbar.mode")}>
            <IconButton
              onClick={handleToggleMode}
              sx={{ color: theme.palette.text.primary }}
            >
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title={t("navbar.notifications")}>
            <IconButton
              onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
              sx={{ color: theme.palette.text.primary }}
            >
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={notificationOpen}
            onClose={() => setNotificationAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: theme.direction === "rtl" ? "left" : "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: theme.direction === "rtl" ? "left" : "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 300,
                maxWidth: 360,
                maxHeight: 400,
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t("navbar.notifications")}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {t("navbar.noNotifications")}
              </Typography>
            </Box>
          </Menu>

          {/* Avatar / User Menu */}
          <Tooltip title={t("navbar.account")}>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ 
                p: 0, 
                [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: 0.5 
              }}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>
                {getInitials()}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: theme.direction === "rtl" ? "left" : "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: theme.direction === "rtl" ? "left" : "right",
            }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
              },
            }}
          >
            {userInfo && (
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {userInfo.name || userInfo.email}
                </Typography>
                {userInfo.email && (
                  <Typography variant="caption" color="text.secondary">
                    {userInfo.email}
                  </Typography>
                )}
              </Box>
            )}
            <Divider />
            <MenuItem onClick={handleProfileClick}>
              {t("navbar.profile")}
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              {t("navbar.settings")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              {t("navbar.signOut")}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
