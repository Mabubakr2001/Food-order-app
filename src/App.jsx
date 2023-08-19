import * as React from "react";
import Cart from "./components/Cart/Cart";
import Meals from "./components/Meals/Meals";
import Overlay from "./components/UI/Overlay/Overlay";
import Header from "./components/layouts/Header/Header";
import CartContextProvider from "./store/CartContextProvider";

const { useState } = React;

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  function cartOpeningHandler() {
    setCartIsShown(true);
  }

  function cartClosingHandler() {
    setCartIsShown(false);
  }

  return (
    <CartContextProvider>
      <Header onOpen={cartOpeningHandler} />
      {cartIsShown && <Cart onClose={cartClosingHandler} />}
      {cartIsShown && <Overlay onClose={cartClosingHandler} />}
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
};

App.propTypes = {};

export default App;
