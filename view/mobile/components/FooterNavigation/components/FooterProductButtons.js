// Next
import Image from "next/image";

// MUI
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

// Styles
import classes from "./FooterProductButtons.module.scss";

// Assets
import CartIcon from "@public/assets/icons/cart-add.svg";
// import ChatIcon from "@public/assets/icons/chat-outlined.svg";

const FooterProductButtons = ({
  onClickCart,
  onClickPurchase,
  disabled = false,
}) => {
  return (
    <BottomNavigation classes={{ root: classes.bottomNav }}>
      {/* <BottomNavigationAction
        disabled
        icon={<Image src={ChatIcon} width="24px" height="24px" alt="cart" />}
      /> */}
      <BottomNavigationAction
        classes={{ root: classes.addCartBtn }}
        disabled={disabled}
        onClick={(e) => onClickCart(e)}
        icon={<Image src={CartIcon} width="24px" height="24px" alt="cart" />}
        label="Add to Cart"
        showLabel
      />
      <BottomNavigationAction
        classes={{ root: classes.purchaseBtn }}
        disabled={disabled}
        onClick={(e) => onClickPurchase(e)}
        label="Purchase Now"
        showLabel
      />
    </BottomNavigation>
  );
};

export default FooterProductButtons;
