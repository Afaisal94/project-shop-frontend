"use client";

import { LayoutAdmin } from "@/components";
import { getCategories } from "@/hooks/useCategory";
import { getOrders } from "@/hooks/useOrder";
import { getProducts } from "@/hooks/useProduct";
import { getUsers } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getUsers,
  });
  return (
    <LayoutAdmin>
      <div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Shop Website
                </h2>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-1 lg:grid-cols-4">
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Categories
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {categories?.length}
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Products
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {products?.length}
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Orders
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {orders?.length}
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    Customers
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {customers?.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
