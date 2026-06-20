import dynamic from "next/dynamic";
import loadingPage from "view/loading";

const desktopRoute = {
  // Auth page
  login: dynamic(() => import("./pages/login"), { ...loadingPage }),
  register: dynamic(() => import("./pages/register"), {
    ...loadingPage,
  }),
  "success-sign-up": dynamic(() => import("./pages/success-sign-up"), {
    ...loadingPage,
  }),
  "verify-email": dynamic(() => import("./pages/verify-email"), {
    ...loadingPage,
  }),
  "reset-password": dynamic(() => import("./pages/reset-password"), {
    ...loadingPage,
  }),
  "reset-password-failed": dynamic(
    () => import("./pages/reset-password-failed"),
    {
      ...loadingPage,
    }
  ),
  "expired-sign-up": dynamic(() => import("./pages/expired-sign-up"), {
    ...loadingPage,
  }),
  "forgot-password": dynamic(() => import("./pages/forgot-password"), {
    ...loadingPage,
  }),

  home: dynamic(() => import("./pages/home"), { ...loadingPage }),
  categoryOne: dynamic(() => import("./pages/category/slug1"), {
    ...loadingPage,
  }),
  categoryTwo: dynamic(() => import("./pages/category/slug2"), {
    ...loadingPage,
  }),
  categoryThree: dynamic(() => import("./pages/category/slug3"), {
    ...loadingPage,
  }),
  "contact-us": dynamic(() => import("./pages/contact-us"), {
    ...loadingPage,
  }),
  membership: dynamic(() => import("./pages/membership"), {
    ...loadingPage,
  }),
  "member-details": dynamic(() => import("./pages/membership/member-details"), {
    ...loadingPage,
  }),
  "checkout-membership": dynamic(() => import("./pages/membership/checkout"), {
    ...loadingPage,
  }),
  "checkout-success": dynamic(
    () => import("./pages/membership/checkout-success"),
    {
      ...loadingPage,
    }
  ),
  "pre-assessment": dynamic(() => import("./pages/pre-assessment"), {
    ...loadingPage,
  }),
  "terms-and-conditions": dynamic(
    () => import("./pages/terms-and-conditions"),
    {
      ...loadingPage,
    }
  ),
  "terms-of-services": dynamic(() => import("./pages/terms-of-services"), {
    ...loadingPage,
  }),
  "privacy-policy": dynamic(() => import("./pages/privacy-policy"), {
    ...loadingPage,
  }),
  cart: dynamic(() => import("./pages/cart"), {
    ...loadingPage,
  }),
  checkout: dynamic(() => import("./pages/checkout-page/checkout"), {
    ...loadingPage,
  }),
  "payment-pending": dynamic(() => import("./pages/payment/payment-pending"), {
    ...loadingPage,
  }),
  "payment-success": dynamic(() => import("./pages/payment/payment-success"), {
    ...loadingPage,
  }),
  wishlist: dynamic(() => import("./pages/wishlist"), {
    ...loadingPage,
  }),
  "search-product": dynamic(() => import("./pages/search"), {
    ...loadingPage,
  }),
  "product-detail": dynamic(() => import("./pages/productDetail"), {
    ...loadingPage,
  }),
  "bundle-detail": dynamic(() => import("./pages/bundles"), {
    ...loadingPage,
  }),
  "landing-page-shop": dynamic(() => import("./pages/shop/landing-page-shop"), {
    ...loadingPage,
  }),
  "products-shop": dynamic(() => import("./pages/shop/products-shop"), {
    ...loadingPage,
  }),
  orders: dynamic(() => import("./pages/orders")),
  "faq-page": dynamic(() => import("./pages/faq"), {
    ...loadingPage,
  }),
  article: dynamic(() => import("./pages/faq/article"), {
    ...loadingPage,
  }),
  "about-us": dynamic(() => import("./pages/about-us")),
  "return-and-refund": dynamic(() => import("./pages/return-and-refund")),
  "profiling-test": dynamic(() => import("./pages/profiling-test")),
  "checkout-profiling-page": dynamic(() =>
    import("./pages/profiling-test/checkout-page")
  ),
  "category-section": dynamic(() => import("./pages/category-section")),
  "cat-one-search": dynamic(() => import("./pages/category-one-search")),
};

export default desktopRoute;
