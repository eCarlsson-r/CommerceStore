"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<
    Array<{
      id: string;
      title: string;
      price: number;
      img: string;
      amount: number;
    }>
  >([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChange = (
    item: {
      id: string;
      title: string;
      price: number;
      img: string;
      amount: number;
    },
    quantity: number,
  ) => {
    //TODO : Update cart quantity on the database
  };

  const handleRemove = (itemId: string) => {
    //TODO : Remove item from the database
    const arr = cart.filter((item) => item.id !== itemId);
    setCart(arr);
    handleTotal();
  };

  const handleTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.amount;
    });
    setSubtotal(total);
    setTax(total * 0.1);
    setTotal(total + total * 0.1);
  };

  useEffect(() => {
    handleTotal();
  });

  return (
    <div>
      <section id="cart_items">
        <div className="container mx-auto px-4">
          <div className="breadcrumbs mb-8 relative">
            <ol className="flex bg-transparent p-0 mb-8 pl-0">
              <li className="mr-2">
                <a
                  href="#home"
                  data-i18n="home"
                  className="bg-primary text-white px-2 py-1 relative"
                >
                  Home
                </a>
              </li>
              <li className="active text-text-main" data-i18n="shopping-cart">
                Shopping Cart
              </li>
            </ol>
          </div>
          <div className="overflow-x-auto border border-border-light mb-12 cart_info">
            <table
              id="table-cart"
              className="cartTable w-full table-condensed text-left"
              data-toggle="table"
              data-url=""
              data-query-params="getCartItems"
              data-response-handler="showCartItems"
            >
              <thead className="bg-primary text-white font-bold">
                <tr className="h-[51px]">
                  <th
                    data-field="product"
                    data-formatter="cartDetailFormatter"
                    className="p-3 align-middle text-center"
                  >
                    Item
                  </th>
                  <th
                    data-field="product-price"
                    data-formatter="cartIDRFormatter"
                    className="p-3 align-middle text-center"
                  >
                    Price
                  </th>
                  <th
                    data-field="quantity"
                    data-formatter="cartQuantityFormatter"
                    data-events="cartQuantityHandler"
                    className="p-3 align-middle text-center"
                  >
                    Quantity
                  </th>
                  <th
                    data-field="total"
                    data-formatter="subtotalFormatter"
                    className="p-3 align-middle text-center"
                  >
                    Total
                  </th>
                  <th
                    data-formatter="cartActionFormatter"
                    data-events="cartActionHandler"
                    data-cell-style="actionStyle"
                    className="p-3 align-middle text-center"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-border-light">
                    <td className="p-4 align-top">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={110}
                        height={110}
                        className="mr-8 float-left"
                      />
                      <div className="cart_description">
                        <h4 className="m-0">
                          <a href="" className="text-text-dark text-xl">
                            {item.title}
                          </a>
                        </h4>
                        <p className="text-text-main">Web ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="cart_price">
                        <p className="text-text-main text-lg">${item.price}</p>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="cart_quantity_button flex items-center justify-center">
                        <button
                          onClick={() => handleChange(item, +1)}
                          className="bg-bg-light text-text-main text-base w-[35px] h-[28px] text-center leading-[28px]"
                        >
                          <PlusCircle size={16} className="inline" />
                        </button>
                        <input
                          className="cart_quantity_input text-text-main text-base text-center w-[35px] border-none"
                          type="text"
                          name="quantity"
                          value={item.amount}
                          autoComplete="off"
                          size={2}
                        />
                        <button
                          onClick={() => handleChange(item, -1)}
                          className="bg-bg-light text-text-main text-base w-[35px] h-[28px] text-center leading-[28px]"
                        >
                          <MinusCircle size={16} className="inline" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="cart_total_price text-primary text-xl font-bold">
                        ${item.price * item.amount}
                      </p>
                    </td>
                    <td className="p-4 align-top">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="cart_delete bg-[#cbcbc4] text-white p-[5px_7px] text-base hover:bg-primary"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/2 sm:ml-auto px-4">
              <div className="total_area bg-bg-light border border-border-light text-text-main p-[30px_25px_30px_0] mb-[80px]">
                <ul className="mb-4 list-none p-0">
                  <li className="bg-[#E6E4DF] text-text-main mt-[10px] p-[7px_20px] flex justify-between">
                    <b data-i18n="cart-subtotal">Cart Sub Total</b>{" "}
                    <span id="cart_subtotal">{subtotal}</span>
                  </li>
                  <li className="bg-[#E6E4DF] text-text-main mt-[10px] p-[7px_20px] flex justify-between">
                    <b data-i18n="cart-tax">Exo Tax</b>{" "}
                    <span id="cart_tax">{tax}</span>
                  </li>
                  <li className="bg-[#E6E4DF] text-text-main mt-[10px] p-[7px_20px] flex justify-between">
                    <b data-i18n="total">Total</b>{" "}
                    <span id="cart_total" className="text-primary">
                      {total}
                    </span>
                  </li>
                </ul>
                <button
                  id="check_out_btn"
                  className="btn btn-default check_out bg-primary text-white border-none rounded-none px-4 py-1.5 ml-10 hover:bg-primary/90"
                  type="button"
                  data-i18n="checkout"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
