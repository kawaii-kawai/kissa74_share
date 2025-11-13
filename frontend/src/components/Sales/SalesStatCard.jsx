import { Card, CardContent, Typography, Box } from "@mui/material";

export const SalesStatCard = ({ title, children }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);
