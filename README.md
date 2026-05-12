# Playwright QA Automation Portfolio

This repository contains end-to-end UI automation tests built with Playwright and TypeScript.

## Covered Test Scenarios

### Login
- Valid login
- Invalid password validation
- Locked-out user validation

### Cart
- Add item to cart
- Cart badge count validation
- Cart item visibility validation

### Checkout
- Successful checkout flow
- Checkout overview validation
- Order completion validation
- Required fields validation
- Field-specific checkout validation errors

## Tech Stack

- Playwright
- TypeScript
- GitHub Actions

## Project Structure

## Project Structure

```txt
qa-playwright-portfolio/
│
├── tests/
│   ├── saucedemo-login.spec.ts
│   ├── saucedemo-cart.spec.ts
│   └── saucedemo-checkout.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CheckoutPage.ts
│
├── .github/
│   └── workflows/
│
├── playwright.config.ts
├── package.json
└── README.md
```

## Running Tests Locally

```bash
npx playwright test
```

## Author

Mark Ashley dela Rosa  
Software QA who loves breaking things gently.
