export default function Account() {
  return (
    <div id="account" className="py-12">
      <div className="container mx-auto px-4">
        <div className="breadcrumbs mb-10">
          <div className="flex justify-between items-center">
            <ol className="flex bg-transparent p-0 text-text-main text-sm">
              <li className="mr-2">
                <a href="#home" data-i18n="home" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li className="mr-2">/</li>
              <li className="text-primary" data-i18n="account-settings">
                Account Settings
              </li>
            </ol>
            <div>
              <a
                id="update-details"
                className="bg-primary text-white px-4 py-2 rounded-none hover:bg-primary/90 transition-colors cursor-pointer font-roboto"
                data-i18n="update-details"
                href="#"
              >
                Update Details
              </a>
            </div>
          </div>
        </div>
        {/*/breadcrums*/}

        <form id="customer-details">
          <div className="mb-8">
            <h2
              className="text-xl font-bold text-primary mb-4 uppercase font-roboto"
              data-i18n="sign-in-details"
            >
              Sign-in Details
            </h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-1/2 px-4">
                <input
                  title=""
                  name="acc_password"
                  type="password"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary mb-4 font-light text-text-main"
                  data-i18n="[placeholder]new-password"
                  placeholder="New Password"
                />
              </div>

              <div className="w-full sm:w-1/2 px-4">
                <input
                  title=""
                  name="acc_confirm-password"
                  type="password"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary mb-4 font-light text-text-main"
                  data-i18n="[placeholder]confirm-new-password"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold text-primary mb-4 uppercase font-roboto"
              data-i18n="personal-details"
            >
              Personal Details
            </h2>
            <div className="flex flex-wrap -mx-4">
              <input type="hidden" name="customer-account" />
              <input type="hidden" name="customer-code" />
              <div className="w-full sm:w-1/2 px-4 space-y-4">
                <input
                  name="customer-name"
                  title="Full Name"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  data-i18n="[placeholder]full-name-mandatory"
                  placeholder="Full Name"
                />
                <select
                  name="customer-gender"
                  title="Gender"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="w-full sm:w-1/2 px-4 space-y-4">
                <input
                  title=""
                  name="customer-email"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  placeholder="Email* (this is your username)"
                />
                <input
                  title=""
                  name="customer-mobile"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  data-i18n="[placeholder]mobile-phone"
                  placeholder="Mobile Phone"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2
              className="text-xl font-bold text-primary mb-4 uppercase font-roboto"
              data-i18n="billing-address"
            >
              Billing Address
            </h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-1/2 px-4 space-y-4">
                <input
                  title=""
                  name="address1"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  data-i18n="[placeholder]billing-address-1-mandatory"
                  placeholder="Billing Address 1"
                />
                <input
                  title=""
                  name="address2"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  data-i18n="[placeholder]billing-address-2"
                  placeholder="Billing Address 2"
                />
                <select
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  title="Billing Country"
                  data-live-search="true"
                  name="customer-country"
                ></select>
              </div>

              <div className="w-full sm:w-1/2 px-4 space-y-4">
                <input
                  title=""
                  name="zipcode"
                  type="text"
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  data-i18n="[placeholder]zip-code-mandatory"
                  placeholder="Zip Code"
                />
                <select
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  title="Billing Province"
                  data-live-search="true"
                  name="customer-province"
                ></select>
                <select
                  className="w-full bg-bg-light border border-border-light p-3 outline-none focus:ring-1 focus:ring-primary font-light text-text-main"
                  title="Billing City"
                  data-live-search="true"
                  name="customer-city"
                ></select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
