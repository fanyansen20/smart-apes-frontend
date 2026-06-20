// import
import { useEffect } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// mui material
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

// icons
import HomeActiveIcon from "@public/assets/icons/home-active.svg";
import HomeIcon from "@public/assets/icons/home-outlined.svg";
import OrderActiveIcon from "@public/assets/icons/order-active.svg";
import OrderIcon from "@public/assets/icons/order.svg";
import ProfileActiveIcon from "@public/assets/icons/profile-active.svg";
import ProfileIcon from "@public/assets/icons/profile-outlined.svg";
import WishlistActiveIcon from "@public/assets/icons/wishlist-active.svg";
import WishlistIcon from "@public/assets/icons/wishlist-outlined.svg";

// helper
import handleRedirectParent from "helper/handleRedirectParent";

// styles
import classes from "./FooterNavbar.module.scss";

// hooks
import useLoginCallback from "@hooks/useLoginCallback";

const bottomNavigationActionStyles = {
  ".MuiBottomNavigationAction-label.Mui-selected": {
    fontSize: "0.75rem",
  },
};

export const menuNavigation = [
  {
    sx: bottomNavigationActionStyles,
    value: "",
    label: "Home",
    iconSrc: HomeIcon,
    iconActiveSrc: HomeActiveIcon,
  },
  {
    sx: bottomNavigationActionStyles,
    value: "orders",
    label: "Order",
    iconSrc: OrderIcon,
    iconActiveSrc: OrderActiveIcon,
    imageProps: {
      width: 19,
      height: 19,
    },
  },
  {
    sx: bottomNavigationActionStyles,
    value: "wishlist",
    label: "Wishlist",
    iconSrc: WishlistIcon,
    iconActiveSrc: WishlistActiveIcon,
  },
  {
    sx: bottomNavigationActionStyles,
    value: "profile",
    label: "Profile",
    iconSrc: ProfileIcon,
    iconActiveSrc: ProfileActiveIcon,
  },
];

export const urlGoToParent = {
  profile: "",
  orders: "order-list",
};

function FooterNavigation() {
  const handleLoginCallback = useLoginCallback();
  const { pathname, push, query } = useRouter();
  const { status } = useSession();

  const isLogin = status === "authenticated";

  const parentUrlParam = query["parent-url"];
  const isParentUrl =
    parentUrlParam === "profile" || parentUrlParam === "orders";

  useEffect(() => {
    if (isParentUrl) {
      return handleRedirectParent({
        additionalPathRedirect: urlGoToParent[parentUrlParam],
      });
    }
  }, []);

  /**
   * @param {'orders' | 'wishlist' | 'profile' } value
   */
  const changeBottomNavigation = (value) => {
    const isParentUrl = value === "orders" || value === "profile";
    const callbackUrl = isParentUrl
      ? decodeURIComponent(`/?parent-url=${value}`)
      : value;

    if (!isLogin) {
      return handleLoginCallback(callbackUrl);
    }

    if (isParentUrl) {
      return handleRedirectParent({
        additionalPathRedirect: urlGoToParent[value],
      });
    }

    return push(`/${value}`);
  };

  return (
    <Paper className={classes.footerNavbar} elevation={3}>
      <BottomNavigation
        showLabels
        value={pathname.split("/")[1]}
        onChange={(_, value) => changeBottomNavigation(value)}
      >
        {menuNavigation.map(
          ({ iconSrc, iconActiveSrc, imageProps, ...otherProps }) => (
            <BottomNavigationAction
              {...otherProps}
              label={
                otherProps.label === "Profile" && !isLogin
                  ? "Login"
                  : otherProps.label
              }
              key={otherProps.value}
              icon={
                <Image
                  src={
                    pathname.split("/")[1] === otherProps.value
                      ? iconActiveSrc
                      : iconSrc
                  }
                  width={18}
                  height={18}
                  alt="navigation-icon"
                  {...(imageProps || {})}
                />
              }
            />
          )
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default FooterNavigation;
