# Changelog

All notable changes to this project are documented in this file.

## [2026.10] - 2026-10-12

- Public 'LUXE' React 18 + Vite + Tailwind storefront front end with shop, product, cart, checkout, account, lookbook and content pages; catalogue and cart run on static local data.
- Reviewed October 2026: README has no external links apart from the localhost dev URL, so there were no dead links to fix. No component or style changes; last functional commit is 2026-03-12.
- `package.json` version bumped 0.1.0 to 0.2.0 for the v2026.10 tag (lockfile root version kept in step).
- README appended with the standard 'Work with SkynetLabs' section.
- Known gaps: no backend or payment provider, no LICENSE (README says private client project), no tests or CI; the README install step still says `git clone <your-repo-url>`.

## [2026.09] - 2026-09-16

- Maintenance review of ecommerce-website — "LUXE", a premium e-commerce storefront front end (client project) with an editorial, warm-neutral design system.
- Status: React + Vite SPA on Tailwind CSS 3, React Router v6, Framer Motion and Lucide icons. Pages cover home, shop, collections, lookbook, product detail, cart, checkout, account, about, contact and 404; cart and auth run through React context, and catalogue content is static data under `src/data`. A chat assistant component and recently-viewed/search hooks are present. Build output is a static SPA; no live URL is stated in the README.
- Reviewed September 2026: documentation refreshed, changelog started, and the package version bumped for the v2026.09 maintenance tag. No storefront or component code was changed.
- Known gaps: front end only — the catalogue, cart and checkout run against local static data with no backend or payment provider wired in; no LICENSE file (README states "Private — Client project"); no CHANGELOG before this release; no tests or CI workflow committed.
