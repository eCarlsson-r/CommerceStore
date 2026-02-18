"use client";
import Image from "next/image";
import Link from "next/link";
import { User, Heart, Store, ShoppingCart, Lock, Unlock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header id="header">
      <div className="bg-bg-light py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full sm:w-1/2 px-4">
              <div className="contactinfo">
                <ul className="flex list-none p-0 m-0 text-text-main text-xs">
                  <li className="mr-4">
                    <a
                      href="#"
                      className="hover:text-primary flex items-center"
                    >
                      <i className="fa fa-phone mr-2"></i> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary flex items-center"
                    >
                      <i className="fa fa-envelope mr-2"></i> info@domain.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-4">
              <div className="flex justify-end social-icons">
                <ul className="flex list-none p-0 m-0 space-x-4">
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className="text-text-main hover:text-primary transition-colors"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className="text-text-main hover:text-primary transition-colors"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className="text-text-main hover:text-primary transition-colors"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className="text-text-main hover:text-primary transition-colors"
                    >
                      <i className="fab fa-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className="text-text-main hover:text-primary transition-colors"
                    >
                      <i className="fab fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 border-b border-border-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full md:w-1/3 px-4">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Logo for Carlsson Digital Commerce."
                    width={139}
                    height={39}
                  />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/3 px-4">
              <div className="flex justify-end shop-menu">
                {user ? (
                  <ul className="flex list-none p-0 m-0 space-x-6">
                    <li>
                      <Link
                        href="/account"
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <User className="mr-1" /> Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/wishlist"
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <Heart className="mr-1" /> Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/checkout"
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <Store className="mr-1" /> Checkout
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <ShoppingCart className="mr-1" /> Cart
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => logout()}
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <Unlock className="mr-1" /> Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex list-none p-0 m-0 space-x-6">
                    <li>
                      <Link
                        href="/login"
                        className="text-text-main hover:text-primary flex items-center bg-white"
                      >
                        <Lock className="mr-1" /> Login
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
