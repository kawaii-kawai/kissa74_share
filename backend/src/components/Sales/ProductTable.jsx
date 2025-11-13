import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export const ProductTable = ({ salesByProduct }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>商品</TableCell>
        <TableCell align="right">販売数</TableCell>
        <TableCell align="right">売上金額 (¥)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.entries(salesByProduct)
        .sort(([, a], [, b]) => b.total - a.total)
        .map(([name, { total, count }]) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{count.toLocaleString()}</TableCell>
            <TableCell align="right">{total.toLocaleString()}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);