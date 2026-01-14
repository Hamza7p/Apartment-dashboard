import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  useNotifications,
  useMarkAllNotificationsAsRead,
} from "@/hooks/api/useNotifications";

const NotificationMenu = ({ anchorEl, open, onClose }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch notifications with perPage = 15
  const { data: notificationsData, isLoading: notificationsLoading } = useNotifications(
    { page: 1, perPage: 15 },
    { enabled: open }
  );

  const markAsRead = useMarkAllNotificationsAsRead();

  const notifications = notificationsData?.data || notificationsData || [];

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read if not already read
    if (!notification.read_at && notification.id) {
      markAsRead.mutate(notification.id);
    }

    // If type = 2, navigate to users page with user id
    if (notification.type === 2) {
      let userId = null;
      
      // Handle data as object or JSON string
      if (notification.data) {
        if (typeof notification.data === 'string') {
          try {
            const parsedData = JSON.parse(notification.data);
            userId = parsedData.item_id;
          } catch (e) {
            console.error('Failed to parse notification data:', e);
          }
        } else if (typeof notification.data === 'object') {
          userId = notification.data.item_id;
        }
      }
      
      if (userId) {
        navigate(`/users?highlightUserId=${userId}`);
      }
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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
          minWidth: 380,
          maxWidth: 450,
          maxHeight: 600,
        },
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {t("navbar.notifications")}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          maxHeight: 500,
          overflowY: "auto",
          minHeight: 200,
        }}
      >
        {notificationsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {t("navbar.noNotifications")}
            </Typography>
          </Box>
        ) : (
          notifications.map((notification) => {
            const isUnread = !notification.read_at;
            return (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  py: 1.5,
                  px: 2,
                  backgroundColor: isUnread
                    ? theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)"
                    : "transparent",
                  borderLeft: isUnread
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.06)",
                  },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="body2"
                    fontWeight={isUnread ? 600 : 400}
                    sx={{
                      color: isUnread
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                      mb: 0.5,
                    }}
                  >
                    {notification.title || t("navbar.notifications")}
                  </Typography>
                  {notification.body && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 0.5,
                        opacity: isUnread ? 0.9 : 0.7,
                      }}
                    >
                      {notification.body}
                    </Typography>
                  )}
                  {notification.created_at && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem", opacity: 0.6 }}
                    >
                      {new Date(notification.created_at).toLocaleString()}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            );
          })
        )}
      </Box>
    </Menu>
  );
};

export default NotificationMenu;

