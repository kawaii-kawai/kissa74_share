import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import HygieneRow from "./HygieneRow";

const HygieneList = ({ records, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>作成日時</TableCell>
            <TableCell>ローテーション</TableCell>
            <TableCell>料理名</TableCell>
            <TableCell>管理種類</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <HygieneRow key={record._id} record={record} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HygieneList;
