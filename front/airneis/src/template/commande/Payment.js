import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePaymentDataChange = (prop) => (event) => {
    setPaymentData({ ...paymentData, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process payment here using paymentData object
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel htmlFor="card-number">Card number</InputLabel>
        <Input
          id="card-number"
          value={paymentData.cardNumber}
          onChange={handlePaymentDataChange("cardNumber")}
          startAdornment={<InputAdornment position="start">#</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="card-name">Card name</InputLabel>
        <Input
          id="card-name"
          value={paymentData.cardName}
          onChange={handlePaymentDataChange("cardName")}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="expiry-date">Expiry date</InputLabel>
        <Input
          id="expiry-date"
          value={paymentData.expiryDate}
          onChange={handlePaymentDataChange("expiryDate")}
          endAdornment={<InputAdornment position="end">MM/YY</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel htmlFor="cvv">CVV</InputLabel>
        <Input
          id="cvv"
          value={paymentData.cvv}
          onChange={handlePaymentDataChange("cvv")}
        />
      </FormControl>

      <Button variant="contained" type="submit">
        Pay
      </Button>
    </form>
  );
};

export default Payment;
