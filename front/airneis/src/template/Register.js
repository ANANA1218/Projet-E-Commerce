import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function  RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleRegister = (event) => {
      event.preventDefault();
      // Logique d'inscription ici
    };
  
    return (
      <form onSubmit={handleRegister}>
        <TextField
          label="Nom d'utilisateur"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
          fullWidth
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
        <TextField
          label="Confirmer le mot de passe"
          variant="outlined"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          margin="normal"
          type="password"
          fullWidth
        />
        <Button variant="contained" type="submit" color="primary">
          S'inscrire
        </Button>
      </form>
    );
  };
  