# Wallpaper Store Implementation Guide

This document implements the approved strategy into concrete, build-ready deliverables for the CommerceStore + Laravel backend architecture.

## 1) MVP scope baseline

### In scope (Phase 1 + Phase 2 baseline)
- Commerce storefront with product browsing, product detail pages, cart, checkout, and order success.
- Non-GenAI wall preview foundation:
  - Room photo input.
  - Wall region selection and masking.
  - Perspective-aware wallpaper texture mapping.
  - Pattern repeat scale controls.
  - Preview snapshots attached to cart line items.
- Offline-first PWA:
  - Service worker cache strategies.
  - Offline cart persistence.
  - Background sync for queued write operations.
- Localization baseline:
  - Locale routing.
  - Translation dictionary strategy.
  - Human-approved legal and checkout copy.

### Out of scope for MVP
- Fully generative scene restyling.
- AI-generated product marketing assets in customer flow.
- Complex ML personalization beyond deterministic recommendations.

## 2) Preview technology selection (without GenAI)

### Selected stack
- **Segmentation/masking:** CV-assisted wall mask from user image.
- **Geometry:** Homography/perspective transform from selected wall polygon.
- **Rendering:** Repeating pattern tile shader/canvas composition with user scale controls.
- **Post-processing:** Basic lighting and shadow blending to reduce flat overlay effect.

### Why this stack
- Lower latency than GenAI generation loops.
- Predictable output aligned with actual SKU textures.
- Better cost control and easier QA for commerce-critical flows.

### Success metrics for preview MVP
- Preview interaction rate: users who open preview / PDP visitors.
- Add-to-cart rate after preview vs without preview.
- Preview-to-checkout conversion uplift.
- Median preview render latency under target threshold.
- Preview failure rate (masking or render errors).

## 3) Offline-first contracts

### Client storage
- IndexedDB stores:
  - cart snapshot
  - preview sessions
  - deferred mutations queue

### Queue semantics
- Mutations are queued while offline with idempotency keys.
- On reconnect, queue flushes in FIFO order.
- Conflicts resolved by server canonical version + client reconciliation step.
- Failed records move to dead-letter state for retry/manual user action.

## 4) Laravel AI Kit integration boundaries

### Backend endpoints (Laravel API)
- `POST /api/ai/recommendations`
- `POST /api/ai/visual-search`
- `POST /api/ai/assistant`
- `POST /api/ai/translate-draft`

### Integration principles
- Keep deterministic preview endpoint separate from optional GenAI enhancements.
- Use Laravel AI Kit provider abstraction for model portability.
- Enforce request validation and guardrails:
  - per-feature rate limits
  - cost monitoring
  - latency/error dashboards
  - safety/content policies

## 5) KPI plan for staged AI rollout

### Commercial KPIs
- Conversion uplift from preview and recommendations.
- Average order value increase from cross-sell recommendations.
- Visual-search-assisted product discovery rate.

### Support and operations KPIs
- Assistant resolution rate and support deflection.
- Translation turnaround time and quality acceptance rate.
- AI endpoint p95 latency and per-order AI cost.

### Governance KPIs
- Prompt/template version drift incidents.
- Hallucination or policy violation rate.
- Feature disable fallback success rate.
