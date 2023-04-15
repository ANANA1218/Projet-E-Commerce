import { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import Cart from './Cart';



const DeliveryAddress = ({ onNext }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');

  const handleNext = () => {
    onNext({
      firstName,
      lastName,
      streetAddress,
      addressLine2,
      city,
      postalCode,
      region,
      country
    });
  };

  return (
    <Box sx={{ width: '100%', marginTop: '60px' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Delivery Address
      </Typography>

      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* Ajouter l'adresse de livraison ici */}
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Street Address"
            fullWidth
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address Line 2"
            fullWidth
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="City"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Postal Code"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Region"
            fullWidth
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Belgium">Belgium</MenuItem>
              <MenuItem value="Switzerland">Switzerland</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Afficher les produits du panier ici */}

        test 1

      </Grid>
    </Grid>
    </Grid>
        </Box>
  )
}
export default DeliveryAddress;
