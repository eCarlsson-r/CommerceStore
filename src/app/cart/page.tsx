"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState<Array<{id: string, title: string; price: number; img: string, amount: number}>>([]);
    const [total, setTotal] = useState(0);

    const handleChange = (item: {id: string, title: string; price: number; img: string, amount: number}, quantity: number) => {
        const index = cart.indexOf(item);
        const tempCart = cart;
        tempCart[index].amount = +quantity;

        if (tempCart[index].amount === 0) {
            tempCart[index].amount = 1;
        }

        setCart([...tempCart]);
    }
    
    const handleRemove = (itemId: string) => {
        const arr = cart.filter(item => item.id !== itemId);
        setCart(arr);
        handleTotal();
    }

    const handleTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.amount;
        });
        setTotal(total);
    }

    useEffect(() => {
        handleTotal();
    });
  
    return <div>
        <article>
            {
                cart.map(item => (
                    <div key={item.id} className="cart_box">
                        <div className="cart_img">
                            <Image src={item.img} alt={item.title} width={100} height={100} />
                            <p>{item.title}</p>
                        </div>
                        <div>
                            <button onClick={() => handleChange(item, +1)}>
                                <PlusCircle size={20} />
                            </button>
                            <span>{item.amount}</span>
                            <button onClick={() => handleChange(item, -1)}>
                                <MinusCircle size={20} />
                            </button>
                        </div>
                        <div>
                            <button onClick={() => handleRemove(item.id)}>
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total: ${total}</h3>
                <button className="checkout">Checkout</button>
            </div>
        </article>
    </div>;
}