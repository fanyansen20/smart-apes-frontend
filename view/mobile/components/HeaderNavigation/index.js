// Next
import useLoginCallback from "@hooks/useLoginCallback";
import useToggle from "@hooks/useToggle";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// MUI
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Badge, IconButton } from "@mui/material";

// Components
import DrawerShareProduct from "../DrawerShareProduct/DrawerShareProduct";

// Styles
import classes from "./HeaderNavigation.module.scss";

// Asssets
import CartIcon from "@public/assets/icons/cart-mobile.svg";
import ShareIcon from "@public/assets/icons/share.svg";

/**
 * @param {{
 * pageTitle: string
 * product: Object
 * showButtons: boolean
 * }} props
 * @returns {HTMLElement}
 */
const HeaderNavigation = ({
  pageTitle = "Back",
  product = {},
  showButtons = true,
}) => {
  const router = useRouter();
  const session = useSession();
  const handleLoginCallback = useLoginCallback();
  const [openDrawerShare, toggleDrawerShare] = useToggle();

  const cart = useSelector((store) => store.quantityCart);
  const cartQty =
    session?.status !== "unauthenticated" ? cart?.totalQuantity : null;

  const handleRedirectCart = () => {
    if (session?.status !== "authenticated") {
      return handleLoginCallback();
    }
    return router.push("/cart");
  };

  return (
    <section className={classes.headerNavMobile}>
      <div className={classes.navigation}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIosIcon />
        </IconButton>
        <p>{pageTitle}</p>
      </div>
      {showButtons && (
        <div>
          <IconButton onClick={toggleDrawerShare}>
            <Image src={ShareIcon} width="24px" height="24px" alt="share" />
          </IconButton>
          <IconButton onClick={handleRedirectCart}>
            <Badge badgeContent={cartQty} color="error">
              <Image src={CartIcon} width="26px" height="26px" alt="share" />
            </Badge>
          </IconButton>
        </div>
      )}
      <DrawerShareProduct
        open={openDrawerShare}
        onClose={toggleDrawerShare}
        product={product}
      />
    </section>
  );
};

export default HeaderNavigation;
