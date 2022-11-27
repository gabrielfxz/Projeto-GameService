import { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Paginacao from "../../components/Paginacao";

export async function getStaticProps() {
  const data = await fetch("http://localhost:5172/api/servico");
  const produtos = await data.json();
  return {
    props: { produtos },
  };
}

export default function Index({ produtos }) {
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

  const renderProducts = () => {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
          <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
            <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
              <div className="flex flex-col justify-center md:w-1/2">
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
                  Best Deal
                </h1>
                <p className="text-base lg:text-xl text-gray-800 mt-2">
                  Save upto <span className="font-bold">50%</span>
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
                <img src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png" alt="" />
              </div>
            </div>
            <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
                  Game Console
                </h1>
                <p className="text-base lg:text-xl text-gray-800">
                  Save Upto <span className="font-bold">30%</span>
                </p>
              </div>
              <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                <img
                  src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
                  alt=""
                  className="md:w-20 md:h-20 lg:w-full lg:h-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Produtos / Serviços
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                {produtos.map((product) => (
                  <>
                    <div key={product.id} className="">
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src={product.img}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex flex-col items-start justify-center">
                        <h3 className="text-sm text-gray-700">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          R$ {product.preco.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-green-100 w-full flex justify-between items-center">
                        <a href={`/produtos/${product.id}`}>Saiba Mais</a>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return (
    <>{mens ? "problema com conexão ou autorização" : renderProducts()};</>
  );
}
