
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router";
import { dashboardPages } from "@/routes/pages.jsx";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const DRAWER_WIDTH = 260;
const COLLAPSE_WIDTH = 72;

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const location = useLocation();
  const path = location?.pathname ?? "/";
  const theme = useTheme();
  const { t } = useTranslation();

  const content = (
    <Box 
      sx={{ 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          px: collapsed ? 1.5 : 2, 
          py: 1.5,
          transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1,
            overflow: "hidden",
            width: collapsed ? 0 : "auto",
            opacity: collapsed ? 0 : 1,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Box>
            <Box component="span" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
              {t("sidebar.dashboard")}
            </Box>
            <Box component="div" sx={{ fontSize: 12, color: theme.palette.text.secondary }}>
              {t("sidebar.admin")}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton 
            size="small" 
            onClick={onToggleCollapse} 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {collapsed ? (
              <MenuIcon 
                sx={{ 
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }} 
              />
            ) : theme.direction === "rtl" ? (
              <ChevronRightIcon 
                sx={{ 
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }} 
              />
            ) : (
              <ChevronLeftIcon 
                sx={{ 
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }} 
              />
            )}
          </IconButton>
        </Box>
      </Box>

      <Divider 
        sx={{ 
          mx: collapsed ? 1 : 2,
          transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }} 
      />

      <List sx={{ flex: 1, px: collapsed ? 0.5 : 1 }}>
        {dashboardPages.map((item) => {
          const active = path === item.href;
          const displayName = t(`pages.${item.key}`, item.name);
          
          return (
            <Link 
              key={item.href} 
              to={item.href} 
              style={{ textDecoration: "none", color: "inherit" }}
            >
                <ListItemButton
                  selected={active}
                  sx={{
                    py: 1.25,
                    px: collapsed ? 0.75 : 1.5,
                    borderRadius: 2,
                    my: 0.5,
                    justifyContent: collapsed ? "center" : "flex-start",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    ...(active && {
                      bgcolor: `${theme.palette.primary.main}11`, // subtle
                      [theme.direction === "rtl" ? "borderRight" : "borderLeft"]: collapsed 
                        ? "none" 
                        : `4px solid ${theme.palette.primary.main}`,
                    }),
                  }}
                >
                  <Tooltip 
                    title={collapsed ? displayName : ""} 
                    placement={theme.direction === "rtl" ? "left" : "right"} 
                    disableHoverListener={!collapsed}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 0, 
                        [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: collapsed ? 0 : 1.5, 
                        color: theme.palette.text.primary,
                        transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
                  {!collapsed && (
                    <ListItemText 
                      primary={displayName}
                      sx={{
                        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        opacity: 1,
                        "& .MuiListItemText-primary": {
                          direction: theme.direction,
                          textAlign: theme.direction === "rtl" ? "right" : "left",
                        },
                      }}
                    />
                  )}
                </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? COLLAPSE_WIDTH : DRAWER_WIDTH,
          flexShrink: 0,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiDrawer-paper": {
            width: collapsed ? COLLAPSE_WIDTH : DRAWER_WIDTH,
            boxSizing: "border-box",
            [theme.direction === "rtl" ? "borderLeft" : "borderRight"]: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
            px: 0.5,
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflowX: "hidden",
          },
        }}
      >
        {content}
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={Boolean(open)}
        onClose={onClose}
        variant="temporary"
        ModalProps={{ 
          keepMounted: true,
          BackdropProps: {
            sx: {
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          },
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { 
            width: DRAWER_WIDTH,
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}
