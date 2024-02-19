import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingProduct = () => {
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">List of Products</h2>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data.map((item) => (
            <div key={item.id}>
              <article className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <Skeleton width="100%" height={250} />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <Skeleton width={100} />
                  </div>
                  <div className="group relative">
                    <Skeleton width={100} />
                  </div>
                </div>
                <div className="relative w-full">
                  <Skeleton width="100%" height={30} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
