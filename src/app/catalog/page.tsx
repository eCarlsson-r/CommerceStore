"use client";
import list from '@/data';
import Product from '@/components/product';

export default function Catalog() {
  const handleClick = (item: {title: string; price: number; img: string, amount: number}) => {
    //if (cart.indexOf(item) !== -1) return;
    //setCart([...cart, item]);
    console.log("Added to cart:", item);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {list.map((item) => (
            <Product key={item.id} handleClick={handleClick} item={item} />
        ))}
    </div>
  );
}