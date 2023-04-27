import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';


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
  
  {cartItems.length > 0 ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell align="center">Prix</TableCell>
                <TableCell align="center">Quantité</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '30%', mr: 2 }}>
                        <img src={`https://picsum.photos/id/${item.id}/200/200`} alt={item.name} />
                      </Box>
                     
                    </Box>
                  </TableCell>
                  <TableCell align="center">{item.price.toFixed(2)} €</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">{(item.price * item.quantity).toFixed(2)} €</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="remove item" onClick={() => handleRemoveItem(item.id)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">Subtotal</Typography>
            <Typography variant="subtitle1">{getTotalPrice()} €</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">Shipping</Typography>
            <Typography variant="subtitle1">0.00 €</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">{getTotalPrice()}€</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
   
  ) : (
    <Typography variant="subtitle1">Your cart is empty.</Typography>
  )}
   <br/>
</Box>

      )
}
export default Cart;