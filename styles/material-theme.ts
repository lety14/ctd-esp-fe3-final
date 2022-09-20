import { createTheme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    buyCard: true;
    buyCardDisabled: true;
    seeMore: true;
    nextStepBuy: true;
    finalStepBuy: true;
  }
}

export const theme = createTheme({
  //   typography: {
  //     fontFamily: "Roboto, sans-serif",
  //     },

  typography: {
    fontFamily: "Roboto Mono, sans-serif",
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 900,
      //   fontFamily: "Annonymous Pro,sans-serif",
    },

    h5: {
      fontSize: 20,
      fontWeight: 900,
      //   fontFamily: "Annonymous Pro,sans-serif",
    },
  },

  components: {
    /* ---- CARD ---- */
    MuiCard: {
      styleOverrides: {
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          border: "2px solid #000",
          borderRadius: 0,
          //   boxShadow: "5px 5px",
        },
      },
    },
    /* ---- CARD MEDIA ---- */
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: "contain",
          backgroundColor: "#000",
          justifySelf: "flex-start",
          alignSelf: "flex-start",
        },
      },
    },
    /* ---- CARD CONTENT ---- */
    MuiCardContent: {
      styleOverrides: {
        root: {
          //   backgroundColor: "red",
          //   borderBottom: "1px solid #000"
          borderTop: "2px solid #000",
        },
      },
    },
    /* ---- CARD CONTENT ---- */
    MuiCardActions: {
      styleOverrides: {
        root: {
          //   backgroundColor: "red",
          //   height: "auto",
          padding: 15,
          justifyContent: "space-between",
        },
      },
    },

    /* ---- BUTTON ---- */
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },

      variants: [
        {
          props: { variant: "buyCard" },
          style: {
            textTransform: "none",
            border: `2px solid #000`,
            backgroundColor: "#b0d7ff",
            // backgroundColor: "#780000",

            borderRadius: 0,
            fontSize: 15,
            fontWeight: 700,
            boxShadow: "2.5px 2.5px",

            padding: "8px 15px",
          },
        },
        {
          props: { variant: "nextStepBuy" },
          style: {
            textTransform: "capitalize",
            border: `2px solid #000`,
            backgroundColor: "#b0d7ff",
            borderRadius: 0,
            fontWeight: 700,
            padding: "10px 20px",
          },
        },
        {
          props: { variant: "finalStepBuy" },
          style: {
            textTransform: "capitalize",
            border: `2px solid #000`,
            backgroundColor: "#ffa236",
            borderRadius: 0,
            fontWeight: 700,
            padding: "10px 30px",
          },
        },
        {
          props: { variant: "buyCardDisabled" },
          style: {
            textTransform: "none",
            border: `2px solid #bebebe`,
            backgroundColor: "#bebebe",
            borderRadius: 0,
            fontSize: 15,
            fontWeight: 700,
            padding: "8px 15px",
          },
        },
        {
          props: { variant: "seeMore" },
          style: {
            borderBottom: `1px solid #000`,
            borderRadius: 0,
            fontSize: 13,
            padding: "0px",
          },
        },
      ],
    },
  },
});
