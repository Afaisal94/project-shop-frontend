import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteOrder } from "@/hooks/useOrder";
import { toast } from "react-toastify";
import Link from "next/link";

type Order = {
  id: number;
  orderCode: string;
  orderDate: string;
  paymentStatus: string;
  totalPrice: number;
};

type OrderTableProps = {
  data: any;
  status: any;
  error: any;
};

export const OrderTable = (props: OrderTableProps) => {
  const { data, status, error } = props;
  const queryClient = useQueryClient();

  const { mutate: handleDeleteOrder } = useMutation({
    mutationFn: async (orderId: number) => {
      await deleteOrder(orderId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Deleted successfully", {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 2000,
      });
    },
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">My Order</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    No
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Order Code
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Order Date
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Payment Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {status === "pending" && (
                  <tr>
                    <td
                      colSpan={5}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      <center>Loading ...</center>
                    </td>
                  </tr>
                )}
                {status === "error" && (
                  <tr>
                    <td
                      colSpan={5}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      <center>{error.message}</center>
                    </td>
                  </tr>
                )}

                {status === "success" && data?.length == 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      <center>No Data</center>
                    </td>
                  </tr>
                ) : null}

                {status === "success" && data?.length != 0
                  ? data?.map((item: Order, index: number) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.orderCode.toUpperCase()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.orderDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.paymentStatus == "Paid" ? (
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {item.paymentStatus.toUpperCase()}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                              {item.paymentStatus.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/order/detail/${item.id}`}
                            className="text-indigo-600 hover:text-indigo-900 m-1"
                          >
                            Detail
                            <span className="sr-only">, {item.id}</span>
                          </Link>

                          <button
                            onClick={() => handleDeleteOrder(item.id)}
                            className="text-red-600 hover:text-red-900 m-1"
                          >
                            Delete
                            <span className="sr-only">, {item.id}</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}

                {/* {status === "success" && !data?.length ? (
                  data?.map((item: Order, index: number) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.orderCode.toUpperCase()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.orderDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.paymentStatus.toUpperCase()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/order/detail/${item.id}`}
                          className="text-indigo-600 hover:text-indigo-900 m-1"
                        >
                          Detail
                          <span className="sr-only">, {item.id}</span>
                        </Link>

                        <button
                          onClick={() => handleDeleteOrder(item.id)}
                          className="text-red-600 hover:text-red-900 m-1"
                        >
                          Delete
                          <span className="sr-only">, {item.id}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ):null} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
