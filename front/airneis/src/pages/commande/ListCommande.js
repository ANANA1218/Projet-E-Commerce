import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

const OrderHistoryPage = () => {
  // Exemple de fausses données de commandes
  const orders = [
    {
      id: 1,
      date: "2023-04-28",
      items: [
        {
          id: 1,
          name: "Produit 1",
          image: "https://example.com/product1.jpg",
          quantity: 2,
          price: 10,
        },
        {
          id: 2,
          name: "Produit 2",
          image: "https://example.com/product2.jpg",
          quantity: 1,
          price: 20,
        },
      ],
      totalPrice: 40,
    },
    {
      id: 2,
      date: "2023-04-27",
      items: [
        {
          id: 3,
          name: "Produit 3",
          image: "https://example.com/product3.jpg",
          quantity: 3,
          price: 15,
        },
      ],
      totalPrice: 45,
    },
  ];

  return (
    <Container maxWidth="sm">
   
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Historique des commandes
        </Typography>
      </Box>
      <Box mt={2}>
        {orders.length === 0 ? (
          <Typography variant="body1" align="center">
            Aucune commande trouvée.
          </Typography>
        ) : (
          <List>
            {orders.map((order) => (
              <Paper key={order.id} elevation={2} sx={{ mb: 2 }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Order" src="https://example.com/order.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Commande #${order.id}`}
                    secondary={`Date: ${order.date}`}
                  />
                </ListItem>
                <Divider />
                <Box p={2}>
                  <List disablePadding>
                    {order.items.map((item) => (
                      <ListItem key={item.id} disableGutters>
                        <ListItemAvatar>
                          <Avatar alt={item.name} src={item.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantité: ${item.quantity}`}
                        />
                        <Typography variant="body1">{`Prix: $${item.price}`}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                      Total: ${order.totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default OrderHistoryPage;
