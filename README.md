# A1 Logistics Management System (Frontend)

Vue 3 + TypeScript single-page admin dashboard for the A1 Logistics Management System. It connects to a Spring Boot backend (REST + JWT) to manage dispatch, fleet, drivers, analytics, finance, and import/export workflows.

## Tech Stack
- [Vue 3](https://vuejs.org/) with Composition API and `<script setup>`
- [Vite](https://vitejs.dev/) build tooling
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) state management
- [Vue Router](https://router.vuejs.org/) for SPA routing
- [Axios](https://axios-http.com/) for HTTP communication

## Getting Started
```bash
npm install
npm run dev
```

The dev server listens on [http://localhost:5173](http://localhost:5173). Ensure the Spring Boot API is reachable at `http://localhost:8080/api` or update `src/api/http.ts`.

## Project Structure
```
src/
  api/              # Axios instance + domain modules
  assets/styles/    # Global styling
  components/       # Reusable UI atoms and dashboard widgets
  layouts/          # MainLayout shell (sidebar + topbar)
  router/           # Route definitions + guards
  store/            # Pinia stores (auth, loads, drivers, fleet, analytics, settings)
  views/            # Page-level views (Dashboard, Dispatch, Fleet, etc.)
```

## Authentication Flow
- Login view posts to `/auth/login` via `authApi` and stores JWT + user profile in `authStore`.
- Navigation guards redirect guests to `/login` and protect private routes.
- Axios interceptor appends the token and handles 401 responses by logging out and redirecting.

## Feature Highlights
- Logistics-style sidebar navigation with KPI dashboard, dispatch workflows, fleet management, and finance panels.
- Reusable UI primitives (`BaseButton`, `BaseCard`, `DataTable`, `StatusTag`, `KpiWidget`, `LineChart`).
- Import/Export module with file upload + download helpers targeting `/api/import/*` and `/api/export/*`.
- AI Insights placeholder wiring to `/api/analytics/ai/*` endpoints.

Adjust API modules and Pinia stores as backend contracts evolve.
