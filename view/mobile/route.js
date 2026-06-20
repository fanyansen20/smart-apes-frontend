import dynamic from "next/dynamic";
import loadingPage from "view/loading";

const mobileRoute = {
  // Auth page
  login: dynamic(() => import("./pages/login"), { ...loadingPage }),
  register: dynamic(() => import("../desktop/pages/register"), {
    ...loadingPage,
  }),
  "forgot-password": dynamic(() => import("./pages/forgot-password"), {
    ...loadingPage,
  }),
  "verify-email": dynamic(() => import("../desktop/pages/verify-email"), {
    ...loadingPage,
  }),
  "success-sign-up": dynamic(() => import("../desktop/pages/success-sign-up"), {
    ...loadingPage,
  }),
  "expired-sign-up": dynamic(() => import("../desktop/pages/expired-sign-up"), {
    ...loadingPage,
  }),
  "reset-password": dynamic(() => import("./pages/reset-password"), {
    ...loadingPage,
  }),
  "reset-password-failed": dynamic(
    () => import("../desktop/pages/reset-password-failed"),
    {
      ...loadingPage,
    }
  ),

  home: dynamic(() => import("./pages/home"), {
    ...loadingPage,
  }),
  cart: dynamic(() => import("./pages/cart"), {
    ...loadingPage,
  }),
  categoryOne: dynamic(() => import("./pages/category/slug1"), {
    ...loadingPage,
  }),
  categoryTwo: dynamic(() => import("./pages/category/slug2"), {
    ...loadingPage,
  }),
  categoryThree: dynamic(() => import("./pages/category/slug3"), {
    ...loadingPage,
  }),
  orders: dynamic(() => import("./pages/orders"), {
    ...loadingPage,
  }),
  wishlist: dynamic(() => import("./pages/wishlist"), {
    ...loadingPage,
  }),
  "search-product": dynamic(() => import("./pages/search"), {
    ...loadingPage,
  }),
  "landing-page-shop": dynamic(() => import("./pages/shop/landing-page-shop"), {
    ...loadingPage,
  }),
  "products-shop": dynamic(() => import("./pages/shop/products-shop"), {
    ...loadingPage,
  }),
  "product-detail": dynamic(() => import("./pages/product-details/product"), {
    ...loadingPage,
  }),
  "bundle-detail": dynamic(() => import("./pages/bundles"), {
    ...loadingPage,
  }),
  // Profiling Test
  "profiling-test": dynamic(() => import("./pages/profiling-test"), {
    ...loadingPage,
  }),
  "checkout-profiling-page": dynamic(
    () => import("./pages/profiling-test/checkout-page"),
    { ...loadingPage }
  ),
  "assign-profiling-test": dynamic(
    () => import("./pages/profiling-test/assign"),
    {
      ...loadingPage,
    }
  ),
  checkout: dynamic(() => import("./pages/checkout")),
  "payment-pending": dynamic(() => import("./pages/payment/payment-pending")),
  "payment-success": dynamic(() => import("./pages/payment/payment-success")),
  "category-section": dynamic(() => import("./pages/category-section")),
  "cat-one-search": dynamic(() => import("./pages/category-one-search")),

  // Landing Page
  "pre-assessment": dynamic(() => import("./pages/pre-assessment"), {
    ...loadingPage,
  }),
  "contact-us": dynamic(() => import("./pages/contact-us"), {
    ...loadingPage,
  }),
  "return-and-refund": dynamic(() => import("./pages/return-and-refund"), {
    ...loadingPage,
  }),
  // About Us Page
  "about-us": dynamic(() => import("./pages/about-us"), { ...loadingPage }),
  membership: dynamic(() => import("./pages/membership"), { ...loadingPage }),
  // FAQ
  "faq-page": dynamic(() => import("./pages/faq"), { ...loadingPage }),
  article: dynamic(() => import("./pages/faq/article"), { ...loadingPage }),
  "checkout-membership": dynamic(() => import("./pages/membership/checkout"), {
    ...loadingPage,
  }),
  // Privacy Policy
  "privacy-policy": dynamic(() => import("./pages/privacy-policy"), {
    ...loadingPage,
  }),
  // Term And Condition
  "terms-and-conditions": dynamic(() => import("./pages/terms-and-conditions")),
  "checkout-success": dynamic(
    () => import("./pages/membership/CheckoutSuccess"),
    {
      ...loadingPage,
    }
  ),
  "member-details": dynamic(() => import("./pages/membership/MemberDetails"), {
    ...loadingPage,
  }),
};

export default mobileRoute;
