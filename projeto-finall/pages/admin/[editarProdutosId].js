import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

export async function getStaticProps(context) {
  const { params } = context;
  const data = await fetch(
    `http://localhost:5172/api/servico/${params.editarProdutosId}`
  );
  const produto = await data.json();
  return {
    props: {
      produto,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:5172/api/servico");
  const data = await response.json();
  const paths = data.map((produto) => {
    return {
      params: {
        editarProdutosId: `${produto.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default function editarProdutos({ produto }) {

  const [product, setProduct] = useState(produto)
  const dadosDosInputs = (e) => {
    const { produtos, value } = e.target;
    setProduct({
      ...product,
      [produtos]: value,
    });
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full p-6 space-y-4 sm:p-10 text-black">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Adicionar Serviços
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="http://localhost:5172/api/servico" method="POST" role="form">
              <div className="shadow-md sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        onChange={dadosDosInputs}
                        className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium"
                      >
                        Descrição do Serviço
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        value={produto.descricao}
                        className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium"
                      >
                        Preço do Serviço
                      </label>
                      <input
                        type="price"
                        name="price"
                        id="price"
                        autoComplete="price"
                        value={produto.preco}
                        className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        URL da imagem
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="url"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="http://www.example.com"
                          value={produto.img}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => adiciona(product)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
