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
import { Link } from 'react-router-dom';

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
<Modal
  open={isModalOpen}
  onClose={handleModalClose}
  aria-labelledby="confirmation-modal-title"
  aria-describedby="confirmation-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography id="confirmation-modal-title" variant="h6" component="h2" gutterBottom>
    Votre paiement a été effectué avec succès.
    </Typography>
    <Typography id="confirmation-modal-description" variant="body1" component="p" gutterBottom>
      Merci de votre achat !

      Votre commande a bien été enregistrée sous le numéro XXXXXXX. Vous pouvez suivre son état depuis votre espace client.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      <Button onClick={handleModalClose} color="secondary" variant="contained" sx={{ mr: 2 }} component={Link} to="/products">
        Continuer les achats
      </Button>
      <Button onClick={handleModalClose} color="secondary" variant="contained" sx={{ mr: 2 }} component={Link} to="/commandes">
        Voir mes commandes
      </Button>
    </Box>
  </Box>
</Modal>

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
                 <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handlePaymentSubmit} >
            Payer
          </Button>
        </Box>
            </Box>
          </Box>
          
        )}

        {paymentMethod === "paypal" && (
          <Box sx={{ mt: 2 }}>
              <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" component={Link} to="https://www.paypal.com/fr/signin">
            Payer
          </Button>
        </Box>
          </Box>
        )}

     
      </Grid>
    </Grid>
  </Box>
</Box>

 

  );
};

export default PaymentPage;
