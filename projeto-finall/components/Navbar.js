import { Fragment } from "react";
//import AuthService from "../services/AuthService";
//import { useEffect, useState } from 'react';
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Cart } from "./CartContext";

// const [currentUser, setCurrentUser] = useState(undefined);
// useEffect(() => {
//   const user = AuthService.getCurrentUser();
//   if (user) {
//     setCurrentUser(user);
//   }
// }, []);

export default function Navbar() {
  const cart = Cart();
  // const itemCarrinho = Object.keys(cart.cart).length;
  const itemCarrinho = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantidade;
  }, 0);
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <a
              href="/produtos"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Produtos
            </a>

            <a
              href="/carrinho"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Carrinho
              {itemCarrinho > 0 && <span> ({itemCarrinho})</span>}
            </a>

            <a
              href="/admin"
              className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              Painel de Serviços
            </a>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {/* {currentUser ? (<a
              href="/logout"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Logout
            </a>) : (<a
              href="/login"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Login
            </a>)} */}
            <a
              href="/logout"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              logout
            </a>
            <a
              href="/login"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              login
            </a>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="flex items-center justify-around gap-y-4 gap-x-8">
                <a
                  href="/produtos"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Produtos
                </a>

                <a
                  href="/carrinho"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Carrinho
                  {itemCarrinho > 0 && <span> ({itemCarrinho})</span>}
                </a>
              </div>
              <div className="flex flex-col justify-start gap-4 items-center">
                <a
                  href="/logout"
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  logout
                </a>
                <a
                  href="/login"
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  login
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
