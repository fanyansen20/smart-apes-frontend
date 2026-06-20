// Product Drawer Modes Enum
export const productDrawerModes = Object.freeze({
  CART: { param: "CART", drawerTitle: "Add to Cart", btnText: "Add to Cart" },
  PURCHASE: {
    param: "PURCHASE",
    drawerTitle: "Proceed to Payment",
    btnText: "Purchase Now",
  },
  ALL: { param: "ALL", drawerTitle: "Product Variant" },
  BUNDLE: {
    param: "BUNDLE",
    drawerTitle: "Product Variant",
    btnText: "Apply Variant",
  },
});
