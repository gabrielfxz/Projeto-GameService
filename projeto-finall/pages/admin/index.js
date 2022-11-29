import { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Cart } from "../../components/CartContext";

export async function getStaticProps() {
  const data = await fetch("http://localhost:5172/api/servico");
  const produtos = await data.json();
  return {
    props: { produtos },
  };
}

export default function Admin({ produtos }) {
  const [mens, setMens] = useState([]);

  useEffect(() => {
    UserService.getProfessorBoard().then(
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
    cart.removerServico(id);
    window.location.reload()
  };

  const renderServicos = () => {
    return (
      <>
        <Navbar />
        <div className="flex flex-col w-full p-6 space-y-4 sm:p-10 text-black">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Serviços</h2>
            <a href="/admin/add/adicionaprodutos">
              <button
                type="submit"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Adicionar Serviço +
              </button>
            </a>
          </div>
          <ul className="flex flex-col divide-y divide-gray-700">
            {produtos.map((item) => (
              <>
                <li
                  key={item.id}
                  className="flex flex-col py-6 sm:flex-row sm:justify-between"
                >
                  <div className="flex w-full space-x-2 sm:space-x-4">
                    <img
                      src={item.img}
                      className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                      alt={item.name}
                    />
                    <div className="flex flex-col justify-between w-full pb-4">
                      <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {item.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {item.preco.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-sm">
                        <a href={`/admin/${item.id}`}>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />{" "}
                            </svg>
                            Editar Serviço
                          </div>
                        </a>

                        <button
                          type="submit"
                          className="flex items-center px-2 py-1 pl-0 space-x-1"
                          onClick={() => remove(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                            <rect
                              width="32"
                              height="200"
                              x="168"
                              y="216"
                            ></rect>
                            <rect
                              width="32"
                              height="200"
                              x="240"
                              y="216"
                            ></rect>
                            <rect
                              width="32"
                              height="200"
                              x="312"
                              y="216"
                            ></rect>
                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                          </svg>
                          <span>Apagar Serviço</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return <>{mens ? "problema com conexão ou autorização" : renderServicos()};</>;
}
