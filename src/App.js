import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';
import Peoduct from './components/pages/Product';
import toast, { Toaster } from "react-hot-toast";
import ProductDetails from './components/pages/ProductDetails';
import CartComponent from './CartComponent';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Peoduct />}></Route>
        <Route path='/productdetails' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<CartComponent />}></Route>
      </Routes>

      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
        }}
      />
    </div>
  );
}

export default App;
