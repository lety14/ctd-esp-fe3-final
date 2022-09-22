import { Box, Stack } from "@mui/system";
import React from "react";

export const Loader = () => {
  return (
    <Stack height={"100%"} alignItems="center" justifyContent="center">
      <Box
        component="img"
        sx={{ maxWidth: 450 }}
        alt="loading"
        src={"/loading.gif"}
      />
    </Stack>
  );
};
