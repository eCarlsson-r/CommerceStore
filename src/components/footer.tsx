import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg-light">
      <div className="footer-top border-b border-[#E0E0DA] pb-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/6 px-4">
              <div className="companyinfo mt-[57px]">
                <h2 className="text-secondary text-[27px] font-abel uppercase mb-2">
                  <span>e</span>-shopper
                </h2>
                <p className="text-[#B3B3AD] text-xs font-light font-roboto">
                  Want an eternal beauty for your fashion and home? Collect them
                  all here in Carlsson Digital Commerce.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-7/12 px-4" id="branchGallery">
              {/* Branch Gallery placeholders if needed */}
            </div>
            <div className="w-full sm:w-1/4 px-4">
              <div className="address relative mt-[30px] overflow-hidden">
                <Image
                  src="/map.png"
                  alt="World Map background."
                  width={260}
                  height={190}
                  className="w-full"
                />
                <p className="text-[#666663] text-sm font-light font-roboto absolute top-[50px] left-[25px]">
                  505 S Atlantic Ave Virginia Beach, VA(Virginia)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-widget mb-[68px]">
        <div className="container mx-auto px-4 border-t border-white pt-[15px]">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full sm:w-1/5 px-4">
              <div className="single-widget">
                <h2 className="text-text-main text-base font-medium mb-[22px] uppercase font-roboto">
                  Service
                </h2>
                <ul className="list-none p-0">
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Online Help
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Order Status
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Change Location
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      FAQ’s
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/5 px-4">
              <div className="single-widget">
                <h2 className="text-text-main text-base font-medium mb-[22px] uppercase font-roboto">
                  Quock Shop
                </h2>
                <ul className="list-none p-0">
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      T-Shirt
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Mens
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Womens
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Gift Cards
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Shoes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/5 px-4">
              <div className="single-widget">
                <h2 className="text-text-main text-base font-medium mb-[22px] uppercase font-roboto">
                  Policies
                </h2>
                <ul className="list-none p-0">
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Privecy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Billing System
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Ticket System
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/5 px-4">
              <div className="single-widget">
                <h2 className="text-text-main text-base font-medium mb-[22px] uppercase font-roboto">
                  About Shopper
                </h2>
                <ul className="list-none p-0">
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Company Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Store Location
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Affillate Program
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#8C8C88] text-sm font-light hover:text-primary py-[5px] block font-roboto"
                    >
                      Copyright
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/5 px-4">
              <div className="single-widget">
                <h2 className="text-text-main text-base font-medium mb-[22px] uppercase font-roboto">
                  About Shopper
                </h2>
                <form action="#" className="searchform">
                  <input
                    type="text"
                    placeholder="Your email address"
                    className="border border-[#DDDDDD] text-[#CCCCC6] text-sm p-[7px] w-full mb-[10px] outline-none font-roboto"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white p-[7px_17px] border-none inline-block hover:bg-primary/90 transition-colors"
                  >
                    Get it <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                  <p className="text-[#8C8C88] text-sm font-light mt-[25px] font-roboto">
                    Get the most recent updates from <br />
                    our site and be updated your self...
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-[#D6D6D0] pt-[10px] pb-[10px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <p className="text-text-dark text-sm font-light font-roboto ml-[15px]">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="//carlssonstudio.com/"
                  className="text-primary italic underline hover:text-primary"
                >
                  Carlsson Studio
                </a>
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
