type DetailProps = {
  data: any;
  isLoading: boolean;
  paymentUrl: any;
};

export const Details = (props: DetailProps) => {
  const { data, isLoading, paymentUrl } = props;

  const subtotal = data?.totalPrice / (1 + 10 / 100);
  const tax = data?.totalPrice - data?.totalPrice / (1 + 10 / 100);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Order Detail :
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-6 lg:mt-0 lg:p-8"
          >
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Order Code</dt>
                <dd className="text-sm font-medium text-gray-900">
                  #{data?.orderCode.toUpperCase()}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Order Date</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {data?.orderDate}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Payment Status</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {data?.paymentStatus == "Paid" ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {data?.paymentStatus.toUpperCase()}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      {data?.paymentStatus.toUpperCase()}
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            <hr className="m-10" />

            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Products
            </h2>

            <dl className="mt-6 space-y-4">
              {data?.detail.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-t border-gray-200 pt-4"
                >
                  <dt className="text-sm text-gray-600">{item.name}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    Rp {parseInt(item.price).toLocaleString()} x {item.quantity}
                  </dd>
                </div>
              ))}
            </dl>

            <hr className="m-10" />

            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Delivery Data
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Name</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {isLoading ? "..." : data?.delivery[0].name}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Phone Number</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {isLoading ? "..." : data?.delivery[0].phone}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Address</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {isLoading ? "..." : data?.delivery[0].address}
                </dd>
              </div>
            </dl>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-6 lg:mt-0 lg:p-8"
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
                  Rp {isLoading ? " " : subtotal.toLocaleString()}{" "}
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
                  Rp {isLoading ? " " : tax.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Rp {isLoading ? " " : data?.totalPrice.toLocaleString()}
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              {data?.paymentStatus == "Unpaid" ? (
                <button
                  onClick={() => openInNewTab(paymentUrl)}
                  className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Pay Now
                </button>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
