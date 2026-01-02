import { Suspense, useState } from "react"
import { NavBar, Sidebar } from "./components"
import { Outlet } from "react-router"
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const handleOpenSidebar = () => setMobileOpen(true);
  const handleCloseSidebar = () => setMobileOpen(false);
  const handleToggleCollapse = () => setCollapsed((s) => !s);

  const drawerWidth = collapsed ? 72 : 260;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh"}}>
      <Sidebar open={mobileOpen} onClose={handleCloseSidebar} collapsed={collapsed} onToggleCollapse={handleToggleCollapse} />

      <Box 
        sx={{ 
          flex: 1, 
          overflowX: "hidden", 
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: { 
            md: `calc(100% - ${drawerWidth}px)` 
          },
        }}
      >
        <NavBar onOpenSidebar={handleOpenSidebar} title={t("sidebar.title")} />

        <Box component="main" sx={{ p: { xs: 2, md: 3 }, transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default App