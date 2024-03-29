import { BaseImageUrl } from "@/utils/BaseApiUrl";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
};

type ProductsProps = {
  data: any;
  userId: number;
  status: string;
  session: any;
};

export const Products = (props: ProductsProps) => {
  const { data, userId, status, session } = props;
  const queryClient = useQueryClient();

  const { mutate: handleAddToCart } = useMutation({
    mutationFn: async (productId: number) => {
      await addToCart(userId, productId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["totalCartItems"] });
    },
  });

  const disableCart = () => {
    toast.warn("You have to login first", {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">List of Products</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {data?.map((item: Product) => (
            <div key={item.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${BaseImageUrl}/${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                </div>
              </div>
              <div className="mt-6">
                {status !== "loading" && session ? (
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to cart<span className="sr-only">, {item.id}</span>
                  </button>
                ) : status !== "loading" && !session ? (
                  <button
                    onClick={disableCart}
                    className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to cart
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
