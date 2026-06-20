// API
import deleteWishlist from "pages/api/clientSide/wishlist/deleteWishlist";
import postWishList from "pages/api/clientSide/wishlist/postWishList";
import postWishlistFromCart from "pages/api/clientSide/wishlist/postWishlistFromCart";

import useNotification from "@hooks/useNotification";

//! delete this hooks
//! change this hooks to useWishlistMenu

const useHandlerProductWishlist = () => {
  const [_msg, sendNotification] = useNotification();

  const handlerAddProductToWishlist = async ({ auth, idProduct }) => {
    const result = await postWishList({ auth, idProduct });

    if (!result.code) {
      sendNotification({
        msg: ["Success add to wishlist"],
      });
    } else {
      sendNotification({
        msg: [result.message],
        variant: "error",
      });
    }
  };

  const handlerDeleteProductFromWishlist = async ({ auth, idProduct }) => {
    const results = await deleteWishlist({
      auth,
      idProduct,
    });

    if (results === 204) {
      sendNotification({
        msg: ["Success delete product from Wishlist"],
      });
    }
  };

  const handlerAddProductWishlistFromCart = async (auth, idProduct) => {
    const result = await postWishlistFromCart(auth, idProduct);

    if (!result.code) {
      sendNotification({
        msg: ["Success add to wishlist"],
      });
    }
  };

  return {
    handlerAddProductToWishlist,
    handlerDeleteProductFromWishlist,
    handlerAddProductWishlistFromCart,
  };
};

export default useHandlerProductWishlist;
