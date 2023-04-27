import Template from "./components/layouts/Template";
import LoginForm from "./pages/Logins";
import RegisterForm from "./pages/Register";
import Commande from "./pages/commande/Commande";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import DeliveryAddress from "./pages/commande/DeliveryAddress";
import Payment from "./pages/commande/Payment";
import ListCommande from "./pages/commande/ListCommande";

function App() {
    return (
        <Template>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<ProductList />} />
                <Route exact path="/products/:slug" element={<ProductDetail />} />
                <Route exact path="/panier" element={<Commande />} />
                <Route exact path="/commandes" element={<ListCommande />} />
                <Route exact path="/livraisons" element={<DeliveryAddress />} />
                <Route exact path="/paiements" element={<Payment />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/inscription" element={<RegisterForm />} />
            </Routes>
        </Template>
    );
}

export default App;
