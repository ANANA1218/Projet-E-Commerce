import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import ProductList from './pages/ProductList';
/*import Products from './components/Products';
import Cart from './components/Cart';
import Account from './components/Account';
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
