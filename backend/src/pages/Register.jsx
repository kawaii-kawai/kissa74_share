//
import React from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import MenuSection from "../components/Register/MenuSection";
import CartSection from "../components/Register/CartSection";
import OrderConfirmPanel from "../components/Register/OrderConfirmPanel";
import { useCart } from "../context/CartContext";
import {
  createOrder,
  printReceipt,
  printReceiptWaiter,
  sendDiscordMessage,
  getDailyItemCounts,
} from "../services/api";
import { useEffect } from "react";

function Register() {
  const { cart, clearCart, totalPrice } = useCart();

  const [step, setStep] = React.useState("cart"); // 'cart' → 'confirm'

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info", // "success", "error", "warning", "info"
  });

  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [tableNumber, setTableNumber] = React.useState("");
  const [cashReceived, setCashReceived] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [receiptOption, setReceiptOption] = React.useState(true);
  const [orderType, setOrderType] = React.useState("eat-in");
  const [customerCount, setCustomerCount] = React.useState("");
  const [salesCount, setSalesCount] = React.useState({});
  const today = "2025-11-03";

  useEffect(() => {
    const fetchSalesCount = async () => {
      try {
        const data = await getDailyItemCounts(today);
        const counts = {};
        data.forEach((item) => {
          counts[item.productId] = item.totalQuantity;
        });
        setSalesCount(counts);
      } catch (error) {
        console.error("販売数取得エラー:", error);
      }
    };
    fetchSalesCount();
    const intervalId = setInterval(fetchSalesCount, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const changeSalesCount = () => {
    const fetchSalesCount = async () => {
      try {
        const data = await getDailyItemCounts(today);
        const counts = {};
        data.forEach((item) => {
          counts[item.productId] = item.totalQuantity;
        });
        setSalesCount(counts);
      } catch (error) {
        console.error("販売数取得エラー:", error);
      }
    };
    fetchSalesCount();
    console.log(salesCount);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCartSubmit = () => {
    if (Object.keys(cart).length === 0) {
      setSnackbar({
        open: true,
        message: "カートが空です",
        severity: "warning",
      });
      return;
    }
    setStep("confirm");
  };

  const handleFinalSubmit = async () => {
    if (paymentMethod === "cash") {
      const cash = parseInt(cashReceived, 10);
      if (isNaN(cash) || cash < totalPrice) {
        setSnackbar({
          open: true,
          message: "お預かり金額が不足しています",
          severity: "error",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const orderItems = Object.values(cart).map((item) => ({
        product: item.id,
        quantity: item.quantity,
      }));

      const order = {
        items: orderItems,
        total: totalPrice,
        payment: paymentMethod,
        tableNumber: tableNumber,
        orderType: orderType,
        customerCount: customerCount,
      };

      console.log("注文中", order);

      const response = await createOrder(order);
      console.log("注文成功", response);
      // response に parseInt(cashReceived, 10) を追加
      if (paymentMethod === "cash") {
        response.receivedPayment = parseInt(cashReceived, 10);
      } else {
        response.receivedPayment = 0;
      }

      await printReceiptWaiter(response);
      if (receiptOption) await printReceipt(response);
      await sendDiscordMessage(response);
      changeSalesCount();
      clearCart();
      setSnackbar({
        open: true,
        message: "注文が完了しました",
        severity: "success",
      });
      resetState();
      setStep("cart");
    } catch (error) {
      console.error("注文失敗", error);
      setSnackbar({
        open: true,
        message: "注文に失敗しました",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setPaymentMethod("");
    setTableNumber("");
    setCashReceived("");
    setReceiptOption(true);
    setCustomerCount("");
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", p: 2, gap: 2 }}>
      {/* 左側：メニュー */}
      <MenuSection salesCount={salesCount} />

      {/* 右側：カートまたは注文確認パネル */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          p: 2,
          minWidth: 350,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {step === "cart" ? (
          <CartSection onSubmitOrder={handleCartSubmit} />
        ) : (
          <OrderConfirmPanel
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cashReceived={cashReceived}
            setCashReceived={setCashReceived}
            totalPrice={totalPrice}
            onSubmit={handleFinalSubmit}
            onBack={() => setStep("cart")}
            isSubmitting={isSubmitting}
            receiptOption={receiptOption}
            setReceiptOption={setReceiptOption}
            orderType={orderType}
            setOrderType={setOrderType}
            customerCount={customerCount}
            setCustomerCount={setCustomerCount}
          />
        )}
      </Box>

      {/* 通知スナックバー（MUI Alert 付き） */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default Register;
