import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import App from "./App.jsx";

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Noto Sans JP", sans-serif`,
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
