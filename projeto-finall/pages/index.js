import Navbar from "../components/Navbar";
export default function Index() {
  return (
    <div className="overflow-hidden h-screen flex justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div>
        <section className="text-zinc-50">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h1 className="text-5xl font-bold leading-none sm:text-6xl">
                Uma nova forma de estar a
                <span className="text-pink-500"> frente</span> de seu oponente
              </h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12">
                logue para acessar nossos serviços
              </p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-end sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <a
                  rel="noopener noreferrer"
                  href="/login"
                  className="px-8 py-3 text-lg font-semibold rounded bg-pink-500 text-white shadow-xl"
                >
                  Login
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <img
                src="../mario1.png"
                alt="Mario"
                className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
