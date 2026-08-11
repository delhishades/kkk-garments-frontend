# KKK Garments — Frontend Scaffold

React + TypeScript + Vite scaffold for the B2B wholesale clothing ordering platform
described in the SRS. Routing, layouts, and all pages listed in the SRS (public site,
customer portal, admin portal) are wired up. All data currently comes from an
in-memory mock service layer (`src/services/*`) so the UI is fully browsable without
a backend.

## Stack
- React 19 + TypeScript, Vite
- react-router-dom (data router)
- Tailwind CSS (custom "mill ledger" design tokens — see `tailwind.config.js`)

## Getting started
```bash
npm install
npm run dev
```

Demo login: any email works. Use an email containing "admin" (e.g. `admin@kkkgarments.in`)
to land in the admin portal; any other email goes to the customer portal. No password is
checked.

## Folder structure
```
src/
├── app/            # router configuration
├── api/            # mock data set standing in for the backend
├── services/       # mock service functions mirroring the SRS REST API (section 35)
├── hooks/          # auth + cart React context
├── components/
│   ├── ui/         # Button, Field, Badge, PageHeader, EmptyState
│   └── layout/     # PublicLayout, CustomerLayout, AdminLayout, nav, footer
├── features/       # domain-grouped components (auth, products, cart, quotations)
├── pages/
│   ├── public/      # marketing site + auth flows
│   ├── customer/    # approved-customer portal
│   └── admin/       # admin portal
├── routes/          # ProtectedRoute / AdminRoute guards
├── types/           # shared TS domain types
└── utils/           # currency/date formatting
```

## Wiring up a real backend
Every function in `src/services/*.ts` is a 1:1 stand-in for an endpoint in SRS
section 35 (`POST /api/auth/login`, `GET /api/products`, `POST /api/quotations`, etc).
Swap the mock implementations for `fetch`/`axios` calls to the Spring Boot API and the
rest of the app — pages, hooks, routing — does not need to change.

Known gaps intentionally left for backend integration:
- Device fingerprinting is stubbed; a real fingerprint library and cookie/session
  auth should replace the mock `authService`/`deviceService`.
- PDF download buttons are placeholders pending the `/api/quotations/{id}/pdf` endpoint.
- Form submissions log to the mock services only; no persistence beyond the session.
