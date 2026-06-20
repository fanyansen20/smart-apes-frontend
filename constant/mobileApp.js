import { menuNavigation } from "view/mobile/components/FooterNavigation";
import { floatingBtnNavigation } from "view/mobile/pages/home/components/floatingButton";

export const PATH_FOR_NAVBAR_SEARCH = [
  "/",
  "/orders",
  "/search",
  "/search/[queryString]",
  "/wishlist",
  "/[shop]",
  "/[shop]/products",
  "/category",
  "/category/[slug1]",
  "/category/[slug1]/search",
  "/category/[slug1]/[slug2]",
  "/category/[slug1]/[slug2]/[slug3]",
  ...floatingBtnNavigation.map((navigation) => `/${navigation.value}`),
];

export const PATH_BOTTOM_NAV = [
  ...menuNavigation.map((menu) => menu?.value),
  "profiling-test",
  "membership",
  "member-details",
];

export const PATH_WITH_TITLE = ["/wishlist"];

export const IS_GENERAL_SEARCH = ["/", "/search"];

export const IS_NOT_HAMBURGER = ["/"];

export const PATH_NAVBAR_WITH_LOGO = [
  "/pre-assessment",
  "/faq",
  "/faq/article",
  "/contact-us",
  "/return-and-refund",
  "/about-us",
  "/terms-and-conditions",
  "/privacy-policy",
  "/membership",
  "/profiling-test",
];

export const PATH_MOBILE_FOOTER = [
  "/pre-assessment",
  "/faq",
  "/faq/article",
  "/contact-us",
  "/return-and-refund",
  "/about-us",
  "/about-us",
  "/membership",
  "/terms-and-conditions",
  "/privacy-policy",
];
