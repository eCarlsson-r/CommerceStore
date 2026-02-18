export default function Wishlist() {
  return (
    <div id="wishlist" className="py-12">
      <section id="wishlist_items">
        <div className="container mx-auto px-4">
          <div className="breadcrumbs mb-10">
            <ol className="flex bg-transparent p-0 text-text-main text-sm">
              <li className="mr-2">
                <a href="#home" data-i18n="home" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li className="mr-2">/</li>
              <li className="text-primary" data-i18n="wishlist">
                Wishlist
              </li>
            </ol>
          </div>
          <div className="cart_info border border-border-light mb-12 overflow-x-auto">
            <table
              id="table-wishlist"
              className="w-full text-left border-collapse mb-0"
              data-toggle="table"
              data-url=""
              data-query-params="getWishlistItems"
              data-response-handler="showWishlistItems"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th
                    data-formatter="cart_product"
                    className="p-4 font-normal w-1/6"
                  >
                    &nbsp;&nbsp;<span data-i18n="product">Product</span>
                  </th>
                  <th
                    data-field="product-code"
                    data-formatter="cart_description"
                    className="p-4 font-normal w-1/4"
                  ></th>
                  <th
                    data-field="stock-sale-price"
                    data-formatter="cart_price"
                    className="p-4 font-normal w-1/6 text-center"
                  >
                    <span data-i18n="price">Price</span>
                  </th>
                  <th
                    data-field="quantity"
                    data-formatter="wishlist_quantity"
                    data-events="wishlistQuantityAction"
                    className="p-4 font-normal w-1/6 text-center"
                  >
                    <span data-i18n="quantity">Quantity</span>
                  </th>
                  <th
                    data-field="product-total"
                    data-formatter="cart_total"
                    className="p-4 font-normal w-1/6 text-center"
                  >
                    <span data-i18n="total">Total</span>
                  </th>
                  <th
                    data-events="wishlistActionHandler"
                    data-formatter="wishlistActionFormatter"
                    data-cell-style="actionStyle"
                    className="p-4 font-normal w-1/12 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>{" "}
      {/*/#wishlist_items*/}
    </div>
  );
}
