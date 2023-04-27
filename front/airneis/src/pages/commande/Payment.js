import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Modal
} from "@mui/material";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

const handlePaymentSubmit = () => {
setIsModalOpen(true);
};

const handleModalClose = () => {
setIsModalOpen(false);
};


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<Box sx={{ width: '50%', p: 4, border: '1px solid #ccc', borderRadius: '4px' }}>
<Typography variant="h6" sx={{ mb: 2, justifyContent: 'center', display: 'flex',  alignItems: 'center' }}>
Payment Details
</Typography>

<Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="payment-method-select-label">
            Payment Method
          </InputLabel>
          <Select
            labelId="payment-method-select-label"
            id="payment-method-select"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <MenuItem value="card">Credit or Debit Card</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
          </Select>
        </FormControl>

        {paymentMethod === "card" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Accepted Cards
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://i.imgur.com/A10tVev.png"
                alt="Visa"
                height="25px"
                sx={{ mr: 1 }}
              />
              <img
                src="https://i.imgur.com/g5JHv5B.png"
                alt="Mastercard"
                height="25px"
                sx={{ mr: 1 }}
              />
              <img
                src="https://i.imgur.com/kY1NHVW.png"
                alt="American Express"
                height="25px"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Card Details
              </Typography>
              <TextField
                required
                label="Cardholder Name"
                fullWidth
              />
              <TextField
                required
                label="Card Number"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                required
                label="Expiration Date"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                required
                label="CVV"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Box>
          </Box>
        )}

        {paymentMethod === "paypal" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              You will be redirected to PayPal to complete your payment.
            </Typography>
            <img
              src="https://i.imgur.com/jN9T30T.png"
              alt="PayPal"
              height="50px"
              sx={{ mt: 2 }}
            />
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary">
            Payer
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Box>

 

  );
};

export default PaymentPage;
