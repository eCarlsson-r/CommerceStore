import { DataTable } from "@/components/shared/DataTable";
import { ProductSchema } from "@/lib/schemas";
import { useModel } from "@/hooks/useModel";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function Shop() {
  const router = useRouter();
  const { data } = useModel("product");
  const minimumPrice = 0;
  const maximumPrice = 0;
  const title = "Products";
  const columns = [
    {
      accessorKey: "product-code",
      cell: ({ row }: { row: { original: z.infer<typeof ProductSchema> } }) => {
        const record = row.original;
        let products = (<div className="single-products">
              <div className="productinfo text-center" data-code="${{record.product_id}}">
                <img className="lazyload" data-original="${{record.file_path}}" alt="${{record.product_name}}" />
                <h2>${{record.stock_sale_price}}</h2><p>${{record.product_name}}</p>
                <a href="#" className="btn btn-default add-to-cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span data-i18n="add-to-cart">Add to Cart</span>
                </a>
              </div>
              <div className="product-overlay" data-code="${{row.original.product-code}}">
                <div className="overlay-content">
                  <h2>${{row.original.stock-sale-price}}</h2>
                  <p>${{row.original.product-name}}</p>
                  <a href="javascript:void(0);" className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart"></i>
                    <span data-i18n="add-to-cart">Add to Cart</span>
                  </a>
                </div>
              </div>
            </div>);

        let actions = (<div className="choose">
              <ul className="nav nav-pills nav-justified">
                <li>
                  <a className="add-to-wishlist" href="javascript:void(0);">
                    <i className="fa fa-plus-square"></i>
                    <span data-i18n="add-to-wishlist">Add to Wishlist</span>
                  </a>
                </li>
              </ul>
            </div>);

        let discount = (<img className="new mini-discount" data-discount="{{parseInt(record.stock-sale-discount)}}" 
        src="images/product-details/sale-${{parseInt(record.stock-sale-discount)}}" 
        alt="Discount for ${{parseInt(record.stock-sale-discount)}}" />);

        return (
          <article>
            {products}
            {actions}
            {parseInt(record["stock-sale-discount"]) > 0 && discount}
          </article>
        );
      },
    },
  ];

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
              <div className="price-range mt-8">
                <h2>Price Range</h2>
                <div className="well text-center">
                  <input
                    type="text"
                    className="span2"
                    data-slider-min="${{minimumPrice}}"
                    data-slider-max="${{maximumPrice}}"
                    data-slider-step="5000"
                    data-slider-value="[${{minimumPrice}},${{maximumPrice}}]"
                  />
                  <br />
                  <b className="pull-left">${{ minimumPrice }}</b>
                  <b className="pull-right">${{ maximumPrice }}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-3/4 px-4">
            <h2 className="text-2xl font-bold text-center mb-[30px] text-primary uppercase shopTitle"></h2>
            <div className="overflow-x-auto">
              <DataTable
                title="${{title}}"
                columns={columns}
                data={data}
                searchKey="name"
                onRowClick={(item) => router.push(`/product/${item.id}`)}
              ></DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
