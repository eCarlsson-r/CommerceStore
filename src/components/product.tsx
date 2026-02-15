"use client";
import Image from "next/image";
export default function Product({
  item,
  handleClick,
}: {
  item: { title: string; price: number; img: string; amount: number } | null;
  handleClick: (item: {
    title: string;
    price: number;
    img: string;
    amount: number;
  }) => void;
}) {
  if (!item) return null;
  const { title, price, img } = item;
  return (
    <div className="w-[250px] border m-5 p-5 rounded-lg border-solid border-black">
      <Image src={img} alt={title} width={250} height={280} />
      <div className="details">
        <h2 className="font-bold text-2xl mt-8 font-roboto text-primary">
          {title}
        </h2>
        <p className="text-primary text-2xl mt-2.5 font-bold">${price}</p>
        <button
          onClick={() => handleClick(item)}
          className="bg-primary text-white text-lg cursor-pointer w-full mt-5 px-2.5 py-[5px] p-5 rounded-sm border-none hover:bg-secondary transition-colors font-roboto font-light"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
