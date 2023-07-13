import Template from "./components/layouts/Template";
import LoginForm from "./pages/Logins";
import RegisterForm from "./pages/Register";
import Commande from "./pages/commande/Commande";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ListCommande from "./pages/commande/ListCommande";
import Index from "./pages/backoffice/Index";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Template><Home /></Template>} />
            <Route path="/products" element={<Template><ProductList /></Template>} />
            <Route path="/products/:id" element={<Template><ProductDetail /></Template>} />
            <Route path="/panier" element={<Template><Commande /></Template>} />
            <Route path="/commandes" element={<Template><ListCommande /></Template>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/inscription" element={<RegisterForm />} />
            <Route path="/backoffice" element={<Index />} />
        </Routes>
    );
}

export default App;
