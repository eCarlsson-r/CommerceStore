# 🛍️ CommerceStore

### The Next-Generation E-Commerce Storefront.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

**CommerceStore** is a high-performance e-commerce platform engineered to convert browsers into buyers. It delivers a beautifully designed, blazingly fast storefront that seamlessly integrates with the **CommerceSystem-API** backend, enabling retailers to extend their physical operations to the digital realm.

Built with **Next.js 15** and **Tailwind CSS 4**, it combines server-side rendering for SEO excellence with client-side interactivity for engaging user experiences—all with enterprise-grade reliability.

---

## ✨ Key Features

### 🏪 Stunning Product Discovery

- **Dynamic Product Browsing**: Advanced filtering, search, and category navigation for effortless discovery.
- **Rich Product Pages**: High-resolution imagery, detailed descriptions, customer reviews, and real-time stock availability.
- **Smart Recommendations**: Related products and personalized suggestions to boost average order value.
- **Multi-Branch Awareness**: Customers see inventory levels across all branches with local pickup options.

### 🛒 Frictionless Shopping Cart & Checkout

- **Persistent Shopping Cart**: Products saved across sessions using localStorage integration.
- **Flexible Fulfillment**: Choice between Standard Shipping (with multiple courier options), In-Store Pickup, or Same-Day Delivery.
- **Real-Time Order Tracking**: Customers receive instant updates on order status, shipping, and tracking information.
- **Secure Payment Processing**: Integration with [CommerceSystem-API](https://github.com/eCarlsson-r/CommerceSystem-API) for validated transactions.

### 👤 Customer-Centric Features

- **User Accounts**: Login/signup with order history, saved addresses, and wishlist functionality.
- **Customer Profiles**: Track account settings, shipping preferences, and loyalty rewards.
- **Order Management**: View all past orders with receipts, batch reorders, and return requests.
- **Wishlist**: Save favorite products for later purchase or price drop notifications.

### 📱 Responsive & Progressive

- **Mobile-First Design**: Optimized for all devices—phones, tablets, and desktops.
- **Progressive Web App (PWA)**: Offline browsing, installable as an app, push notifications for order updates.
- **Accessibility First**: WCAG 2.1 AA compliance ensuring inclusivity for all users.

### 📊 Business Intelligence

- **Live Analytics**: Track visitor behavior, conversion rates, and popular products.
- **Sales Metrics**: Monitor revenue from online vs. in-store channels in real-time.
- **Customer Insights**: Identify trends, repeat customers, and churn prevention opportunities.

---

## 🛠 Technical Highlights (For Developers & Recruiters)

Built to impress with cutting-edge web standards and performance optimization:

- **Server Components First**: Leverages **Next.js App Router** with React Server Components for optimal performance and reduced JavaScript bundles.
- **Smart Data Fetching**: Custom hooks (`useDataFetchers`, `useAuth`) for centralized API integration and error handling.
- **Context-Based State Management**: Lightweight Cart and Auth context avoiding Redux complexity while maintaining clean architecture.
- **API Integration Layer**: Axios-based API client with interceptors for authentication, error handling, and request/response transformation.
- **Type Safety**: Full TypeScript with strict mode, ensuring zero runtime surprises.
- **SEO Optimization**: Server-side rendering with dynamic metadata for every product page and category.
- **Image Optimization**: Next.js native image optimization leveraging WebP format and lazy loading.
- **Performance**: Vercel Web Vitals optimized—Core Web Vitals passing with flying colors.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- NPM (v10+)
- [CommerceSystem-API](https://github.com/eCarlsson-r/CommerceSystem-API) (Laravel Backend, running on `http://localhost:8000`)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd CommerceStore
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env.local` file in the root directory:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NODE_ENV=development
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```
    The storefront will launch at `http://localhost:3000/`.

---

## 💻 Development Commands

| Command           | Description                              |
| :---------------- | :--------------------------------------- |
| `npm run dev`     | Starts Next.js dev server with hot reload |
| `npm run build`   | Generates production-optimized build     |
| `npm start`       | Runs production-ready server             |
| `npm run lint`    | Lints code with ESLint                   |
| `npm test`        | Runs unit tests via **Vitest**           |

---

## 🔐 Security & Data Privacy

- **Secure Authentication**: JWT-based authentication with HttpOnly cookies.
- **Data Protection**: TLS encryption in transit, OWASP best practices implemented.
- **PCI Compliance**: Payment data never stored locally; delegated to backend API.
- **User Privacy**: GDPR-compliant data handling with clear privacy policies.

---

## 🤝 Integration with CommerceSystem

**CommerceStore** is part of the unified **CommerceSystem** ecosystem:

- 🖥️ **[CommercePOS](https://github.com/eCarlsson-r/CommercePOS)** - In-store Point of Sale & Inventory
- 🛍️ **[CommerceStore](https://github.com/eCarlsson-r/CommerceStore)** - E-commerce Storefront (this repository)
- ⚙️ **[CommerceSystem-API](https://github.com/eCarlsson-r/CommerceSystem-API)** - Laravel Backend & Order Management

Real-time synchronization ensures inventory accuracy and order fulfillment across all channels.

---

## 📄 License

Proprietary software part of the CommerceSystem ecosystem.
