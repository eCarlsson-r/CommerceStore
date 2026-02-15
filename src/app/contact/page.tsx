export default function Contact() {
  return (
    <div id="contact-us" className="py-12 container mx-auto px-4">
      <div className="bg-white">
        <div className="flex flex-wrap -mx-4 mb-10">
          <div className="w-full px-4">
            <h2
              className="text-3xl font-bold text-center text-text-dark uppercase mb-4 font-roboto"
              data-i18n="contact-us"
            >
              Contact Us
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-2/3 px-4">
            <div className="mb-8">
              <h2
                className="text-2xl font-bold text-center text-primary uppercase mb-8 font-roboto"
                data-i18n="get-in-touch"
              >
                Get In Touch
              </h2>
              <div
                className="status alert alert-success mb-4 p-4 bg-green-100 text-green-700 rounded"
                style={{ display: "none" }}
              ></div>
              <form id="main-contact-form" className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    className="w-full border border-border-light bg-bg-light rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-light text-text-main"
                    required={true}
                    data-i18n="[placeholder]name"
                    placeholder="Name"
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-border-light bg-bg-light rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-light text-text-main"
                    required={true}
                    data-i18n="[placeholder]email"
                    placeholder="Email"
                  />
                </div>
                <div className="w-full px-4 mb-4">
                  <input
                    type="text"
                    name="subject"
                    className="w-full border border-border-light bg-bg-light rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-light text-text-main"
                    required={true}
                    data-i18n="[placeholder]subject"
                    placeholder="Subject"
                  />
                </div>
                <div className="w-full px-4 mb-4">
                  <textarea
                    name="message"
                    id="message"
                    required={true}
                    className="w-full border border-border-light bg-bg-light rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-light text-text-main"
                    rows={8}
                    data-i18n="[placeholder]your-message-here"
                    placeholder="Your Message Here"
                  ></textarea>
                </div>
                <div className="w-full px-4 mb-4">
                  <input
                    type="submit"
                    name="submit"
                    id="contact-us-btn"
                    className="bg-primary text-white px-10 py-3 rounded-none hover:bg-primary/90 transition-colors cursor-pointer float-right uppercase shadow font-roboto"
                    data-i18n="[value]submit-btn"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="w-full sm:w-1/3 px-4">
            <div className="contact-info">
              <h2
                data-i18n="contact-info"
                className="text-2xl font-bold text-center text-primary uppercase mb-8 font-roboto"
              >
                Contact Info
              </h2>
              <address className="not-italic text-text-main space-y-2 mb-8 font-roboto font-light">
                <p>E-Shopper Inc.</p>
                <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
                <p>Newyork USA</p>
                <p>Mobile: +2346 17 38 93</p>
                <p>Fax: 1-714-252-0026</p>
                <p>Email: info@e-shopper.com</p>
              </address>
              <div className="social-networks">
                <h2
                  className="text-2xl font-bold text-center text-primary uppercase mb-6 font-roboto"
                  data-i18n="social-networks"
                >
                  Social Networking
                </h2>
                <ul className="flex justify-center space-x-4">
                  <li>
                    <a
                      href="#"
                      className="text-text-main hover:text-primary text-2xl transition-colors"
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-text-main hover:text-primary text-2xl transition-colors"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-text-main hover:text-primary text-2xl transition-colors"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-text-main hover:text-primary text-2xl transition-colors"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
