# SmartCart 🛒

SmartCart is a React Native e-commerce mobile application built with TypeScript. It allows users to browse products, search and filter items, manage their cart and wishlist, and simulate checkout.

## Features

- **Product Listing:** Browse products with images, prices, and ratings.
- **Search:** Search products with debounced input.
- **Categories:** Browse products by category.
- **Sorting & Filtering:** Sort by price or rating and filter in-stock products.
- **Product Details:** View product information, image gallery, and similar products.
- **Wishlist:** Add or remove products from your wishlist.
- **Shopping Cart:** Manage quantities, remove items, and calculate totals.
- **Checkout:** Simulate placing an order.
- **Order History:** View previously placed orders.
- **Local Persistence:** Persist cart and wishlist data locally.
- **Network Status:** Display online/offline banners.

## Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Redux
- React Navigation
- Axios
- AsyncStorage
- `@react-native-community/netinfo`
- DummyJSON API

## API

SmartCart uses the [DummyJSON Products API](https://dummyjson.com/docs/products).

Base URL: `https://dummyjson.com`

Endpoints used include:

- `GET /products` — Fetch products
- `GET /products/search?q=...` — Search products
- `GET /products/category-list` — Fetch categories
- `GET /products/category/{category}` — Fetch products by category
- `GET /products/{id}` — Fetch product details

## Getting Started

### Prerequisites

- Node.js and npm
- React Native development environment
- Android Studio and Android SDK for Android builds
- Xcode for iOS builds on macOS

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/iformal42/SmartCart.git
cd SmartCart
npm install
```

Start Metro:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
cd ios
pod install
cd ..
npm run ios
```

## Android Release Build

Generate a release APK:
on root of repo

```bash
npm run apk
```

The APK is generated at:

`android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```text
src/
├── features/
│   ├── products/
│   │   ├── screens/
│   │   ├── services/
│   │   └── ...
│   ├── cart/
│   └── orders/
├── shared/
│   └── components/
├── hooks/
└── types/
```

## Notes

- Checkout is simulated; no real payment processing is performed.
- Product data comes from DummyJSON.
- Cart and wishlist data are stored locally on the device.
- Network status is monitored using NetInfo.
