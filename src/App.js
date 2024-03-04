import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';
import Peoduct from './components/pages/Product';
import toast, { Toaster } from "react-hot-toast";
import ProductDetails from './components/pages/ProductDetails';
import CartComponent from '../src/components/cart/CartComponent';
import Wishlistpage from './components/wishlist/Wishlistpage';
import RegisterPage from './components/layout/RegisterPage';
import Header from './components/layout/Header';
function App() {
  return (
    <div className='flex flex-col'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Peoduct />}></Route>
        <Route path='/productdetails' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<CartComponent />}></Route>
        <Route path='/wishlist' element={<Wishlistpage />}></Route>
        <Route path='/register-page' element={<RegisterPage />}></Route>
      </Routes>

      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 5000,
        }}
      />
    </div>
  );
}

export default App;
