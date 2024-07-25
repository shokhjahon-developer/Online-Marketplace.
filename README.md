# Online Marketplace Backend

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Copy the example environment file and set your environment variables:

   ```bash
   cp .env.example .env
   ```

3. **Run database migrations:**

   Migrate database tables using Knex:

   ```bash
   npm run migrate
   ```

4. **Run the application:**

   Start the server:

   ```bash
   npm start
   ```

## Features

- **Product Search:** Users can search for products they need.
- **Order Placement:** Users can place orders immediately for the products they find.
- **Wishlist Management:** Users have the option to add products to their wishlist for future reference.
- **Efficient Database Management:** The platform leverages Knex.js and PostgreSQL for efficient data handling and retrieval.

## Description

This online marketplace backend enables users to search for products they need, place orders immediately, or add items to their wishlist for future reference. Built using Knex.js and PostgreSQL, our platform ensures efficient database management, allowing users to seamlessly browse, order, and manage their wishlist items from the convenience of their devices.
