import React, { FC } from "react";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type StepperNavigationProps = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
};
const StepperNavigation: FC<StepperNavigationProps> = ({
  activeStep,
  handleNext,
  handleBack,
}: StepperNavigationProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          startIcon={<ChevronLeftIcon />}
        >
          ANTERIOR
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        {activeStep < 2 ? (
          <Button
            onClick={handleNext}
            sx={{ mr: 1 }}
            variant="nextStepBuy"
            endIcon={<ChevronRightIcon />}
          >
            SIGUIENTE
          </Button>
        ) : (
          <Button onClick={handleNext} sx={{ mr: 1 }} variant="finalStepBuy">
            FINALIZAR
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepperNavigation;
