export default function OrderDetail() {
  return (
    <div id="orderDetail" className="py-12">
      <form id="order-details"></form>
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
                href="#orderStatus"
                data-i18n="order-status"
                className="hover:text-primary"
              >
                Order Status
              </a>
            </li>
            <li className="mr-2">/</li>
            <li className="text-primary" data-i18n="order-details">
              Order Details
            </li>
          </ol>
        </div>
        <h2
          className="text-2xl font-bold text-primary mb-8 font-roboto"
          data-i18n="order-details"
        >
          Order Details
        </h2>
        <br />
        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="flex">
              <div className="w-5/12 sm:w-1/3 pr-2 font-bold text-text-dark font-roboto">
                <p>
                  <b data-i18n="order-id">Order ID</b> :{" "}
                </p>
                <p>
                  <b data-i18n="recipient-name">Recipient Name</b> :{" "}
                </p>
                <p className="float-left">
                  <b data-i18n="shipping-address">Shipping Address</b> :
                </p>
              </div>
              <div className="w-7/12 sm:w-2/3">
                <p id="check-order-id"></p>
                <p id="check-recipient-name"></p>
                <p className="float-left" id="check-shipping-address"></p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-4 mb-4">
            <div className="flex">
              <div className="w-5/12 sm:w-1/3 pr-2 font-bold text-gray-700">
                <p>
                  <b data-i18n="order-status">Order Status</b> :{" "}
                </p>
                <p>
                  <b>Tracking Number</b> :{" "}
                </p>
                <p className="float-left">
                  <b data-i18n="billing-address">Billing Address</b> :
                </p>
              </div>
              <div className="w-7/12 sm:w-2/3">
                <p id="check-order-status"></p>
                <p id="check-tracking-number"></p>
                <p className="float-left" id="check-billing-address"></p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4 mb-8">
          <div className="w-full px-4 overflow-x-auto border border-border-light">
            <table
              id="table-order-record"
              className="w-full text-left border-collapse"
              data-toggle="table"
              data-show-footer="true"
              data-url=""
              data-query-params="getOrderRecord"
              data-response-handler="showOrderRecord"
            >
              <thead className="bg-primary text-white font-roboto">
                <tr>
                  <th
                    data-field="product"
                    data-formatter="cartDetailFormatter"
                    className="p-3 font-normal w-1/2"
                  ></th>
                  <th
                    data-field="product-price"
                    data-formatter="cartIDRFormatter"
                    className="p-3 font-normal w-1/6 text-center"
                  ></th>
                  <th
                    data-field="quantity"
                    data-formatter="cartTextFormatter"
                    className="p-3 font-normal w-1/6 text-center"
                  ></th>
                  <th
                    data-field="total"
                    data-formatter="subtotalFormatter"
                    className="p-3 font-normal w-1/6 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot className="bg-bg-light font-bold text-text-dark font-roboto">
                <tr>
                  <td colSpan={2} className="p-3"></td>
                  <td className="p-3 text-right">
                    <span className="block mb-1" data-i18n="cart-subtotal">
                      Cart Sub Total
                    </span>
                    <span className="block mb-1" data-i18n="cart-tax">
                      Exo Tax
                    </span>
                    <span className="block mb-1" data-i18n="shipping-cost">
                      Shipping Cost
                    </span>
                    <span className="block text-lg" data-i18n="total">
                      Total
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="block mb-1" id="orderDetail_subtotal">
                      $59
                    </span>
                    <span className="block mb-1" id="orderDetail_tax">
                      $2
                    </span>
                    <span className="block mb-1" id="orderDetail_shipping">
                      Free
                    </span>
                    <span className="block text-lg" id="orderDetail_total">
                      $61
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 overflow-x-auto border border-gray-200">
            <table
              id="table-order-status"
              className="w-full text-left border-collapse"
              data-toggle="table"
              data-url=""
              data-query-params="getOrderStatusRecords"
              data-response-handler="showOrderStatusRecords"
            >
              <thead className="bg-primary text-white font-roboto">
                <tr>
                  <th
                    data-field="update-date"
                    data-formatter="ordersDateFormatter"
                    className="p-3 font-normal w-1/4"
                  ></th>
                  <th
                    data-field="update-time"
                    data-formatter="ordersTextFormatter"
                    className="p-3 font-normal w-1/4"
                  ></th>
                  <th
                    data-field="sales-order-status"
                    data-formatter="orderStatus"
                    className="p-3 font-normal w-1/2"
                  ></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
