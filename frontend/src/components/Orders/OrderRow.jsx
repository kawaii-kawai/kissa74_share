import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Print,
} from "@mui/icons-material";

const OrderRow = ({ order, onDelete, onPrintReceipt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

        {/* --- 注文番号 --- */}
        <TableCell>{order.orderNumber || "-"}</TableCell>

        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
        <TableCell>¥{order.total}</TableCell>
        <TableCell>{order.tableNumber || "-"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              {/* --- 上部の操作ボタンエリア --- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  注文詳細
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Print />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrintReceipt(order);
                    }}
                  >
                    レシート印刷
                  </Button>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(order._id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>

              {/* --- 注文情報テーブル --- */}
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Order ID
                    </TableCell>
                    <TableCell>{order._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Payment Method
                    </TableCell>
                    <TableCell>{order.payment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Items
                    </TableCell>
                    <TableCell>
                      <List dense>
                        {order.items.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={`${item.product.name} x ${item.quantity}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
