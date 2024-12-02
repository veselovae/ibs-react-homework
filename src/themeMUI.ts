import { createTheme } from "@mui/material";
import React from "react";

export const theme = createTheme({
  typography: {
    h5: {
      fontSize: "1.125rem",
    },
    price: {
      fontSize: "0.875rem",
      color: "#545454",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "5px",
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    price: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    price?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    price: true;
  }
}
