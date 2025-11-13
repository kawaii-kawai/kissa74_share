//
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  SoupKitchen as CookingIcon,
  CheckCircle as AvailableIcon,
  Block as UnavailableIcon,
} from "@mui/icons-material";

// Status color and icon mapping
const STATUS_CONFIGS = {
  調理中: {
    color: "warning.main",
    icon: <CookingIcon sx={{ fontSize: 80 }} />,
    text: "お時間を頂きます",
  },
  提供中: {
    color: "success.main",
    icon: <AvailableIcon sx={{ fontSize: 80 }} />,
    text: "提供中",
  },
  提供中止: {
    color: "error.main",
    icon: <UnavailableIcon sx={{ fontSize: 80 }} />,
    text: "提供終了",
  },
  不明: {
    color: "grey.500",
    icon: <UnavailableIcon sx={{ fontSize: 80 }} />,
    text: "不明",
  },
};

const ItemStatusCard = ({ itemName, status, color, type }) => {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS["不明"];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: color + "15", // 少し透明に（例: #ff6b6b20）
        border: `3px solid ${color}50`,
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {itemName}
        </Typography>

        <Box
          sx={{
            color: config.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {config.icon}
        </Box>

        <Typography
          variant="h4"
          sx={{
            color: config.color,
            fontWeight: "bold",
          }}
        >
          {config.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemStatusCard;
