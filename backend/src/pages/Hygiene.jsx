import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { ITEMS_STATUS } from "../utils/constants";
import { getByIdItemStatus, updateItemStatus } from "../services/api";

const STATUS_OPTIONS = ["提供中", "調理中", "提供中止"];

const Hygiene = () => {
  const [itemStatuses, setItemStatuses] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 初期読み込み：各料理の状態を取得
  useEffect(() => {
    const fetchItemStatuses = async () => {
      try {
        const statusMap = {};
        for (const item of ITEMS_STATUS) {
          const status = await getByIdItemStatus(item.id);
          statusMap[item.id] = status.status;
        }
        setItemStatuses(statusMap);
      } catch (error) {
        console.error("Failed to fetch item statuses", error);
        setSnackbar({
          open: true,
          message: "状態の取得に失敗しました",
          severity: "error",
        });
      }
    };
    fetchItemStatuses();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedStatus = await updateItemStatus(id, newStatus);
      setItemStatuses((prev) => ({ ...prev, [id]: updatedStatus.status }));
      setSnackbar({
        open: true,
        message: "状態を更新しました",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "状態の更新に失敗しました",
        severity: "error",
      });
    }
  };

  return (
    <Container sx={{ mt: 2, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        料理の状態管理
      </Typography>

      {/* 全料理の状態を表示 */}
      {ITEMS_STATUS.map((item) => (
        <Box key={item.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {item.name || item.item}（現在: {itemStatuses[item.id] || "不明"}）
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {STATUS_OPTIONS.map((status) => (
              <Button
                key={status}
                variant={
                  itemStatuses[item.id] === status ? "contained" : "outlined"
                }
                onClick={() => handleStatusChange(item.id, status)}
                sx={{ flex: "1 1 30%" }}
              >
                {status}
              </Button>
            ))}
          </Box>
        </Box>
      ))}

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
    </Container>
  );
};

export default Hygiene;
