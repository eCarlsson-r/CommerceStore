export default function Orders() {
  return (
    <div id="orderStatus" className="py-12">
      <div className="container mx-auto px-4">
        <div className="breadcrumbs mb-10">
          <ol className="flex bg-transparent p-0 text-text-main text-sm">
            <li className="mr-2">
              <a href="#home" data-i18n="home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li className="mr-2">/</li>
            <li className="text-primary" data-i18n="order-status">
              Order Status
            </li>
          </ol>
        </div>
        <h1
          className="text-2xl font-bold text-primary mb-8"
          data-i18n="order-status"
        >
          Order Status
        </h1>
        <div className="overflow-x-auto border border-border-light">
          <table
            id="table-orders"
            className="w-full text-left border-collapse"
            data-toggle="table"
            data-pagination="true"
            data-page-size="10"
            data-page-list="[10, 25, 50, 100]"
            data-url=""
            data-query-params="getOrderStatus"
            data-response-handler="showOrderStatus"
          >
            <thead className="bg-primary text-white">
              <tr>
                <th
                  data-field="sales-date"
                  data-formatter="orderDate"
                  className="p-3 font-normal w-1/6"
                ></th>
                <th
                  data-field="sales-order-id"
                  data-formatter="orderTitle"
                  className="p-3 font-normal w-1/4"
                ></th>
                <th
                  data-field="sales-order-status"
                  data-formatter="orderStatus"
                  className="p-3 font-normal w-1/4"
                ></th>
                <th
                  data-events="salesOrderAction"
                  data-formatter="orderActionFormat"
                  className="p-3 font-normal w-1/12"
                ></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <br />
      </div>
    </div>
  );
}
