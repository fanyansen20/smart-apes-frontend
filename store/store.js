// Redux lib
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slice
import cartBundleSlice from "./reducer/cartBundle/cartBundleSlice";
import categoriesSlice from "./reducer/categories/categoriesSlice";
import checkTokenResetPasswordSlice from "./reducer/checkTokenResetPassword/checkTokenResetPasswordSlice";
import getCheckoutByIdSlice from "./reducer/checkout/getCheckoutById";
import checkoutBundleSlice from "./reducer/checkoutBundle/checkoutBundleSlice";
import getBundleListByProductIdSlice from "./reducer/getBundleListByProductId/getBundleListByProductIdSlice";
import getDeliveryServicesByShopIdSlice from "./reducer/getDeliveryServicesByShopId/getDeliveryServicesByShopIdSlice";
import getMembershipActivitiesSlice from "./reducer/getMembershipActivities/getMembershipActivitiesSlice";
import getProductReviewsSlice from "./reducer/getProductReviews/getProductReviewsSlice";
import getProductsFromCartSlice from "./reducer/getProductsFromCart/getProductsFromCartSlice";
import resultSearchProductDataSlice from "./reducer/getSearchResults/getSearchProductData";
import resultSearchShopsDataSlice from "./reducer/getSearchResults/getSearchShopData";
import layoutSlice from "./reducer/layout/layoutSlice";
import membershipSlice from "./reducer/membership/membershipSlice";
import payCheckoutSlice from "./reducer/payCheckout/payCheckoutSlice";
import getChildrenSlice from "./reducer/profilingTest/getChildren";
import getSchoolLevelSlice from "./reducer/profilingTest/getSchoolLevel";
import getTestProductSlice from "./reducer/profilingTest/getTestProduct";
import quantityCartSlice from "./reducer/quantityCart/quantityCartSlice";
import resetPasswordSlice from "./reducer/resetPassword/resetPasswordSlice";
import saveSelectedDeliveryServiceByShopSlice from "./reducer/saveSelectedDeliveryServiceByShop/saveSelectedDeliveryServiceByShopSlice";
import searchSlice from "./reducer/search/searchSlice";
import setCheckoutPaymentMethodSlice from "./reducer/setCheckoutPaymentMethod/setCheckoutPaymentMethodSlice";
import dataAllProductsShopSlice from "./reducer/shops/getAllProductsShop";
import dataBundlesShopSlice from "./reducer/shops/getBundlesShop";
import dataShopProductsSlice from "./reducer/shops/getShopProducts";
import shopDataSlice from "./reducer/shops/shopDataSlice";
import subsNewsletterSlice from "./reducer/subsNewsletter/subsNewsletterSlice";
import dataAddressUserSlice from "./reducer/userAddress/getUseAddressSlice";
import wishlistByIdProduct from "./reducer/wishlist/getWishlistByIdProduct";
import wishlistSlice from "./reducer/wishlist/wishlistSlice";

export const rootReducer = combineReducers({
  member: membershipSlice,
  categories: categoriesSlice,
  quantityCart: quantityCartSlice,
  layout: layoutSlice,
  resetPassword: resetPasswordSlice,
  checkTokenResetPassword: checkTokenResetPasswordSlice,
  getCheckoutById: getCheckoutByIdSlice,
  wishlist: wishlistSlice,
  wishlistByIdProduct: wishlistByIdProduct,
  getChildren: getChildrenSlice,
  getSchoolLevel: getSchoolLevelSlice,
  getTestProduct: getTestProductSlice,
  getProductReviews: getProductReviewsSlice,
  shopData: shopDataSlice,
  cartBundle: cartBundleSlice,
  subsNewsletter: subsNewsletterSlice,
  checkoutBundle: checkoutBundleSlice,
  dataShopProducts: dataShopProductsSlice,
  dataAllProductsShop: dataAllProductsShopSlice,
  dataBundlesShop: dataBundlesShopSlice,
  getProductsFromCart: getProductsFromCartSlice,
  getBundleListByProductId: getBundleListByProductIdSlice,
  dataAddressUser: dataAddressUserSlice,
  resultSearchProductData: resultSearchProductDataSlice,
  resultSearchShopsData: resultSearchShopsDataSlice,
  setCheckoutPaymentMethod: setCheckoutPaymentMethodSlice,
  payCheckout: payCheckoutSlice,
  search: searchSlice,
  getDeliveryServicesByShopId: getDeliveryServicesByShopIdSlice,
  saveSelectedDeliveryServiceByShop: saveSelectedDeliveryServiceByShopSlice,
  getMembershipActivities: getMembershipActivitiesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["member"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
export const persistor = persistStore(store);
