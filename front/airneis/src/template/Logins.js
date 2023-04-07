import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function  LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Logique de connexion ici
  };

  return (
    <form onSubmit={handleLogin} >
      <TextField
        label="Nom d'utilisateur"
        variant="outlined"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        margin="normal"
        fullWidth
        sx={{ marginTop: '100px' }}
      />
      <TextField
        label="Mot de passe"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
        type="password"
        fullWidth
      />
      <Button variant="contained" type="submit" color="primary" sx={{marginBottom: '60px' }}>
        Connexion
      </Button>
    </form>
  );
};



