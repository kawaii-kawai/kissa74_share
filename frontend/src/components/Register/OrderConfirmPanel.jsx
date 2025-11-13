import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

function OrderConfirmPanel({
  tableNumber,
  setTableNumber,
  paymentMethod,
  setPaymentMethod,
  cashReceived,
  setCashReceived,
  totalPrice,
  onSubmit,
  onBack,
  isSubmitting,
  receiptOption,
  setReceiptOption,
  orderType,
  setOrderType,
  customerCount,
  setCustomerCount,
}) {
  const [showNumpad, setShowNumpad] = React.useState(false);
  const [numpadTarget, setNumpadTarget] = React.useState("table");
  const [tempValue, setTempValue] = React.useState("");

  const handleOpenNumpad = (target) => {
    setNumpadTarget(target);
    if (target === "table") setTempValue(tableNumber ? String(tableNumber) : "");
    else if (target === "cash") setTempValue(cashReceived ? String(cashReceived) : "");
    else if (target === "customer")
      setTempValue(customerCount !== undefined && customerCount !== null ? String(customerCount) : "");
    setShowNumpad(true);
  };

  const handleCloseNumpad = () => {
    setShowNumpad(false);
    setTempValue("");
  };

  const handleConfirmNumpad = () => {
    if (numpadTarget === "table") {
      // テーブル番号は文字列のまま扱いたい場合もあるためそのまま保存
      setTableNumber(tempValue);
    } else if (numpadTarget === "cash") {
      // お預かり金額は数値文字列でも良いのでそのまま
      setCashReceived(tempValue);
    } else if (numpadTarget === "customer") {
      // 客数は数値として保存する（0 や負の数は避ける）
      const parsed = parseInt(tempValue || "0", 10);
      setCustomerCount(isNaN(parsed) ? 0 : parsed);
    }
    handleCloseNumpad();
  };

  const handleNumberClick = (num) => {
    // 先頭の0対策：空の場合 "0" を押したら "0" とする（必要なら挙動変更可）
    setTempValue((prev) => {
      if (prev === "0") return num; // 既に "0" の時は置換
      return prev + num;
    });
  };

  const handleClear = () => {
    setTempValue("");
  };

  const getButtonVariant = (method) =>
    paymentMethod === method ? "contained" : "outlined";

  const calcChange = () => {
    const cash = parseInt(cashReceived || "0", 10);
    return Math.max(0, cash - totalPrice);
  };

  // 注文確定の無効化判定：イートインならテーブル番号と客数(>0)が必要
  const isCustomerCountValid = () => {
    if (orderType !== "eat-in") return true;
    const count = customerCount;
    // customerCount を数値として評価（0以下は無効）
    return typeof count === "number" ? count > 0 : parseInt(String(count || "0"), 10) > 0;
  };

  const isSubmitDisabled =
    isSubmitting ||
    !paymentMethod ||
    (orderType === "eat-in" && !tableNumber) ||
    (orderType === "eat-in" && !isCustomerCountValid()) ||
    (paymentMethod === "cash" &&
      parseInt(cashReceived || "0", 10) < totalPrice);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* --- 利用方法選択 --- */}
      <Typography variant="h6">ご利用方法</Typography>
      <ToggleButtonGroup
        exclusive
        value={orderType}
        onChange={(e, newType) => newType && setOrderType(newType)}
        sx={{ display: "flex", gap: 2 }}
      >
        <ToggleButton value="eat-in" sx={{ px: 4, py: 1.5 }}>
          イートイン
        </ToggleButton>
        <ToggleButton value="takeout" sx={{ px: 4, py: 1.5 }}>
          テイクアウト
        </ToggleButton>
      </ToggleButtonGroup>

      {/* --- テーブル番号（イートインのみ） --- */}
      {orderType === "eat-in" && (
        <>
          <Typography variant="h6">テーブル番号</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5">{tableNumber || "未入力"}</Typography>
            <Button variant="outlined" onClick={() => handleOpenNumpad("table")}>
              テンキーで入力
            </Button>
          </Box>

          {/* --- 客数入力を追加 --- */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            客の数
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* customerCount を表示するよう修正 */}
            <Typography variant="h5">
              {customerCount && Number(customerCount) > 0 ? `${customerCount}` : "未入力"}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handleOpenNumpad("customer")}
            >
              テンキーで入力
            </Button>
          </Box>
        </>
      )}

      {/* --- レシート印刷選択（イートインのみ） --- */}
      {orderType === "eat-in" && (
        <>
          <Typography variant="h6">レシート印刷</Typography>
          <ToggleButtonGroup
            exclusive
            value={receiptOption ? "true" : "false"}
            onChange={(e, newValue) => {
              if (newValue === "true") setReceiptOption(true);
              else if (newValue === "false") setReceiptOption(false);
            }}
            sx={{ display: "flex", gap: 2 }}
          >
            <ToggleButton value="true" sx={{ px: 4, py: 1.5 }}>
              印刷する
            </ToggleButton>
            <ToggleButton value="false" sx={{ px: 4, py: 1.5 }}>
              印刷しない
            </ToggleButton>
          </ToggleButtonGroup>
        </>
      )}

      {/* --- 支払い方法 --- */}
      <Typography variant="h6">支払い方法</Typography>
      <ToggleButtonGroup
        exclusive
        value={paymentMethod}
        onChange={(e, newMethod) => newMethod && setPaymentMethod(newMethod)}
        sx={{ display: "flex", gap: 2 }}
      >
        <ToggleButton value="cash" sx={{ px: 4, py: 1.5 }}>
          現金
        </ToggleButton>
        <ToggleButton value="electronic" sx={{ px: 4, py: 1.5 }}>
          電子決済
        </ToggleButton>
      </ToggleButtonGroup>

      {/* --- お預かり金額（現金のときのみ） --- */}
      {paymentMethod === "cash" && (
        <>
          <Typography variant="h6">お預かり金額</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5">
              {cashReceived ? `¥${cashReceived}` : "未入力"}
            </Typography>
            <Button variant="outlined" onClick={() => handleOpenNumpad("cash")}>
              テンキーで入力
            </Button>
          </Box>
          <Typography variant="body1">お釣り: ¥{calcChange()}</Typography>
        </>
      )}

      {/* --- 戻る／確定 --- */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={onBack}>
          戻る
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          注文確定
        </Button>
      </Box>

      {/* --- テンキー入力ダイアログ --- */}
      <Dialog open={showNumpad} onClose={handleCloseNumpad}>
        <DialogTitle>入力</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              fontSize: "2rem",
              textAlign: "center",
              mb: 2,
              borderBottom: "1px solid #ccc",
              pb: 1,
            }}
          >
            {tempValue || ""}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 80px)",
              gap: 2,
              justifyContent: "center",
              mb: 2,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <Button
                key={n}
                variant="outlined"
                onClick={() => handleNumberClick(n.toString())}
                sx={{ height: 60, fontSize: "1.5rem" }}
              >
                {n}
              </Button>
            ))}
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{ height: 60, fontSize: "1.5rem" }}
            >
              C
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleNumberClick("0")}
              sx={{ height: 60, fontSize: "1.5rem" }}
              disabled={tempValue === "0"}
            >
              0
            </Button>
            <Box />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNumpad}>キャンセル</Button>
          <Button onClick={handleConfirmNumpad} variant="contained">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OrderConfirmPanel;
