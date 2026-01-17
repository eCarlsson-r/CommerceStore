"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [data, setData] = useState(false);
  const [menu, setMenu] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];
  
  const inputHandler = () => {
    setData(!data);
  }

  const menuHandler = () => {
    setMenu(!menu);
  }

  return (
    <nav>
      <div className="pt-5 pb-2 bg-yellow-950">
        <div className={data ? "flex justify-between items-center transition-all duration-300 ease-in-out mx-0 my-6" : "hidden"}>
          <input type="text" placeholder="Search..." className="bg-transparent border text-lg w-[30%] text-zinc-300 p-4 rounded-lg border-solid border-neutral-400"/>
          <Search className="-ml-8 text-white cursor-pointer text-2xl" />
          <X className="mx-5 text-2xl text-white cursor-pointer" onClick={inputHandler} />
        </div>
        <div className={data ? "hidden" : ""}>
          <div className="flex justify-between items-center max-[990px]:mx-0 max-[990px]:px-5 max-[990px]:my-0 max-[990px]:mt-0 max-[990px]:mb-5">
            <div>
              <Search onClick={inputHandler} className="text-white cursor-pointer text-3xl max-[990px]:hidden" />
              <Menu className="hidden max-[990px]:block max-[990px]:text-white max-[990px]:text-2xl" onClick={menuHandler} />
            </div>
            <div>
              <Image
                className="max-w-[140px] h-auto cursor-pointer"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </div>
            <div className="flex">
              <Search className="hidden mr-4 [max-990px]:block [max-990px]:text-3xl [max-990px]:text-white [max-990px]:cursor-pointer"/>
              <Link href="/cart">
                <ShoppingBag className="text-white cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center my-0 max-[990px]:hidden">
            {links.map((link) => (
              <Link key={link.name} className="text-slate-300 px-3 py-2" href={link.path}>
                {link.name}
              </Link>
            ))}
          </div>
          <div className={
            "[min-991px]:hidden transition-[0.3s] flex flex-col justify-start items-start bg-yellow-950 w-[45%] h-[75vh] absolute p-8 " +
            (menu ? "left-[0%] z-[1]" : "left-[-66%]")
          }>
            {links.map((link) => (
              <Link key={link.name} className="text-white text-xl no-underline ml-3 mr-0 mt-5 mb-0" href={link.path}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;