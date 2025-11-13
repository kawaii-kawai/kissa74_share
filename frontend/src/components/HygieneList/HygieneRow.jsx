import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

const HygieneRow = ({ record, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(record._id);
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          cursor: "pointer",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell padding="checkbox">
          <IconButton size="small">
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{new Date(record.createdAt).toLocaleString()}</TableCell>
        <TableCell>{record.rotation}</TableCell>
        <TableCell>{record.item}</TableCell>
        <TableCell>{record.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="body1">
                <strong>記録ID:</strong> {record._id}
              </Typography>
              <Typography variant="body1">
                <strong>作成日時:</strong>{" "}
                {new Date(record.createdAt).toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <IconButton color="error" onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default HygieneRow;
