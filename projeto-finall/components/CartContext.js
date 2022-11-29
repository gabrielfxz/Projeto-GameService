{
  /** vai prover a gestão do carrinho */
}

import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [remove, setRemove] = useState(false);
  const [cart, setCart] = useState({});

  const { id } = useParams();

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

  function removerServico(id) {
    fetch(`http://localhost:5172/api/servico/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutos(produtos.filter((produto) => produto.id !== id));
      })
      .catch((error) => {
        console.log("Erro ao remover: " + error);
      });
  }

  function adicionarServico(servico) {
    fetch("http://localhost:5172/api/servico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servico),
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutos(produtos.filter((produto) => produto.id !== id), data);
      })
      .catch((error) => {
        console.log("Erro ao adicionar: " + error);
      });
  }

  function editarServico(servico) {
    useEffect(() => {
      fetch(`http://localhost:5172/api/servico/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProdutos(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, removerServico, adicionarServico, editarServico }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const Cart = () => {
  const cart = useContext(CartContext);
  return cart;
};
