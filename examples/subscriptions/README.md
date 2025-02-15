# Elastic Path storefront starter for Subscriptions

This project was generated with [Composable CLI](https://www.npmjs.com/package/composable-cli).

This storefront accelerates the development of a direct-to-consumer ecommerce experience using Elastic Path's modular products.

## Tech Stack

- [Elastic Path](https://www.elasticpath.com/products): A family of composable products for businesses that need to quickly & easily create unique experiences and next-level customer engagements that drive revenue.

- [Next.js](https://nextjs.org/): a React framework for building static and server-side rendered applications

- [Tailwind CSS](https://tailwindcss.com/): enabling you to get started with a range of out the box components that are
  easy to customize

- [Headless UI](https://headlessui.com/): completely unstyled, fully accessible UI components, designed to integrate
  beautifully with Tailwind CSS.

- [Radix UI Primitives](https://www.radix-ui.com/primitives): Unstyled, accessible, open source React primitives for high-quality web apps and design systems.

- [Typescript](https://www.typescriptlang.org/): a typed superset of JavaScript that compiles to plain JavaScript

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page will hot reload as you edit the file.

## Deployment

Deployment is typical for a Next.js site. We recommend using a provider
like [Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)
or [Vercel](https://vercel.com/docs/frameworks/nextjs) to get full Next.js feature support.

## Current feature set reference

| **Feature**                              | **Notes**                                                                                     |
|------------------------------------------|-----------------------------------------------------------------------------------------------|
| PDP                                      | Product Display Pages                                                                         |
| PLP                                      | Product Listing Pages.                                                                        |
| EPCC PXM product variations              | [Learn more](https://elasticpath.dev/docs/pxm/products/pxm-product-variations/pxm-variations) |
| EPCC PXM bundles                         | [Learn more](https://elasticpath.dev/docs/pxm/products/pxm-bundles/pxm-bundles)               |
| EPCC PXM hierarchy-based navigation menu | Main site nav driven directly from your store's hierarchy and node structure                  |
| Prebuilt helper components               | Some basic building blocks for typical ecommerce store features                               |
| Checkout                                 | [Learn more](https://elasticpath.dev/docs/commerce-cloud/checkout/checkout-workflow)          |
| Cart                                     | [Learn more](https://elasticpath.dev/docs/commerce-cloud/carts/carts)                         |

## Notes on this starter

This starter is using the simple store implementation and add the password reset flow. 
You'll need to ensure your email service is configured to send the password reset emails.

Here is how to do it using Composer and Postmark.
- Make sure you have a Postmark account and API key
- In Postmark, create a new template for the password reset email and note the template ID
- Go to Composer in Commerce Manager and select Postmark Email
- Add your Postmark API key
- In Event Mapping, add key `one-time-password-token-request.created` and value:
 
```json
{
  "messagingProvider": {
    "from": "noreply@<your-domain>.com",
    "templateId": 38364654,
    "to": "$.payload.user_authentication_info.email"
  },
  "dynamicFieldMapping": {
    "username": "$.payload.user_authentication_info.email",
    "token": "$.payload.one_time_password_token",
    "password_profile_id": "$.payload.password_profile_id",
    "user_authentication_info_id": "$.payload.user_authentication_info.id",
    "user_authentication_password_profile_info_id": "$.payload.user_authentication_password_profile_info.id"
  },
  "metadata": {
    "user_id": "$.payload.user_authentication_info.id"
  }
}
```
- To learn more about One Time Password tokens, see [here](https://elasticpath.dev/guides/How-To/Authentication/how-to-utilize-one-time-password-tokens)
