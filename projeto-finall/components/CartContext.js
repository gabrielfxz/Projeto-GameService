{
  /** vai prover a gestão do carrinho */
}

import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  const addCart = (product) => {
    setCart((valor) => {
      let quantidade = 0;
      if (valor[product.id]) {
        quantidade = valor[product.id].quantidade;
      }
      const novoValor = {
        ...valor,
        [product.id]: {
          quantidade: quantidade + 1,
          product,
        },
      };
      window.localStorage.setItem("cart", JSON.stringify(novoValor));
      return novoValor;
    });
  };
  const removeCart = (product) => {
    setCart((valor) => {
      const novoValor = {};
      Object.keys(valor).forEach((id) => {
        if (id !== product) {
          novoValor[id] = valor[id];
        }
      });
      window.localStorage.setItem("cart", JSON.stringify(novoValor));
      return novoValor;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const Cart = () => {
  const cart = useContext(CartContext);
  return cart;
};
