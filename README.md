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

### The Internet Practice Site
- Valid login flow
- Invalid password validation
- Invalid username validation
- Network response validation for login redirect

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
│   ├── the-internet-login.spec.ts
│   └── the-internet-network.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CheckoutPage.ts
│   └── TheInternetLoginPage.ts
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
