// react
import { useEffect } from "react";

// mui material
import { Button, Menu } from "@mui/material";

/**
 * @typedef {{
 * code : number | boolean
 * isLoading : boolean
 * idProductWishlist : string
 * }} DataWishlist
 */

/**
 * @param {{
 * productId : string
 * openModal : boolean
 * dataWishlist : DataWishlist
 * addProductToWishlist : () => {}
 * handleCloseModal : () => {}
 * deleteProductWishlist : () => {}
 * }} props
 * @returns
 */
const MenuWishlist = ({
  productId,
  dataWishlist,
  openModal,
  handleCloseModal,
  addProductToWishlist,
  deleteProductWishlist,
}) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => handleCloseModal();

  return (
    <Menu
      anchorEl={openModal}
      disableScrollLock
      open={openModal}
      onClose={handleCloseModal}
      sx={{ zIndex: 10 }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Button
        color="inherit"
        onClick={() =>
          dataWishlist.code === 200
            ? deleteProductWishlist(productId)
            : addProductToWishlist(productId)
        }
        onMouseLeave={handleCloseModal}
        disableRipple
        sx={{ width: dataWishlist.code !== 200 ? "100%" : "180px" }}
      >
        {dataWishlist.code !== 200 ? "Add to Wishlist" : "Remove from Wishlist"}
      </Button>
    </Menu>
  );
};

export default MenuWishlist;
