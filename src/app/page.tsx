export default function Home() {
  return (
    <div>
      <section id="slider">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div id="slider-carousel" className="carousel slide">
                <ol
                  className="carousel-indicators"
                  id="promotion-indicator"
                ></ol>
                <div className="carousel-inner" id="promotion-content"></div>
                <a
                  href="#slider-carousel"
                  className="left control-carousel hidden-xs absolute top-1/2 text-[60px] text-[#C2C2C1] hover:text-primary"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left"></i>
                </a>
                <a
                  href="#slider-carousel"
                  className="right control-carousel hidden-xs absolute top-1/2 right-0 text-[60px] text-[#C2C2C1] hover:text-primary"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/4 px-4">
              <div className="left-sidebar">
                <h2
                  className="text-primary font-roboto text-lg font-bold text-center uppercase mb-[30px] relative"
                  data-i18n="category"
                >
                  Category
                </h2>
                <div
                  className="panel-group category-products categorySelector submenu mb-[35px] border border-border-light pb-5 pt-[15px]"
                  id="accordian"
                ></div>
                <div className="price-range"></div>
              </div>
            </div>

            <div className="w-full sm:w-3/4 px-4 padding-right">
              <div id="best_seller" className="features_items overflow-hidden">
                <h2
                  className="title text-center text-primary font-roboto text-lg font-bold uppercase mb-[30px] relative"
                  data-i18n="best_seller"
                >
                  Best Seller
                </h2>
                <table
                  id="table-bestseller"
                  data-classes="table table-borderless"
                  data-show-header="false"
                  data-row-style="cardFormatter"
                >
                  <thead>
                    <tr>
                      <th
                        data-field="product-code"
                        data-formatter="categoryFormatter"
                        data-events="categoryActionHandler"
                      >
                        Kategori
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div id="new_arrival" className="features_items overflow-hidden">
                <h2
                  className="title text-center text-primary font-roboto text-lg font-bold uppercase mb-[30px] relative"
                  data-i18n="new_arrival"
                >
                  New Arrival
                </h2>
                <table
                  id="table-newarrival"
                  data-classes="table table-borderless"
                  data-show-header="false"
                  data-row-style="cardFormatter"
                >
                  <thead>
                    <tr>
                      <th
                        data-field="product-code"
                        data-formatter="categoryFormatter"
                        data-events="categoryActionHandler"
                      >
                        Kategori
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div id="all_products" className="features_items overflow-hidden">
                <table
                  id="table-product"
                  data-classes="table table-borderless"
                  data-show-header="false"
                  data-row-style="cardFormatter"
                >
                  <thead>
                    <tr>
                      <th
                        data-field="product-code"
                        data-formatter="categoryFormatter"
                        data-events="categoryActionHandler"
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
      </section>
    </div>
  );
}
