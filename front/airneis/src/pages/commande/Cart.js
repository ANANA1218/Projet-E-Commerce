import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 19.99,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Handle checkout logic
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '60px' }}>
  <Typography variant="h4" sx={{ mb: 2 }}>
    Your Cart
  </Typography>
  {cartItems.length > 0 ? (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {cartItems.map(item => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: '30%' }}>
                <img src={`https://picsum.photos/id/${item.id}/200/200`} alt={item.name} />
              </Box>
              <Box sx={{ flex: '1' }}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
                  ${item.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    sx={{ mr: 2 }}
                  />
                  <Button onClick={() => handleRemoveItem(item.id)} variant="outlined">
                    Remove
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1">${getTotalPrice()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1">Shipping</Typography>
              <Typography variant="subtitle1">$0.00</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1">$100.00</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
    <Typography variant="subtitle1">Your cart is empty.</Typography>
  )}
</Box>

      )
}
export default Cart;