export default function Shop() {
  return (
    <div id="shop" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/4 px-4">
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4 text-primary uppercase font-roboto"
                data-i18n="category"
              >
                Category
              </h2>
              <div
                className="space-y-2 border border-gray-200 rounded p-4"
                id="accordian"
              ></div>
              <div className="price-range mt-8"></div>
            </div>
          </div>

          <div className="w-full sm:w-3/4 px-4">
            <h2 className="text-2xl font-bold text-center mb-[30px] text-primary uppercase shopTitle"></h2>
            <div className="overflow-x-auto">
              <table
                id="table-category"
                className="w-full text-left border-collapse"
                data-classes="table-auto w-full"
                data-show-header="false"
                data-row-style="cardFormatter"
              >
                <thead>
                  <tr>
                    <th
                      data-field="product-code"
                      data-formatter="categoryFormatter"
                      data-events="categoryActionHandler"
                      className="p-4"
                    >
                      Kategori
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
