import { TextField, Button, Box, Typography } from "@mui/material";

export const SalesHeader = ({ selectedDate, onDateChange, onSearch }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      売上情報
    </Typography>
    <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        type="date"
        label="日付"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ width: 200 }}
      />
      <Button variant="contained" onClick={onSearch} disabled={!selectedDate}>
        検索
      </Button>
    </Box>
  </Box>
);
