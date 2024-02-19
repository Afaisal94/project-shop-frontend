import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/hooks/useCategory";
import { getTotalItems } from "@/hooks/useCart";
import { signOut } from "next-auth/react";
import Link from "next/link";

type NavProps = {
  userId: number;
  status: string;
  session: any;
};

export const NavigationBar = (props: NavProps) => {
  const {userId, status, session} = props
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: totalCartItems } = useQuery({
    queryKey: ["totalCartItems", userId],
    queryFn: async () => getTotalItems(userId),
    enabled: !!userId,
  });

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      href={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      All Categories
                    </Link>
                  </div>
                  {data?.map((item) => (
                    <div key={item.id} className="flow-root">
                      <Link
                        href={`/category/${item.id}`}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {status !== "loading" && session ? (
                    <>
                      <div className="flow-root">
                        <button
                          onClick={() => signOut()}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : null}

                  {status !== "loading" && !session ? (
                    <>
                      <div className="flow-root">
                        <Link
                          href={"/auth/register"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          href={"/auth/login"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Login
                        </Link>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Currency selector */}
                  <form>
                    <div className="inline-block">
                      <label htmlFor="mobile-currency" className="sr-only">
                        Currency
                      </label>
                      <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white"></div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Currency selector */}
              <form>
                <div>
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white"></div>
                </div>
              </form>

              <div className="flex items-center space-x-6">
                {status !== "loading" && session ? (
                  <>
                    <p className="text-sm font-medium text-white">
                      Hello, {session?.user?.name}
                    </p>
                    <button
                      onClick={() => signOut()}
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
                {status !== "loading" && !session ? (
                  <>
                    <Link
                      href={"/auth/login"}
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/auth/register"}
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Create an account
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        <Link
                          href={"/"}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          All Categories
                        </Link>
                        {data?.map((item) => (
                          <Link
                            key={item.id}
                            href={`/category/${item.id}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    {status !== "loading" && session ? (
                      <Link
                        href={"/order"}
                        className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                      >
                        My Order
                      </Link>
                    ) : null}

                    <div className="flex items-center lg:ml-8">
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        {status !== "loading" && session ? (
                          <Link
                            href={'/cart'}
                            className="group -m-2 flex items-center p-2"
                          >
                            <ShoppingBagIcon
                              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                              {totalCartItems}
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </Link>
                        ) : status !== "loading" && !session ? (
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
