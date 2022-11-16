import React, {useState, useEffect} from "react";

export default function Example() {
  const urlAPI = "http://localhost:5172/api/home";
  const initialState = {
    produto: { id: 0, name: "", desc: "", preco: 0, img: ""},
    lista: [],
  };

  const [produto, setProduto] = useState(initialState.produto);
  const [lista, setLista] = useState(initialState.lista);

  const dataFromAPI = async () => {
    return await axios(urlAPI)
      .then((resp) => resp.data)
      .catch((err) => err);
  };

  useEffect(() => {
    dataFromAPI()
      .then(setLista)
      .catch((error) => console.log(error));
  }, [produto]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Produtos / Serviços
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {lista.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.img}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.preco}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
