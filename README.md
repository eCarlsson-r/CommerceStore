# 🛍️ CommerceStore

### The Next-Generation, Immersive AI & 3D Spatial E-Commerce Storefront

[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

**CommerceStore** is a high-performance consumer storefront engineered to transform traditional static product pages into highly engaging, spatial AI experiences. Rather than acting as a simple digital catalog, this application serves as an interactive spatial canvas that lets users visualize decor variants dynamically while feeding deep telemetry to cloud-hosted agents.

Built using **Next.js 15** and **Tailwind CSS 4**, it blends lightning-fast server-side rendering for SEO domination with high-fidelity client-side WebGL interactions, communicating instantly with our centralized Laravel core.

---

## 🚀 TechEx Multi-Repo Ecosystem Mapping

This storefront represents the consumer-facing visual layer within our interconnected enterprise architecture:

- ⚙️ **[CommerceSystem-API Backend](https://github.com/eCarlsson-r/CommerceSystem-API)**: Central Laravel Backend, Database, and Vertex AI Gateway.
- 🛍️ **[CommerceStore Frotend](https://github.com/eCarlsson-r/CommerceStore)**: Next.js Consumer Web App with interactive 3D Spatial Calculation Canvas and Sales Concierge Sidebar.
- 🖥️ **[CommercePOS Frontend](https://github.com/eCarlsson-r/CommercePOS)**: In-store clerk Point of Sale & Physical Inventory Management Terminal.

---

## ✨ Immersive & Intelligent Feature Matrix

### 🧠 Immersive AI & Spatial Engineering Layer

This storefront breaks past traditional flat e-commerce grids by rendering real-time AI inferences directly inside the user layout:

- **Interactive 3D Spatial Canvas**: An integrated rendering viewport allowing users to manipulate room dimensions. It processes physical boundary parameters ($3.5\text{m} \times 2.4\text{m} \times 2.5\text{m}$) to output live Volume Material Calculations, showing exactly how many wallpaper rolls are required for a space.
- **Algorithmic AI Insights Panel**: Exposes real-time match data metrics (e.g., "30% match profile") compiled from our backend’s multi-strategy machine learning engine, grading items contextually against client design preferences.
- **Conversational Sales Concierge**: A floating chat interface that hooks into Google Gemini. The agent reviews long-context technical spec sheets and queries active warehouse routing data to handle nuanced local stock checks and material questions on the fly.
- **GenAI Inpainting Gateway**: Handles client canvas profile serialization and passes background assets securely to Vertex AI’s imagen-3.0 endpoint for immediate mask-free wallpaper texture projections.

### 🛍️ Unified Omnichannel Shopping Experience

- **Multi-Branch Inventory Verification**: A real-time stock availability panel mapping local product variations and exact counts across regional supply nodes (e.g., _Medan Main, Jakarta Branch_).

- **Frictionless Persistent Checkout**: Secure client-side ledger synchronization matching edge states natively to backend Sanctum order sessions.

- **Flexible Logistics Fulfillment**: User controls enabling seamless shifts between Standard Logistics distribution, rapid Same-Day Couriers, or immediate In-Store Click-and-Collect pickups.

### 📱 Responsive & Progressive

- **Service-Worker Asset Offline Caching**: Preserves operational visibility and retains local client actions during intermittent internet dropouts.
- **Granular WebPush Subscriptions**: Dispatches active shipping notifications, order status mutations, and real-time replenishment receipts straight to consumer devices.

---

## 🛠 Technical Implementation Highlights

- **React Server Components (RSC) First**: Core catalog indexing pages pull structured data directly on the server to dramatically shrink client-side JavaScript delivery footprints.

- **Optimized Dynamic Interceptors**: Extensible data client pipelines executing auto-token attachment, structured error validation, and smooth response serialization.

- **Lightweight Global State Topography**: Lightweight react contexts coordinate user authentication sessions and localized carts without introducing bulky external state libraries.

- **Rigorous Full-Stack Type Safety**: Enforced TypeScript definitions mapping unified type endpoints directly across backend structures, ensuring total compile-time predictability.

- **Vercel Core Web Vitals Dominance**: Native asset stream tuning, explicit layout size specifications, and modern image formats (WebP) ensuring exceptional PageSpeed metrics.

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
    NEXT_PUBLIC_API_URL=http://localhost:8000
    NODE_ENV=development
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```
    The storefront will launch at `http://localhost:3000/`.

---

## 🧱 AI Core Architecture Contracts

The technical interface implementations matching our Laravel AI Kit extensions are safely isolated inside our structural core:

- `src/lib/ai/types.ts` & `src/lib/ai/client.ts`: Manages secure endpoint routing pipelines to Google AI Studio and Vertex AI gateways.

- `src/lib/preview/types.ts`: Models structural schema types for our 3D non-GenAI localized wall viewport.

- `src/lib/analytics/ai-kpis.ts`: Establishes telemetry trackers recording AI task execution performance metrics and user conversion impacts.

- `src/lib/i18n/contracts.ts`: Configures localization processing wrappers to cleanly handle automated copy translation drafts.

---

## 💻 Development Operations Matrix

| Command         | Description                               |
| :-------------- | :---------------------------------------- |
| `npm run dev`   | Starts Next.js dev server with hot reload |
| `npm run build` | Generates production-optimized build      |
| `npm start`     | Runs production-ready server              |
| `npm run lint`  | Lints code with ESLint                    |
| `npm test`      | Runs unit tests via **Vitest**            |

---

## 🔐 Security & Transaction Privacy

- **Secure Authentication**: JWT-based authentication with HttpOnly cookies.
- **Data Protection**: TLS encryption in transit, OWASP best practices implemented.
- **PCI Compliance**: Payment data never stored locally; delegated to backend API.
- **User Privacy**: GDPR-compliant data handling with clear privacy policies.

---

## 📄 License

Proprietary software part of the CommerceSystem ecosystem.
