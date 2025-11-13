import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { dialogStyle } from "./styles";

const HygieneKeypadDialog = ({ open, onClose, rotation, setRotation }) => {
  const handleNumberClick = (num) => {
    setRotation((prev) => prev + num);
  };

  const handleClear = () => {
    setRotation("");
  };

  return (
    <Dialog open={open} onClose={onClose} sx={dialogStyle}>
      <DialogTitle>ローテーションの入力</DialogTitle>
      <DialogContent>
        <TextField
          value={rotation}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            style: { fontSize: "1.5rem", height: "60px" },
          }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mt: 3,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outlined"
              onClick={() => handleNumberClick(num)}
              sx={{ height: "60px", fontSize: "1.5rem" }}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{ height: "60px", fontSize: "1.5rem" }}
          >
            C
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleNumberClick(0)}
            sx={{ height: "60px", fontSize: "1.5rem" }}
          >
            0
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "20px" }}>
        <Button variant="outlined" onClick={onClose}>
          戻る
        </Button>
        <Button variant="contained" onClick={onClose} disabled={!rotation}>
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HygieneKeypadDialog;
