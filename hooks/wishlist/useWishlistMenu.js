import { useRouter } from "next/router";
import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getWishlistByIdProduct } from "store/reducer/wishlist/getWishlistByIdProduct";

// API
import deleteWishlist from "pages/api/clientSide/wishlist/deleteWishlist";
import postWishList from "pages/api/clientSide/wishlist/postWishList";
import { getWishlistData } from "store/reducer/wishlist/wishlistSlice";

// hooks
import useNotification from "@hooks/useNotification";

const useWishlistMenu = (session) => {
  const [_msg, sendNotification] = useNotification();
  const [openModal, setOpenModal] = useState(false);

  const { push } = useRouter();
  const dispatch = useDispatch();

  const isDataWishlist = useSelector((store) => store.wishlistByIdProduct);

  const handleOpenModal = (event) => {
    setOpenModal(event.currentTarget);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openMenuWishlist = (event, idProduct) => {
    handleOpenModal(event);
    if (isDataWishlist.idProductWishlist !== idProduct) {
      dispatch(
        getWishlistByIdProduct({
          auth: session?.accessToken,
          idProduct,
        })
      );
    }
  };

  const addProductToWishlist = async (idProduct) => {
    dispatch(getWishlistByIdProduct());
    if (!session) {
      return push("/login");
    } else {
      const resultWishlist = await postWishList({
        auth: session.accessToken,
        idProduct,
      });

      if (!resultWishlist.code) {
        sendNotification({
          msg: ["Success add to wishlist"],
        });
      } else {
        sendNotification({
          msg: [resultWishlist.message],
          variant: "error",
        });
      }

      handleCloseModal();
    }
  };

  const deleteProductWishlist = async (idProduct) => {
    const resultWishlist = await deleteWishlist({
      auth: session.accessToken,
      idProduct,
    });

    if (resultWishlist === 204) {
      sendNotification({
        msg: ["Success remove product from Wishlist"],
      });

      dispatch(getWishlistByIdProduct());
      dispatch(getWishlistData({}));
      handleCloseModal();
    }
  };

  return {
    isDataWishlist,
    openModal,
    openMenuWishlist,
    handleCloseModal,
    addProductToWishlist,
    deleteProductWishlist,
  };
};

export default useWishlistMenu;
