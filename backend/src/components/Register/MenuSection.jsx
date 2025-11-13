import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { ITEMS, DAILY_STOCK_LIMITS } from "../../utils/constants";

function MenuSection({ salesCount }) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h5">メニュー</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {ITEMS.map((item) => {
            const sold = salesCount[item.id] || 0;
            const remaining = (DAILY_STOCK_LIMITS[item.id] || 0) - sold;
            const soldOut = remaining <= 0;

            return (
              <Button
                key={item.id}
                variant="contained"
                onClick={() => addToCart(item)}
                disabled={soldOut}
                sx={{
                  flex: "1 1 calc(24% - 8px)",
                  height: 120,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "8px",
                  backgroundColor: soldOut ? "#ccc" : item.color,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.name.replace("(pre)", "")}
                </Typography>

                {/* 残数表示 */}
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderRadius: "8px",
                    px: 1,
                    fontSize: 14,
                  }}
                >
                  残り {remaining}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    fontSize: 14,
                    opacity: 0.8,
                  }}
                >
                  ¥{item.price}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default MenuSection;
