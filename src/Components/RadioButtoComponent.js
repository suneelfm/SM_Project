import { FormControlLabel, Radio, Typography } from "@mui/material";
import React from "react";

export default function RadioButtoComponent(Label) {
  return (
    <>
      <FormControlLabel
        value={Label}
        control={
          <Radio
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "1.5vw",
              },
              "&.Mui-checked": {
                color: "rgb(37, 37, 138)",
              },
              padding: "0",
              margin: "0 0.5vw 0 1vw",
            }}
          />
        }
        label={
          <Typography style={{ fontSize: "1vw", fontFamily: "inherit" }}>
            {Label}
          </Typography>
        }
      />
    </>
  );
}
