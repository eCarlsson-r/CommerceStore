import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header">
      <div className="header_top bg-bg-light py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full sm:w-1/2 px-4">
              <div className="contactinfo">
                <ul className="flex list-none p-0 m-0 text-text-main text-xs font-roboto">
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

      <div className="header-middle py-5 border-b border-border-light">
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
                <ul className="flex list-none p-0 m-0 space-x-6">
                  <li>
                    <Link
                      href="/account"
                      className="text-text-main hover:text-primary flex items-center bg-white"
                    >
                      <i className="fa fa-user mr-1"></i> Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="text-text-main hover:text-primary flex items-center bg-white"
                    >
                      <i className="fa fa-star mr-1"></i> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/checkout"
                      className="text-text-main hover:text-primary flex items-center bg-white"
                    >
                      <i className="fa fa-crosshairs mr-1"></i> Checkout
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="text-text-main hover:text-primary flex items-center bg-white"
                    >
                      <i className="fa fa-shopping-cart mr-1"></i> Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="text-text-main hover:text-primary flex items-center bg-white"
                    >
                      <i className="fa fa-lock mr-1"></i> Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom py-8 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full sm:w-9/12 px-4">
              <div className="navbar-header sm:hidden">
                <button
                  type="button"
                  className="navbar-toggle bg-black"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar bg-white block w-6 h-0.5 my-1"></span>
                  <span className="icon-bar bg-white block w-6 h-0.5 my-1"></span>
                  <span className="icon-bar bg-white block w-6 h-0.5 my-1"></span>
                </button>
              </div>
              <div className="mainmenu">
                <ul className="flex list-none p-0 m-0 space-x-8">
                  <li>
                    <Link
                      href="/"
                      className="text-text-main text-[17px] font-light hover:text-primary active:text-primary"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="relative group">
                    <a
                      href="#"
                      className="text-text-main text-[17px] font-light hover:text-primary flex items-center"
                    >
                      Shop<i className="fa fa-angle-down ml-1"></i>
                    </a>
                    <ul
                      role="menu"
                      className="sub-menu absolute top-8 left-0 bg-black/60 list-none p-0 m-0 w-[220px] shadow-md hidden group-hover:block z-50"
                    >
                      <li>
                        <a
                          href="shop.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Products
                        </a>
                      </li>
                      <li>
                        <a
                          href="product-details.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Product Details
                        </a>
                      </li>
                      <li>
                        <a
                          href="checkout.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Checkout
                        </a>
                      </li>
                      <li>
                        <a
                          href="cart.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Cart
                        </a>
                      </li>
                      <li>
                        <a
                          href="login.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Login
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="relative group">
                    <a
                      href="#"
                      className="text-text-main text-[17px] font-light hover:text-primary flex items-center"
                    >
                      Blog<i className="fa fa-angle-down ml-1"></i>
                    </a>
                    <ul
                      role="menu"
                      className="sub-menu absolute top-8 left-0 bg-black/60 list-none p-0 m-0 w-[220px] shadow-md hidden group-hover:block z-50"
                    >
                      <li>
                        <a
                          href="blog.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Blog List
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-single.html"
                          className="text-white hover:text-accent block py-1 px-4 text-sm"
                        >
                          Blog Single
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="404.html"
                      className="text-text-main text-[17px] font-light hover:text-primary"
                    >
                      404
                    </a>
                  </li>
                  <li>
                    <a
                      href="contact-us.html"
                      className="text-text-main text-[17px] font-light hover:text-primary"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-3/12 px-4">
              <div className="search_box float-right">
                <input
                  type="text"
                  className="bg-bg-light border-none text-text-main text-xs font-light h-[35px] outline-none pl-2.5 w-[155px]"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
