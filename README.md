# SOPIE — Boutique commerce system

A React + TypeScript boutique application built on Vinext, hosted through Sites on Cloudflare Workers. Structured records use the provisioned D1 SQL database; product photos and the store logo use R2 object storage. The production site is initially owner-private.

## First use

1. Open `/admin` while signed into the ChatGPT account that owns this private site.
2. Click **Initialize my store**. This one-time action assigns that signed-in account as the store owner and administrator. The owner record cannot be reassigned by subsequent setup requests.
3. In **Products**, upload actual photographs (JPG, PNG or WebP; under 8 MB each), enter verified ETB prices and create size/color variants with on-hand stock. Mark actual products as non-sample. Optional original prices greater than the selling price display as a discount.
4. In **Store settings**, enter your exact location, hours, real payment instructions, delivery fees, policies and social links. No exact street address, bank account or hours have been invented.
5. Make test orders while demo mode is on. Test orders remain marked Demo and are excluded from actual reports.
6. Turn demo mode off. Sample items disappear from the catalog and cannot be ordered. Actual inventory remains visible.
7. Before inviting customers, disable the `SOPIE_SETUP_ENABLED` runtime variable and request public sharing through Sites. Store settings do not change hosting access. Keep administrator enrollment complete before changing site audience.

Customers can check out as guests when the hosting audience permits anonymous visitors, or sign in with ChatGPT for profiles, saved addresses, account carts, order history and favorites. This build does not provide separate email/password authentication.

## Administration

- Overview: delivered sales, order counts, pending/completed counts, product totals, low-stock variants, recent orders, actual product performance and payment records. Switch the scope explicitly to inspect demo records.
- Products: multiple image uploads, name, SKU, description, price, original price, category, sizes, colors, on-hand quantity, labels and active/hidden/out-of-stock state.
- Inventory: on-hand, reserved and available stock; adjustments require a reason. Stock movements are recorded.
- Orders: search/filter by name, phone, number, date and status; inspect customer details; advance through valid statuses; record manual payment status; print receipts or save them as PDF using the browser print dialog.
- Customers: signed-in profiles, guest checkout contacts and order histories. Only the original owner can assign administrator roles to other profiles.
- Reports: day/week/month delivered sales, product performance, inventory and filtered order CSV exports. CSV files open in Excel. Delivered totals include delivery fees; product performance excludes delivery fees. Paid records are manual bookkeeping, not gateway confirmations.
- Reviews: only signed-in customers with delivered non-demo purchases qualify. Moderated reviews become visible on the homepage. No invented reviews are shown.
- Messages: contact submissions are stored in the admin dashboard. No outbound email integration is configured.

## Inventory and order integrity

Prices and delivery charges are recomputed on the server using integer hundredths of ETB. Requests cannot override totals. Checkout validates active products, live/demo eligibility, enabled payment/delivery methods and quantities.

Pending orders reserve stock. Confirmation deducts on-hand quantities and removes the reservation. Pending cancellation releases a reservation; cancellation of confirmed/processing/ready/out-for-delivery orders restores stock. Delivered and cancelled orders are terminal. Server validation enforces quantities and status transitions. Conditional SQL inserts into NOT NULL primary-key fields act as transaction guards for current prices, live/sample eligibility and stock. Failed guards roll back the entire D1 batch, including reservations and inventory movements. Optimistic status updates prevent two requests from confirming or cancelling the same order twice. D1 batches commit order and line inserts atomically. Checkout keys prevent duplicate submissions.

Pending reservations do not expire automatically. The administrator should confirm or cancel abandoned pending orders to release them. No scheduled reservation expiry is configured.

Deleting an unreferenced product removes it. Products already referenced by orders are hidden, retaining historical receipts and variant records. Ordered variants cannot be deleted.

## Security and privacy

Hosted identity is supplied by Sites via its dispatch-owned Sign in with ChatGPT flow. API operations enforce administrator roles and user ownership on the server. Writes check same-origin requests. SQL values are bound. Product uploads are administrator-only, limited in size, and allow supported raster image formats only. Public media routes expose uploaded product images, not customer information. Browser carts are device-local for guests and synced to account storage for signed-in users.

The initial setup endpoint additionally requires `SOPIE_SETUP_ENABLED=true`. This setting is intended only for the owner-private initial setup; disable it before public sharing. After the owner is assigned, no second account can claim the store even if the setting remains enabled.

No real payment gateway is integrated. COD and pickup payment are configured in store settings. Bank/mobile transfer instructions are entered by the owner and require manual confirmation. WhatsApp links prepare order messages but do not send them automatically.

## Database and deployment

`.openai/hosting.json` declares `DB` (D1) and `BUCKET` (R2). Sites provisions these bindings and applies the versioned SQL migration from `drizzle/` before deployment. `db/schema.ts` defines the schema; the schema has foreign-key relationships, unique order keys and required fields. Do not modify an applied migration. Add future schema migrations with `npm run db:generate`.

Tables cover profiles, store-owner control, categories, products/images, size/color variants, stock movements, carts/items, orders/items, payments, deliveries, settings, wishlists, verified reviews and contact messages. Product galleries, cart items, addresses and configurable settings use bounded JSON fields; the core order and inventory relationships use normalized foreign-key tables.

Required runtime environment setting for initial private setup: `SOPIE_SETUP_ENABLED=true`. No payment API keys or separate database credentials are needed for the provisioned Sites deployment. Never embed secrets into client code or the hosting manifest.

Use the Sites plugin workflow to build, synchronize the exact source commit, package, and deploy. This GitHub copy deliberately omits the existing Site project ID. Register a new private Site to provision its own database, image storage and hosted identity; do not treat this repository as an automatic deployment. Changing its audience requires an explicit Sites hosting-access action.

## Local development

Node.js 22.13+ is required for the application. Use Node.js 24.15+ to run the backend test suite, which uses the built-in `node:sqlite` API. Install the dependencies in `package.json` using the checked-in pnpm lockfile. The Sites helpers select the managed or portable development profile. A local database is distinct from the production database. After building, apply the SQL migration to local D1 using the generated Wrangler config and `.wrangler/state` as described in the Sites starter README.

Portable development uses `npm run dev`. Portable loopback previews provide a local simulated ChatGPT identity via `/signin-with-chatgpt?return_to=/`; that development mock is not present in production. Initial administrator enrollment additionally needs the local setup environment value. R2 uploads and D1 bindings are simulated locally by the starter infrastructure.

## Validation performed

- TypeScript compilation check.
- 12 server API tests using the actual route handlers and actual migration SQL with a transactional SQLite D1 adapter. These exercise samples, role/CSRF checks, server totals, idempotency, competing checkout rollback, inventory confirmation/cancellation, invalid stock edits, payment/input validation, live sample restrictions, actual-product ordering, account/cart/wishlist isolation, review eligibility, contact storage and upload rejection.
- Production Worker build.

Run `node --test tests/api.mjs` to repeat the backend tests; the helper locates the installed esbuild dependency and creates an ignored test bundle. Test bindings and identities are not part of the deployed application.

No browser automation or real payment-provider testing was available for this build. Production D1/R2 and hosted sign-in are provisioned by Sites; the owner must initialize the store and inspect it before launch.

## Visual assets

The fictional sample imagery was created with the built-in image-generation tool, then encoded for web delivery as project assets:

- `public/assets/editorial.webp`: luxury modest-fashion editorial of an adult East African woman in an ivory embroidered abaya and hijab in a cream courtyard, right-of-frame composition with space for page text, warm light, no embedded text.
- `public/assets/catalog.webp`: a 3 × 2 uniform studio catalog board depicting black, sand, sage, blush and cocoa sample garments and folded hijabs, no labels or watermarks.

They are labeled as AI-generated editorial/sample content. They do not depict verified SOPIE stock or establish actual prices, claims or customer reviews. Replace sample inventory with actual uploaded product photography before live trading.

## GitHub quick start

This is a source-code repository. GitHub Pages cannot run its Worker backend, D1 database or R2 storage. A configured Sites deployment is required for hosted ChatGPT identity; other hosts require a real identity integration before exposing the API. Never trust visitor-supplied identity headers on an unprotected host.

From a terminal in the extracted project directory:

```sh
npm run install:ci
cp .dev.vars.example .dev.vars
npm test
npm run typecheck
npm run build
```

The supplied installation script selects the pinned pnpm version from `package.json`. Local `.dev.vars` is ignored by Git. On Windows, run the install and build helpers in WSL (Ubuntu) or another Bash environment.

To prepare the local database after the build:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_tough_kulan_gath.sql
npm run dev
```

The SQL file is for a new local database; do not execute it again against a populated database. Open the local URL printed by the development command. Sign in using the loopback development sign-in route, open `/admin`, and initialize the local store. Demo records and local identities are separate from production.

## Launch checklist

- Initialize the administrator while the hosted Site is owner-private.
- Upload actual photographs, verified prices and stock.
- Configure delivery, payment instructions and business policies.
- Complete a test order and verify inventory and cancellation behavior.
- Turn demo mode off and disable `SOPIE_SETUP_ENABLED`.
- Request public Site access explicitly when ready to serve customers.

No live payment gateway, email/password customer authentication or automated reservation expiry is included. Browser QA has not been performed. Backend checks do not establish production readiness by themselves.
