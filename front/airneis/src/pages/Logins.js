import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const result = await axios.post('http://127.0.0.1:8000/api/utilisateur/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.status === 200) {
        const token = result.data.token;
        console.log('token', token);

        // Stocker le token dans le local storage
        localStorage.setItem('token', token);

        // Rediriger vers la page des paramètres (ou une autre page de votre choix)
        navigate('/profile');
      } else {
        // Handle other status codes, if needed
        setErrorMessage("Erreur : Mot de passe ou identifiant incorrect");
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      setErrorMessage("Erreur : Impossible de se connecter");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Brand</h2>

                  <div className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Mot de passe</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Button variant="outline-primary" type="submit">
                      Login
                    </Button>
                    {errorMessage && <p>{errorMessage}</p>}
                  </div>

                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Vous n'avez pas de compte ?{" "}
                      <a href={`#/inscription`} className="text-primary fw-bold">
                        Inscription
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Login;
