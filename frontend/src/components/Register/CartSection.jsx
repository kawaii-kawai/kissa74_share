import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";

function CartSection({ onSubmitOrder }) {
  const { cart, addToCart, removeFromCart, totalPrice } = useCart();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmitOrder = () => {
    if (Object.keys(cart).length === 0) {
      setSnackbar({
        open: true,
        message: "カートが空です",
        severity: "warning",
      });
      return;
    }
    onSubmitOrder();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Typography variant="h5">カート</Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {Object.values(cart).map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`¥${item.price} x ${item.quantity}`}
              />
              <IconButton onClick={() => removeFromCart(item)}>
                <Remove />
              </IconButton>
              <IconButton onClick={() => addToCart(item)}>
                <Add />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* 合計と注文ボタンを最下部に固定 */}
      <Box sx={{ mt: "auto", pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          合計: ¥{totalPrice}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmitOrder}
          sx={{ height: 56 }}
        >
          注文確定
        </Button>
      </Box>

      {/* スナックバー通知 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CartSection;
