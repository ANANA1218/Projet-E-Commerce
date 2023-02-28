import Template from "./template/Template";
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
      </Routes>
    </Template>
  );
}

export default App;
