//
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { ITEMS_STATUS } from "../utils/constants";
import { getByIdItemStatus } from "../services/api";
import ItemStatusCard from "../components/ServeStatus/ItemStatusCard";

export default function ServeStatus() {
  const [itemStatuses, setItemStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemStatuses = async () => {
      try {
        const statusPromises = ITEMS_STATUS.map((item) =>
          getByIdItemStatus(item.id)
        );
        const results = await Promise.all(statusPromises);

        const statusMap = results.reduce((acc, status, index) => {
          acc[ITEMS_STATUS[index].id] = status;
          return acc;
        }, {});

        setItemStatuses(statusMap);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item statuses:", error);
        setIsLoading(false);
      }
    };

    fetchItemStatuses();
    const intervalId = setInterval(fetchItemStatuses, 1000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 3 }}>
        {isLoading ? (
          <Typography variant="h6" align="center">
            読み込み中...
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {ITEMS_STATUS.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ItemStatusCard
                  itemName={item.name}
                  status={itemStatuses[item.id]?.status || "不明"}
                  color={item.color}
                  type={item.type}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
