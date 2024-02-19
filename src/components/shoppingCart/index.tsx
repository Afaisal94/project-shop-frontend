import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  CheckIcon,
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getTotalPrice,
  deleteCart,
  incrementQty,
  decrementQty,
} from "@/hooks/useCart";
import { BaseImageUrl } from "@/utils/BaseApiUrl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createOrder } from "@/hooks/useOrder";
import { createDetail } from "@/hooks/useDetail";
import { createDelivery } from "@/hooks/useDelivery";

type CartProps = {
  data: any;
  userId: number;
  status: any;
  error: any;
};

export const ShoppingCart = (props: CartProps) => {
  const { data, userId, status, error } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: totalPrice } = useQuery({
    queryKey: ["totalPrice", userId],
    queryFn: async () => getTotalPrice(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (totalPrice) {
      setSubtotal(totalPrice);
      setTax(totalPrice * 0.1);
      setTotal(totalPrice + totalPrice * 0.1);
    }
  }, [totalPrice]);

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: async (id: number) => {
      await deleteCart(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalCartItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });

  const { mutate: mutateIncrement } = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await incrementQty(id, quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalCartItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });
  const { mutate: mutateDecrement } = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      await decrementQty(id, quantity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
      await queryClient.invalidateQueries({ queryKey: ["totalCartItems"] });
      await queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },
  });

  const handleIncrement = async (id: number, quantity: number) => {
    mutateIncrement({ id, quantity });
  };
  const handleDecrement = async (id: number, quantity: number) => {
    if (quantity > 1) {
      mutateDecrement({ id, quantity });
    }
  };
  const handleDelete = async (id: number) => {
    deleteCartItem(id);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res: any = await createOrder({
        paymentStatus: "Unpaid",
        totalPrice: total,
        userId: userId,
      });

      const response: any = res.data;

      if (response.id) {
        await createDetail({
          userId: userId,
          orderId: response.id,
        });

        await createDelivery({
          name: name,
          phone: phone,
          address: address,
          orderId: response.id,
        });
      }
      toast.success("Checkout has been successfull !", {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 2000,
      });
      setTimeout(
        () => router.push(`/order/detail/${response.id}`, { scroll: false }),
        3000
      );
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {status === "pending" && (
                <li>
                  <center>
                    <p>Loading ...</p>
                  </center>
                </li>
              )}

              {status === "error" && (
                <li>
                  <center>
                    <p>{error.message}</p>
                  </center>
                </li>
              )}

              {status === "success" && data?.length == 0 ? (
                <li>
                  <center>
                    <p>Empty Cart !</p>
                  </center>
                </li>
              ) : null}

              {status === "success" && data?.length != 0
                ? data?.map((cart: any, index: number) => (
                    <li key={cart.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={`${BaseImageUrl}/${cart.product.image}`}
                          alt={cart.product.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={"/"}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {cart.product.name}
                                </a>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Rp {cart.product.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <span className="isolate inline-flex rounded-md shadow-sm">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDecrement(cart.id, cart.quantity)
                                }
                                className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                              >
                                <ArrowLeftCircleIcon className="h-6 w-6 text-black" />
                              </button>
                              <button
                                type="button"
                                className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                              >
                                {cart.quantity}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleIncrement(cart.id, cart.quantity)
                                }
                                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                              >
                                <ArrowRightCircleIcon className="h-6 w-6 text-black" />
                              </button>
                            </span>

                            <div className="absolute right-0 top-0">
                              <button
                                onClick={() => handleDelete(cart.id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />

                          <span>In stock</span>
                        </p>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  Rp {subtotal.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping fee</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  ></a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax 10%</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  ></a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  Rp {tax.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Rp {total.toLocaleString()}
                </dd>
              </div>
            </dl>

            <hr className="m-7" />

            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Delivery Form
            </h2>

            <form onSubmit={handleSubmit}>
              <dl className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Phone number
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      id="phone"
                      className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <textarea
                      name="address"
                      id="address"
                      className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setAddress(e.target.value)
                      }
                      required
                    ></textarea>
                  </div>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  disabled={data?.length == 0 ? true : false}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
