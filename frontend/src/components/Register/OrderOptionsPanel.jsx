import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function OrderOptionsPanel({
  paymentMethod,
  setPaymentMethod,
  tableNumber,
  setTableNumber,
  receiptOption,
  setReceiptOption,
  onSubmit,
  onBack,
  isSubmitting,
}) {
  const handleNumberClick = (num) => {
    setTableNumber((prev) => prev + num);
  };

  const handleClear = () => {
    setTableNumber("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">注文オプション</Typography>

      {/* 支払い方法 */}
      <Box>
        <Typography sx={{ mb: 1 }}>支払い方法</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant={paymentMethod === "cash" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("cash")}
            fullWidth
          >
            現金
          </Button>
          <Button
            variant={paymentMethod === "card" ? "contained" : "outlined"}
            onClick={() => setPaymentMethod("card")}
            fullWidth
          >
            電子決済
          </Button>
        </Box>
      </Box>
      {/* レシート選択 */}
      <Box>
        <Typography sx={{ mb: 1 }}>レシート</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant={receiptOption === "print" ? "contained" : "outlined"}
            onClick={() => setReceiptOption("print")}
            fullWidth
          >
            印刷する
          </Button>
          <Button
            variant={receiptOption === "none" ? "contained" : "outlined"}
            onClick={() => setReceiptOption("none")}
            fullWidth
          >
            印刷しない
          </Button>
        </Box>
      </Box>

      {/* テーブル番号（テンキー） */}
      <Box>
        <Typography sx={{ mb: 1 }}>テーブル番号</Typography>
        <TextField
          value={tableNumber}
          fullWidth
          InputProps={{
            readOnly: true,
            style: { fontSize: "1.5rem", height: "60px" },
          }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            mt: 1,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outlined"
              onClick={() => handleNumberClick(num.toString())}
              sx={{ height: "50px", fontSize: "1.2rem" }}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{ height: "50px", fontSize: "1.2rem" }}
          >
            C
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleNumberClick("0")}
            sx={{ height: "50px", fontSize: "1.2rem" }}
          >
            0
          </Button>
        </Box>
      </Box>

      {/* ボタン群 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={onBack}>
          戻る
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={
            isSubmitting || !paymentMethod || !receiptOption || !tableNumber
          }
        >
          最終確定
        </Button>
      </Box>
    </Box>
  );
}
