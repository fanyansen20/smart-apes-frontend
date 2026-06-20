export const needLogoOnly = (pathname) => {
  const listPaths = [
    "/terms-and-conditions",
    "/privacy-policy",
    "/membership/checkout/success",
    "/membership/checkout",
    "/cart/checkout/[id]",
    "/payment/pending/[...id]",
    "/payment/success/[...id]",
    "/verify-email",
    "/expired-sign-up",
    "/success-sign-up",
    "/faq",
    "/faq/article",
    "/about-us",
    "/return-and-refund",
    "/profiling-test",
    "/profiling-test/checkout",
  ];

  return listPaths.includes(pathname);
};

export const disabledFloatImage = (pathname) => {
  const listPaths = ["/faq", "/faq/[faq-detail]", "/about-us"];

  return listPaths.includes(pathname);
};

export const isHeaderShop = (pathname) => {
  const listPaths = ["/[shop]", "/[shop]/products", "/[shop]/ratings"];

  return listPaths.includes(pathname);
};

export const isCategoryPage = (pathname) => {
  const listPaths = [
    "/category/[slug1]",
    "/category/[slug1]/[slug2]",
    "/category/[slug1]/[slug2]/[slug3]",
  ];

  return listPaths.includes(pathname);
};

export const isHeaderCheckout = (pathname) => {
  const listPaths = [
    "/membership/checkout",
    "/profiling-test",
    "/profiling-test/checkout",
  ];

  return listPaths.includes(pathname);
};
