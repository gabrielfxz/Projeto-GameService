import Navbar from "../../components/Navbar";
import { StarIcon } from "@heroicons/react/20/solid";
import { Cart } from "../../components/CartContext";

export async function getStaticProps(context) {
  const { params } = context;
  const data = await fetch(
    `http://localhost:5172/api/servico/${params.produtosId}`
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
        produtosId: `${produto.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

const reviews = { href: "#", average: 5, totalCount: 117 };
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProdutosId({ produto }) {
  const cart = Cart();
  const add = (produtos) => () => {
    cart.addCart(produtos);
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={produto.img}
                alt={`Foto do produto: ${produto.nome}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={produto.img}
                alt={produto.img}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {produto.name}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                <div className="">
                  <p className="mt-1 text-sm text-gray-500">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
                <button
                  id="add"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={add(produto)}
                >
                  Adicionar ao carrinho
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              <div>
                <div>
                  <h3 className="">{produto.descricao}</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
