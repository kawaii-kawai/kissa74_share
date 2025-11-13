import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Receipt,
  Assessment,
  Kitchen,
} from "@mui/icons-material";

import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Sales from "./pages/Sales";
import Hygiene from "./pages/Hygiene";
import HygieneListPage from "./pages/HygieneList";
import ServeStatus from "./pages/ServeStatus";
import OrderCount from "./pages/OrderCount";

function AppContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: 1, text: "レジ", icon: <ShoppingCart />, path: "/" },
    { id: 2, text: "注文履歴", icon: <Receipt />, path: "/orders" },
    { id: 3, text: "売上情報", icon: <Assessment />, path: "/sales" },
    { id: 4, text: "厨房用", icon: <Kitchen />, path: "/hygiene" },
    { id: 5, text: "衛生履歴", icon: <Receipt />, path: "/hygiene-records" },
    { id: 6, text: "注文数", icon: <Receipt />, path: "/order-count" },
  ];

  return (
    <>
      {/* AppBarを表示するページかどうか */}
      {location.pathname !== "/serve-status" && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              喫茶班統合システム
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/hygiene" element={<Hygiene />} />
        <Route path="/hygiene-records" element={<HygieneListPage />} />
        <Route path="/serve-status" element={<ServeStatus />} />
        <Route path="/order-count" element={<OrderCount />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
