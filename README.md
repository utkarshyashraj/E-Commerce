# ShopSphere — E-Commerce Web Application

A modern, responsive e-commerce demo built with **React.js**, **React Router**, and the **[FakeStore API](https://fakestoreapi.com)**.

## Features

- 🛒 **Dynamic product browsing** — Products, categories, search, sort and filter powered by the FakeStore API
- 🧺 **Shopping cart with real-time cost updates** — quantity controls, subtotal, shipping, tax, total
- 🧭 **Seamless navigation via React Router** — Home, Products, Product Detail, Cart, Login, 404
- 🔒 **Demo authentication** — uses the `/auth/login` endpoint of FakeStore API
- 💾 **Persistence** — cart and auth state saved to `localStorage`
- 🎨 **Modern, responsive UI** — custom CSS, mobile-friendly, clean design

## Tech Stack

| Layer        | Tool                             |
| ------------ | -------------------------------- |
| Framework    | React 18                         |
| Routing      | React Router v6                  |
| Build tool   | Vite 5                           |
| API          | FakeStore API                    |
| Styling      | Custom CSS (no framework needed) |
| State        | React Context + `useReducer`     |

## Getting Started

### Prerequisites

- Node.js **18+** (tested on Node 24)
- npm **9+**

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will open at [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

The production build sets Vite `base` to `/E-Commerce/` so assets work on GitHub Pages. Locally, `npm run dev` still uses `/`.

### Deploy on GitHub Pages

Live site (after you enable Pages and push):

**https://utkarshyashraj.github.io/E-Commerce/**

1. Push this repo to [utkarshyashraj/E-Commerce](https://github.com/utkarshyashraj/E-Commerce).
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Under **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
4. The workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) builds on every push to `main` / `master` and publishes `dist`.

Deep links (e.g. `/products`) work because the build copies `index.html` to `404.html` for GitHub Pages SPA routing.

## Demo Credentials

The FakeStore API ships with pre-seeded users. You can log in with:

- Username: `mor_2314`
- Password: `83r5^_`

(These are pre-filled on the Login screen.)

## Project Structure

```
src/
├── api/
│   └── fakestore.js          # Typed API wrapper for FakeStore endpoints
├── components/
│   ├── ErrorMessage.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
├── context/
│   ├── AuthContext.jsx       # Login/logout + persistence
│   └── CartContext.jsx       # Cart state + totals
├── pages/
│   ├── Cart.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── ProductDetail.jsx
│   └── Products.jsx
├── styles/
│   └── index.css
├── App.jsx                   # Route definitions
└── main.jsx                  # Entry point, Providers + BrowserRouter
```

## API Endpoints Used

All consumed from `https://fakestoreapi.com`:

| Endpoint              | Method | Purpose                            |
| --------------------- | ------ | ---------------------------------- |
| `/products`           | GET    | List all products (Home, Products) |
| `/products/{id}`      | GET    | Single product (Product Detail)    |
| `/auth/login`         | POST   | Sign in (Login)                    |

The API wrapper in `src/api/fakestore.js` also exposes `carts` and `users` (GET/POST/PUT/DELETE) so the module covers the full OpenAPI spec, even though only a subset is wired into the UI.

## Routing

| Route              | Component       |
| ------------------ | --------------- |
| `/`                | `Home`          |
| `/products`        | `Products`      |
| `/products/:id`    | `ProductDetail` |
| `/cart`            | `Cart`          |
| `/login`           | `Login`         |
| `*`                | `NotFound`      |

## License

MIT — demo/educational project.
