import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: "500px",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Cart = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Panier
      </Typography>
      <Grid container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className={classes.item}>
              <img
                className={classes.image}
                src="https://picsum.photos/500/300?random=1"
                alt="Product"
              />
              <Typography variant="h6" gutterBottom>
                Titre du produit
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Prix: 99.99€
              </Typography>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Commander
      </Button>
    </div>
  );
};

export default Cart;
