# Build a Complete Women's Fashion E-Commerce Website for SOPIE

Act as a professional full-stack web developer, UI/UX designer, and e-commerce system architect. Build a complete, modern, responsive, and fully functional women's clothing e-commerce website for a fashion business named **SOPIE**, located in Jigjiga, Somali Regional State, Ethiopia.

## 1. Business Information

* **Business Name:** SOPIE
* **Business Type:** Women's clothing, fashion, and accessories
* **Location:** Jigjiga, Somali Regional State, Ethiopia
* **Contact Number:** 0914996096
* **Target Customers:** Women looking for elegant, modest, fashionable, and high-quality clothing.
* **Main Products:** Abayas, elegant open abayas, embroidered dresses, long dresses, floral dresses, occasion wear, hijabs, and other women's fashion products.

Use the uploaded clothing images as the main visual references for the website's fashion style and product presentation.

## 2. Website Design and Branding

Create a luxurious, elegant, feminine, and professional fashion website.

Design requirements:

* Use a premium color palette of black, cream, white, champagne gold, and soft beige.
* Use elegant typography and clean spacing.
* Create a beautiful SOPIE logo using elegant lettering.
* Use large, high-quality fashion photography.
* Display clothing products in attractive product cards.
* Use smooth animations and subtle hover effects.
* Make the design mobile-first and fully responsive on mobile phones, tablets, laptops, and desktops.
* Create a premium shopping experience inspired by modern international fashion boutiques.
* Ensure all buttons, navigation links, product cards, and forms work correctly.

The website must look like a real professional fashion store, not just a static landing page.

## 3. Homepage

Create a beautiful homepage containing:

**Header**

* SOPIE logo.
* Home.
* Shop.
* Abayas.
* Dresses.
* New Arrivals.
* Best Sellers.
* About Us.
* Contact.
* Search icon.
* Shopping cart icon.
* Customer account icon.

**Hero Section**

Use a large fashion banner featuring elegant women's clothing and the following text:

“Discover Your Elegance with SOPIE”

“Elegant Fashion. Timeless Beauty. Confidence in Every Outfit.”

Add two buttons:

* Shop Now
* Explore New Arrivals

**Featured Categories**

Display attractive category cards for:

1. Luxury Abayas
2. Embroidered Abayas
3. Elegant Long Dresses
4. Floral Dresses
5. Occasion Wear
6. Hijabs and Accessories

**New Arrivals**

Show newly added products with images, product names, prices in Ethiopian Birr (ETB), available sizes, and an Add to Cart button.

**Best Sellers**

Show popular products and allow customers to view product details and purchase them.

**Promotional Banner**

Include a section displaying seasonal collections, special offers, and new fashion arrivals.

**Customer Reviews**

Display customer reviews and ratings. Only show genuine reviews submitted by customers or clearly marked sample content during development.

**Footer**

Include the SOPIE business name, location, phone number, social media links, quick navigation links, shopping policies, and customer support information.

## 4. Product Management and Shop Page

Build a complete online clothing catalog.

Each product must support:

* Product name.
* Unique product ID or SKU.
* Product description.
* Product category.
* Multiple product images.
* Selling price in ETB.
* Optional discount price.
* Available sizes, such as S, M, L, XL, and XXL.
* Available colors.
* Available stock quantity.
* Product status: active, out of stock, or hidden.
* New Arrival and Best Seller labels.
* Creation date.

Add shopping filters for:

* Category.
* Price range.
* Size.
* Color.
* Availability.
* New arrivals.
* Best sellers.

Include product search and sorting by price, newest products, and popularity.

When a customer clicks a product, open a detailed product page with a large image gallery, product information, size selection, color selection, quantity selector, stock availability, and Add to Cart button.

Do not use fake product prices or claim that sample products are real inventory. Allow the administrator to add and update the actual product information.

## 5. Shopping Cart and Checkout

Create a fully functional shopping cart.

Customers should be able to:

* Add products to their cart.
* Select sizes and colors.
* Increase or decrease quantities.
* Remove items.
* View subtotal and total.
* See delivery charges when configured.
* Continue shopping.
* Proceed to checkout.

Create a checkout form that collects:

* Customer's full name.
* Phone number.
* Delivery address.
* City or area.
* Optional order notes.
* Selected delivery method.
* Preferred payment method.

Support Jigjiga local delivery and customer pickup, with delivery fees configurable by the administrator.

After an order is submitted, generate a unique order number and display an order confirmation page.

Validate all required fields and prevent orders for quantities greater than the available stock.

## 6. Payment and WhatsApp Ordering

Make ordering simple for customers in Jigjiga.

Include:

* Cash on delivery, if enabled by the administrator.
* Pay at the shop or pickup, if enabled.
* Bank or mobile payment instructions configurable by the administrator.
* WhatsApp order confirmation and customer support.

Create a WhatsApp contact button for the business number 0914996096, using Ethiopia's international dialing code where appropriate.

The WhatsApp integration must open a chat with a prefilled message containing the order number, product names, quantities, selected sizes, colors, and total price.

Do not claim that online payments are integrated unless a real payment gateway has been configured and tested. Keep payment options configurable.

## 7. Customer Accounts

Allow customers to:

* Register and log in securely.
* View their profiles.
* Manage their delivery addresses.
* View order history.
* Track order status.
* Update their contact information.
* Save favorite products to a wishlist.

Provide a guest checkout option so customers can order without creating an account.

## 8. Admin Dashboard

Create a secure administrative dashboard for managing the entire SOPIE business.

The dashboard must include the following modules:

**Overview Dashboard**

* Total sales.
* Number of orders.
* Pending orders.
* Completed orders.
* Total products.
* Low-stock products.
* Best-selling products.
* Recent orders.
* Sales charts by day, week, and month.

**Product Management**

* Add new products.
* Upload product images.
* Edit product details.
* Update prices.
* Manage sizes and colors.
* Update stock quantities.
* Mark products as new arrivals or best sellers.
* Activate, hide, or delete products.

**Inventory Management**

* Track available stock.
* Automatically reduce stock after a confirmed order.
* Notify the administrator about low stock.
* Record stock additions and adjustments.
* Prevent negative stock quantities.

**Order Management**

* View all orders.
* Search orders by customer name or order number.
* Filter orders by date and status.
* Update order status: Pending, Confirmed, Processing, Ready for Pickup, Out for Delivery, Delivered, or Cancelled.
* View customer information and ordered items.
* Print invoices and receipts.

**Customer Management**

* View customer records.
* View customer order history.
* Search customers by name or phone number.

**Reports**

* Daily, weekly, and monthly sales reports.
* Revenue reports.
* Product performance reports.
* Inventory reports.
* Order status reports.
* Export appropriate reports to CSV or Excel where supported.

**Store Settings**

* Edit the store name, logo, phone number, location, and contact information.
* Configure delivery fees.
* Configure payment methods.
* Set low-stock alert levels.
* Manage promotional banners and discount offers.

Protect the dashboard using secure authentication and role-based access. Only authorized administrators should be able to manage products, orders, stock, and business reports.

## 9. Database and Backend

Build a real, database-connected application rather than a static design.

Use a suitable modern technology stack, such as:

* Frontend: React with TypeScript.
* Styling: Tailwind CSS.
* Backend and database: Supabase with PostgreSQL, or an equivalent reliable backend.
* Authentication: Secure customer and administrator authentication.
* Image storage: Secure cloud storage for product images.

Create a well-structured database with tables for:

* Users and profiles.
* Products.
* Product images.
* Categories.
* Product variants, sizes, and colors.
* Inventory and stock movements.
* Shopping carts and cart items.
* Orders and order items.
* Payments and payment status.
* Delivery information.
* Customer reviews.
* Wishlists.
* Store settings.

Use proper relationships, database validation, access controls, and secure server-side order processing. Protect customer information and prevent unauthorized access to administrative data.

## 10. Contact and Location

Create a Contact Us page displaying:

Business Name: SOPIE

Location: Jigjiga, Somali Regional State, Ethiopia.

Phone: 0914996096.

Include:

* Click-to-call phone link.
* WhatsApp contact button.
* Contact form.
* Store location section.
* Business hours, configurable by the administrator.
* Social media links configurable by the administrator.

Do not invent an exact street address or map coordinates. Allow the business owner to provide these details later.

## 11. About SOPIE

Create an elegant About Us page explaining that SOPIE is a women's fashion boutique focused on helping women find elegant, beautiful, and stylish clothing for everyday wear and special occasions.

Emphasize modest fashion, quality, style, customer satisfaction, and convenient shopping.

Keep the content editable so the business owner can add the real company history and other details.

## 12. Technical Requirements

* Build a complete, functional full-stack website.
* Use reusable and maintainable components.
* Ensure responsive layouts on all screen sizes.
* Optimize product images and loading speed.
* Implement loading indicators, validation messages, empty states, and error handling.
* Use accessible buttons, forms, and navigation.
* Secure all administrative operations.
* Implement database access policies and server-side validation.
* Ensure product stock and order totals are calculated securely on the server.
* Include SEO-friendly page titles, descriptions, and product URLs.
* Provide a custom 404 page.
* Include realistic development demo data that can be clearly distinguished from real business inventory.
* Do not leave nonfunctional buttons or unfinished pages.
* Do not expose passwords, secret API keys, or sensitive customer information.

## 13. Final Deliverables

Build the website in working stages:

1. Create the complete UI and visual design.
2. Implement the database and backend.
3. Build product management and inventory features.
4. Implement the cart and checkout.
5. Implement customer accounts and order management.
6. Build the admin dashboard and reports.
7. Add WhatsApp ordering and contact features.
8. Test all important user flows and fix errors.
9. Provide clear instructions for configuring the database, creating the first administrator, uploading products, and deploying the website.

**Important:** Prioritize a polished, luxury women's fashion shopping experience suitable for the Jigjiga market. Use the uploaded clothing photos as visual references, make SOPIE branding consistent throughout the website, and ensure the application is functional, secure, and ready for the business owner to configure and launch.
