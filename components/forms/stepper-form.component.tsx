import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Stack,
} from "@mui/material";
import DeliveryForm from "./delivery-form/delivery-form.component";
import PaymentForm from "./payment-form/payment-form.component";
import { IAddress, ICard, ICheckout, ICustomer } from "types/ICheckout.type";
import CustomerDataForm from "./customer-form/customer-data-form.component";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

export default function StepperForm() {
  const defaultValue = {
    customer: {
      name: "",
      lastname: "",
      email: "",
      address: {
        address1: "",
        address2: null,
        city: "",
        state: "",
        zipCode: "",
      },
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
    order: {
      name: "",
      image: "",
      price: 0,
    },
  };
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useState<ICheckout>(defaultValue);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmitCustomerForm = (data: ICustomer) => {
    setCheckoutData({
      ...checkoutData,
      customer: { ...data },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitAddressForm = (data: IAddress) => {
    setCheckoutData({
      ...checkoutData,
      customer: {
        ...checkoutData.customer,
        address: { ...data },
      },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitPaymentForm = (data: ICard) => {
    setCheckoutData({
      ...checkoutData,
      card: {
        ...data,
      },
    });
  };

  useEffect(() => {
    console.log(checkoutData);
  }, [checkoutData]);

  const handleBack = () => {
    activeStep > 0 && setActiveStep(activeStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ padding: "50px 20px", width: "900px" }}>
        <Typography variant="h5">Paso {activeStep + 1}</Typography>
        {activeStep === 0 && (
          <CustomerDataForm
            data={checkoutData.customer}
            activeStep={activeStep}
            handleNext={handleSubmitCustomerForm}
          />
        )}
        {activeStep === 1 && (
          <DeliveryForm
            data={checkoutData.customer.address}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitAddressForm}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitPaymentForm}
          />
        )}
      </Box>
    </Box>
  );
}
