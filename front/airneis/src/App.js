import Template from "./template/Template";
import LoginForm from "./template/Logins";
import RegisterForm from "./template/Register";
import Commande from "./template/commande/Commande";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";


function App() {
  return (
    <Template>
      <Routes>
        <Route exact path="/" element={<Landing />} />
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
