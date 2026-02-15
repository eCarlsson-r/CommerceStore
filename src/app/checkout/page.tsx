export default function Checkout() {
  return (
    <div id="checkout" className="py-12">
      <div className="container mx-auto px-4">
        <div className="breadcrumbs mb-10">
          <ol className="flex bg-transparent p-0 text-text-main text-sm">
            <li className="mr-2">
              <a href="#home" data-i18n="home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li className="mr-2">/</li>
            <li className="mr-2">
              <a
                href="#cart"
                data-i18n="shopping-cart"
                className="hover:text-primary"
              >
                Shopping Cart
              </a>
            </li>
            <li className="mr-2">/</li>
            <li className="text-primary" data-i18n="checkout">
              Check out
            </li>
          </ol>
        </div>
        {/*/breadcrums*/}

        <form id="checkout-details">
          <div className="shopper-informations mb-10">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-1/4 px-4">
                <div className="shopper-info mb-6">
                  <p
                    className="text-xl font-light text-text-dark font-roboto mb-4"
                    data-i18n="shopper-information"
                  >
                    Shopper Information
                  </p>
                  <div className="space-y-3">
                    <input type="hidden" name="customer-no" />
                    <input
                      title=""
                      name="customer-name"
                      type="text"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]full-name"
                      placeholder="Full Name"
                    />
                    <input
                      title=""
                      name="customer-email"
                      type="email"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]email-address"
                      placeholder="Email Address"
                    />
                    <input
                      title=""
                      name="customer-mobile"
                      type="text"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]mobile-phone-mandatory"
                      placeholder="Mobile Phone"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-5/12 px-4">
                <div className="bill-to mb-6">
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full">
                      <p className="float-left text-xl font-light text-text-dark font-roboto pt-1 text-bold">
                        <span data-i18n="ship-to">Ship To</span>
                      </p>
                      <label className="float-right bg-primary text-white py-1 px-3 rounded-none hover:bg-primary/90 cursor-pointer font-roboto font-light">
                        <input
                          name="ship_to_bill"
                          type="checkbox"
                          className="mr-2"
                        />{" "}
                        <span data-i18n="ship-to-bill">
                          Shipping to bill address
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      name="recipient-name"
                      type="text"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]recipient-name"
                      placeholder="Recipient Name"
                    />
                    <input
                      name="shipping-address1"
                      type="text"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]shipping-address-1-mandatory"
                      placeholder="Shipping Address 1"
                    />
                    <input
                      name="shipping-address2"
                      type="text"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]shipping-address-2"
                      placeholder="Shipping Address 2"
                    />
                    <input
                      type="number"
                      name="shipping-zipcode"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[placeholder]zip-code-mandatory"
                      placeholder="Zip Code"
                    />
                    <select
                      data-live-search="true"
                      title="Shipping Country"
                      name="shipping-country"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[title]shipping-country"
                    ></select>
                    <select
                      data-live-search="true"
                      title="Shipping Province"
                      name="shipping-province"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[title]shipping-province"
                    ></select>
                    <select
                      data-live-search="true"
                      title="Shipping City"
                      name="shipping-city"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                      data-i18n="[title]shipping-city"
                    ></select>
                    <select
                      data-live-search="true"
                      title="Shipping Method"
                      name="shipping-method"
                      className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                    >
                      <option data-i18n="shipping-method">
                        Shipping Method
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/3 px-4">
                <div className="order-message mb-6">
                  <p
                    className="text-xl font-light text-text-dark font-roboto mb-4"
                    data-i18n="shipping-order"
                  >
                    Shipping Order
                  </p>
                  <textarea
                    name="order-message"
                    className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary resize-none h-64 font-light text-text-main"
                    data-i18n="[placeholder]shipping-instruction-msg"
                    placeholder="Notes about your order, Special Notes for Delivery"
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="review-payment py-10 border-t border-gray-200">
            <div className="flex flex-wrap -mx-4 mb-8">
              <div className="w-full px-4">
                <h2
                  className="text-xl font-bold text-text-main font-roboto float-left uppercase"
                  data-i18n="shopping-cart"
                >
                  Shopping Cart
                </h2>
                <button
                  id="proceed-payment"
                  className="bg-primary text-white px-2 pr-10 pl-6 py-2 rounded-none hover:bg-primary/90 transition-colors float-right font-roboto font-light"
                  data-i18n="proceed-payment"
                >
                  Update Details
                </button>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-2/3 px-4 mb-6">
                <div className="border border-border-light overflow-x-auto">
                  <table
                    id="table-checkout"
                    className="w-full text-left border-collapse"
                    data-toggle="table"
                    data-url=""
                    data-query-params="getCheckoutItems"
                    data-response-handler="showCheckoutItems"
                  >
                    <thead className="bg-primary text-white font-roboto">
                      <tr>
                        <th
                          data-field="product"
                          data-formatter="cartDetailFormatter"
                          className="w-1/2 p-3 font-normal"
                        ></th>
                        <th
                          data-field="product-price"
                          data-formatter="cartIDRFormatter"
                          className="w-1/6 p-3 font-normal text-center"
                        ></th>
                        <th
                          data-field="quantity"
                          data-formatter="cartTextFormatter"
                          className="w-1/6 p-3 font-normal text-center"
                        ></th>
                        <th
                          data-field="total"
                          data-formatter="subtotalFormatter"
                          className="w-1/6 p-3 font-normal text-center"
                        ></th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>

              <div className="w-full sm:w-1/3 px-4">
                <div className="total_area bg-bg-light border border-border-light p-[30px_25px_30px_0] mb-[80px]">
                  <ul className="mb-4 list-none p-0">
                    <li className="flex justify-between bg-[#E6E4DF] text-text-main py-[7px] px-[20px] mt-[10px] font-roboto font-light">
                      <b data-i18n="cart-subtotal">Cart Sub Total</b>{" "}
                      <span id="checkout_subtotal">$59</span>
                    </li>
                    <li className="flex justify-between bg-[#E6E4DF] text-text-main py-[7px] px-[20px] mt-[10px] font-roboto font-light">
                      <b data-i18n="cart-tax">Exo Tax</b>{" "}
                      <span id="checkout_tax">$2</span>
                    </li>
                    <li className="flex justify-between bg-[#E6E4DF] text-text-main py-[7px] px-[20px] mt-[10px] font-roboto font-light">
                      <b data-i18n="shipping-cost">Shipping Cost</b>{" "}
                      <span id="checkout_shipping">Free</span>
                    </li>
                    <li className="flex justify-between bg-[#E6E4DF] text-text-main py-[7px] px-[20px] mt-[10px] text-lg font-roboto font-light">
                      <b data-i18n="total">Total</b>{" "}
                      <span
                        id="checkout_total"
                        className="text-primary font-bold"
                      >
                        $61
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
