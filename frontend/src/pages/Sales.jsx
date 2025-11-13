import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { SalesHeader } from "../components/Sales/SalesHeader";
import { SalesStatCard } from "../components/Sales/SalesStatCard";
import { TimeSeriesChart } from "../components/Sales/TimeSeriesChart";
import { ProductTable } from "../components/Sales/ProductTable";
import { useSalesData } from "../components/Sales/hooks/useSalesData";
import { calculateSalesMetrics } from "../components/Sales/utils/salesCalculations";
import { getChartConfig } from "../components/Sales/utils/chartConfig";
import { saveAs } from "file-saver";
import { ITEMS } from "../utils/constants"

export default function SalesPage() {
  const {
    filteredOrders,
    selectedDate,
    hasSearched,
    setSelectedDate,
    filterOrders,
  } = useSalesData();

  const { totalSales, salesByPayment, salesByProduct, salesByHour } =
    calculateSalesMetrics(filteredOrders);

  const { timeData, chartOptions } = getChartConfig(salesByHour);

  const exportToCSV = () => {
    if (!filteredOrders.length) {
      console.log(filteredOrders);
      return;
    }
    console.log("exportToCSV called");
/*
    const csvContent = [
      "Order ID,Total,Payment Method,Date",
      ...filteredOrders.map((order) => {
        const formattedDate = new Date(order.createdAt).toLocaleString(
          "ja-JP",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        );

        return [
          order._id,
          order.total,
          order.payment === "電子決済" ? "electronic" : "cash",
          formattedDate,
        ].join(",");
      }),
    ].join("\n");
*/
    // string header 
    // "Order ID, Total, Payment Method, Date, Table Number, {constants.jsx のITEMS.name...}
    // string header = "Order ID, Total, Payment Method, Date, Table Number"
    // header += ", " + ITEMS.map(item => item.name).join(", ")

    const csvRows = [
      ["Order ID", "Total", "Payment Method", "Date", "Table Number", ...ITEMS.map(item => item.name_en)],
      ...filteredOrders.map((order) => {
        const formattedDate = new Date(order.createdAt).toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        
        const itemQuantities = ITEMS.map((item) => {
          const orderItem = order.items.find(
            (orderItem) => orderItem.product._id === item.id
          );
          return orderItem ? orderItem.quantity : 0;
        });
        
        return [
          order._id,
          order.total,
          order.payment === "電子決済" ? "electronic" : "cash",
          formattedDate,
          order.tableNumber,
          ...itemQuantities,
        ];
      }),
    ];

    console.log("csvRows completed", csvRows);

    const csvContent = csvRows.map(row => row.join(",")).join("\n");

    console.log("csvContent completed", csvContent);


    const blob = new Blob([new TextEncoder().encode(csvContent)], {
      type: "text/csv;charset=utf-8;",
    });

    console.log("blob completed", blob);

    saveAs(blob, `sales_${selectedDate}.csv`);

    console.log("saveAs completed");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SalesHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onSearch={filterOrders}
      />

      {!hasSearched ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            日付を選択して検索してください
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SalesStatCard title="総売上">
              <Typography variant="h4" color="primary">
                ¥{totalSales.toLocaleString()}
              </Typography>
            </SalesStatCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <SalesStatCard title="支払い方法別売上">
              <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
                {Object.entries(salesByPayment).map(([method, amount]) => (
                  <Box component="li" key={method} sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      {method}: <strong>¥{amount.toLocaleString()}</strong>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </SalesStatCard>
          </Grid>

          <Grid item xs={12}>
            <SalesStatCard title="時間別売上推移">
              <TimeSeriesChart data={timeData} options={chartOptions} />
            </SalesStatCard>
          </Grid>

          <Grid item xs={12}>
            <SalesStatCard title="商品別売上">
              <ProductTable salesByProduct={salesByProduct} />
            </SalesStatCard>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={exportToCSV}>
              CSVをダウンロード
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
