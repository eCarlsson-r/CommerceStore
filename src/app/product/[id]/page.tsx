import Image from "next/image";

export default function ProductDetail() {
  return (
    <div id="productDetail" className="py-12">
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
            <div className="flex flex-wrap -mx-4 mb-12 product-details">
              {/*product-details*/}
              <div className="w-full sm:w-5/12 px-4">
                <div className="border border-gray-200 p-2">
                  <Image
                    id="productImage"
                    src=""
                    alt=""
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="w-full sm:w-7/12 px-4">
                <div className="product-information border border-gray-200 p-6 pb-12 mb-8"></div>
              </div>
            </div>
            {/*/product-details*/}

            <div className="category-tab shop-details-tab mt-12">
              {/*category-tab*/}
              <div className="w-full mb-6">
                <ul className="flex border-b border-border-light bg-bg-light">
                  <li className="mr-1">
                    <a
                      href="#description"
                      className="inline-block py-3 px-6 text-white bg-primary font-medium uppercase font-roboto"
                      data-toggle="tab"
                      data-i18n="product-description"
                    >
                      Product Description
                    </a>
                  </li>
                  {/*li><a href="#product-tag" data-toggle="tab" data-i18n="product-tags" className="inline-block py-3 px-6 text-text-main hover:text-primary font-medium uppercase font-roboto">Product Tags</a></li*/}
                  <li>
                    <a
                      href="#product-reviews"
                      data-toggle="tab"
                      data-i18n="review"
                      className="inline-block py-3 px-6 text-text-main hover:text-primary font-medium uppercase font-roboto"
                    >
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content border border-gray-200 p-6">
                <div className="tab-pane fade active in block" id="description">
                  <div className="w-full" id="product-description"></div>
                </div>
                {/*div className="tab-pane fade hidden" id="product-tag" ></div*/}

                <div
                  className="tab-pane fade hidden"
                  id="product-reviews"
                ></div>
              </div>
            </div>
            {/*/category-tab*/}
          </div>
        </div>
      </div>
    </div>
  );
}
