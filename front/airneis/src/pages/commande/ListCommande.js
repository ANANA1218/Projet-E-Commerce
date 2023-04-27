import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const orders = [
  {
    id: 1,
    date: "2022-04-26",
    customerName: "Jane Smith",
    items: [
      { name: "Product 1", quantity: 2, price: 10 },
      { name: "Product 2", quantity: 1, price: 20 },
      { name: "Product 3", quantity: 3, price: 15 }
    ]
  },
  {
    id: 2,
    date: "2022-07-25",
    customerName: "Jane Smith",
    items: [
      { name: "Product 4", quantity: 1, price: 25 },
      { name: "Product 5", quantity: 2, price: 12 }
    ]
  },
  {
    id: 3,
    date: "2022-08-24",
    customerName: "Jane Smith",
    items: [
      { name: "Product 6", quantity: 3, price: 18 },
      { name: "Product 7", quantity: 1, price: 30 },
      { name: "Product 8", quantity: 2, price: 22 }
    ]
  }
];

const OrdersPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{order.date}</TableCell>
                <TableCell align="right">{order.customerName}</TableCell>
                <TableCell align="right">
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {order.items.map((item) => (
                      <li key={item.name}>
                        {item.quantity} x {item.name}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  {order.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0 
                  )} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
