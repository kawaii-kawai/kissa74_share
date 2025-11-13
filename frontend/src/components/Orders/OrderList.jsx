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
import OrderRow from "./OrderRow";
import { printReceipt } from "../../services/api";

const OrderList = ({ orders, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>通し番号</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Table No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onDelete={onDelete}
              onPrintReceipt={printReceipt}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
