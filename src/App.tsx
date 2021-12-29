import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import CharPage from "./pages/CharPage";
import React from "react";
import Shop from "./pages/Shop";

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <NavLink to="/" >Charpage</NavLink>
        <NavLink to="/shop" >Shop</NavLink>
        <Routes>
          <Route path='/' element={<CharPage />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
