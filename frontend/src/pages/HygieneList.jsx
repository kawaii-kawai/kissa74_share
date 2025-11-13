import React, { useState } from "react";
import { Box, Stack, TextField, Button, Autocomplete } from "@mui/material";
import { getFilteredHygiene, deleteHygiene } from "../services/api";
import HygieneList from "../components/HygieneList/HygieneList";
import { HYGIENE } from "../utils/constants";

function HygieneListPage() {
  const [hygieneRecords, setHygieneRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const fetchHygieneRecords = async () => {
    try {
      const records = await getFilteredHygiene(selectedDate, selectedItem);
      setHygieneRecords(records);
    } catch (error) {
      console.error("Failed to fetch hygiene records", error);
    }
  };

  const handleDeleteHygiene = async (id) => {
    try {
      await deleteHygiene(id);
      setHygieneRecords(hygieneRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Failed to delete hygiene record", error);
    }
  };

  const exportToCsv = () => {
    // Create CSV content with UTF-8 BOM to ensure proper encoding
    const bom = "\uFEFF";
    const headers = ["ローテーション", "料理名", "衛生管理の種類", "作成日時"];

    const csvContent = [
      headers.join(","),
      ...hygieneRecords.map((record) => {
        // Convert createdAt to Japan Standard Time
        const japanTime = new Date(record.createdAt).toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        return [record.rotation, record.item, record.type, japanTime]
          .map((value) => `"${String(value || "").replace(/"/g, '""')}"`)
          .join(",");
      }),
    ].join("\n");

    // Create and download CSV file with UTF-8 encoding
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `衛生管理記録_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Disable search button if either date or item is not selected
  const isSearchDisabled = !selectedDate;

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          type="date"
          label="日付"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 200 }}
        />
        <Autocomplete
          options={HYGIENE}
          getOptionLabel={(option) => option.item}
          value={HYGIENE.find((h) => h.item === selectedItem) || null}
          onChange={(event, newValue) =>
            setSelectedItem(newValue ? newValue.item : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="料理名"
              placeholder="料理名を選択..."
              InputLabelProps={{ shrink: true }}
            />
          )}
          sx={{ width: 200 }}
        />
        <Button
          variant="contained"
          onClick={fetchHygieneRecords}
          disabled={isSearchDisabled}
        >
          検索
        </Button>
        {hygieneRecords.length > 0 && (
          <Button variant="outlined" onClick={exportToCsv} sx={{ ml: 2 }}>
            CSV出力
          </Button>
        )}
      </Stack>
      <HygieneList records={hygieneRecords} onDelete={handleDeleteHygiene} />
    </Box>
  );
}

export default HygieneListPage;
