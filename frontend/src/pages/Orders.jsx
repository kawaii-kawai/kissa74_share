import React, { useState } from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { getFilteredOrders, deleteOrder } from "../services/api";
import OrderList from "../components/Orders/OrderList";
import ITEMS from "../utils/constants";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getFilteredOrders(selectedDate);
      const sortedOrders = fetchedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Typography variant="h4">注文履歴</Typography>
        <TextField
          type="date"
          label="日付"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "200px" }}
        />
        <Button variant="contained" onClick={fetchOrders}>
          検索
        </Button>
      </Stack>
      <OrderList orders={orders} onDelete={handleDeleteOrder} />
    </Box>
  );
}

export default Orders;
