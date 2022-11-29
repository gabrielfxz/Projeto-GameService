import React, { useState,useEffect } from "react";
import UserService from "../services/UserService";
import { Cart } from "../components/CartContext";

export default function Carrinho({ produto }) {

  const [mens, setMens] = useState([]);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log("useEffect getProfessorBoard: " + response.data);
        //setLista(response.data);
        setMens(null);
      },
      (error) => {
        const _mens =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMens(_mens);
        console.log("_mens: " + _mens);
      }
    );
  }, []);

  const cart = Cart();
  const remove = (id) => {
    cart.removeCart(id);
  };

  const renderCart = () => {
    return(
    <>
      <div className="flex flex-col w-full p-6 space-y-4 sm:p-10 text-black">
        <h2 className="text-xl font-semibold">Carrinho</h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {Object.keys(cart.cart).map((key) => {
            const { product, quantidade, img } = cart.cart[key];
            return (
              <li
                key={key}
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    src={product.img}
                    className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {(product.preco * quantidade).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                        </p>
                        <p className="text-sm font-semibold">
                          {product.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm">
                      <div className="flex justify-between w-full pb-2">
                        Quantidade: {quantidade}
                      </div>

                      <button
                        type="submit"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                        onClick={() => remove(key)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-4 h-4 fill-current"
                        >
                          <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
                          <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                        </svg>
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total:
            <span className="font-semibold">{}</span>
          </p>
         
        </div>
        <div className="flex justify-end space-x-4">
          <a
            href="/produtos"
            className="px-6 py-2 border rounded-md border-violet-400"
          >
            Continuar comprando
          </a>
          <button
            type="button"
            className="px-6 py-2 border rounded-md bg-violet-400 text-gray-900 border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Finalizar compra</span>
          </button>
        </div>
      </div>
    </>
    )
  }

  return (
    <>{mens ? "problema com conexão ou autorização" : renderCart()};</>
  );
}
