"use client";
import { DataTable } from "@/components/shared/DataTable";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const productView = ({ row }: any) => {
    const categoryItem = (
      <div className="single-products">
        <div className="productinfo text-center" data-code={row.id}>
          <Image src={row.image} alt={row.name} />
          <h2>{row.price}</h2>
          <p>{row.name}</p>
          <a href="#" className="btn btn-default add-to-cart">
            <i className="fa fa-shopping-cart"></i>
            <span data-i18n="add-to-cart">Add to Cart</span>
          </a>
        </div>
        <div className="product-overlay" data-code={row.id}>
          <div className="overlay-content">
            <h2>{row.price}</h2>
            <p>{row.name}</p>
            <a
              href="javascript:void(0);"
              className="btn btn-default add-to-cart"
            >
              <i className="fa fa-shopping-cart"></i>
              <span data-i18n="add-to-cart">Add to Cart</span>
            </a>
          </div>
        </div>
      </div>
    );
    if (parseInt(row["stock-sale-discount"]) > 0) {
      const discountBadge = (
        <Image
          className="new mini-discount"
          data-discount={parseInt(row["stock-sale-discount"])}
          src={`images/product-details/sale-${row["stock-sale-discount"]}.png`}
          alt={`Discount for ${row["stock-sale-discount"]} %`}
        />
      );
      return (
        <article>
          {categoryItem}
          {discountBadge}
        </article>
      );
    }
    return categoryItem;
  };

  useEffect(() => {
    const fetchBestSeller = async () => {
      const response = await fetch("http://localhost:8000/api/best-seller");
      const data = await response.json();
      setBestSeller(data);
    };
    fetchBestSeller();
  }, []);

  useEffect(() => {
    const fetchNewArrival = async () => {
      const response = await fetch("http://localhost:8000/api/new-arrival");
      const data = await response.json();
      setNewArrival(data);
    };
    fetchNewArrival();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
              <Sidebar />
            </div>

            {bestSeller.length > 0 && newArrival.length > 0 ? (
              <div className="w-full sm:w-3/4 px-4 padding-right">
                {bestSeller.length > 0 && (
                  <DataTable
                    title="Best Seller"
                    columns={[
                      {
                        field: "name",
                        cell: productView,
                      },
                    ]}
                    data={bestSeller}
                  />
                )}
                {newArrival.length > 0 && (
                  <DataTable
                    title="New Arrival"
                    columns={[
                      {
                        field: "name",
                        cell: productView,
                      },
                    ]}
                    data={newArrival}
                  />
                )}
              </div>
            ) : (
              <div className="w-full sm:w-3/4 px-4 padding-right">
                <DataTable
                  columns={[
                    {
                      field: "name",
                      cell: productView,
                    },
                  ]}
                  data={products}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
