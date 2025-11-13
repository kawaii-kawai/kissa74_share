// src/pages/OrderCount.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { getDailyItemCounts } from "../services/api";

export default function OrderCount() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const today = "2025-11-02";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getDailyItemCounts(today);
        setItems(data);

        // 🔽 選択中のIDがまだ存在するなら維持する
        const current = data.find((i) => i.productId === selectedItemId);
        if (current) {
          setSelectedItem(current);
        } else if (data.length > 0) {
          // 初回や削除時のみデフォルトを設定
          setSelectedItemId(data[0].productId);
          setSelectedItem(data[0]);
        }
      } catch (error) {
        console.error("販売数取得エラー:", error);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 10000);
    return () => clearInterval(interval);
  }, [selectedItemId]); // ← selectedItemId を依存に追加

  const handleChange = (event) => {
    const id = event.target.value;
    setSelectedItemId(id);
    const item = items.find((i) => i.productId === id);
    setSelectedItem(item);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#fff"
    >
      <Select
        value={selectedItemId}
        onChange={handleChange}
        sx={{
          fontSize: "1.2rem",
          mb: 4,
          minWidth: 250,
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.productId} value={item.productId}>
            {item.name}
          </MenuItem>
        ))}
      </Select>

      {selectedItem && (
        <Typography
          variant="h2"
          sx={{
            fontSize: "8rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          {selectedItem.totalQuantity}
        </Typography>
      )}
    </Box>
  );
}
