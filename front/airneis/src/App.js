import Template from "./components/layouts/Template";
import LoginForm from "./pages/Logins";
import RegisterForm from "./pages/Register";
import Commande from "./pages/commande/Commande";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";


function App() {
    return (
        <Template>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<ProductList />} />
                <Route exact path="/products/:slug" element={<ProductDetail />} />
                <Route exact path="/commandes" element={<Commande />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/inscription" element={<RegisterForm />} />
            </Routes>
        </Template>
    );
}

export default App;
