//React
import { useEffect, useState } from "react";

//Next Auth
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";

//Material UI
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";

// icon MUI
import {
  AccountBalanceWallet,
  FavoriteBorder,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// images
import shieldIcon from "public/assets/images/shield.svg";
import cartIcon from "public/assets/logo/navbarIcon/carts.svg";

// Comp
import MemberBadge from "@components/memberBadge/MemberBadge";

// Helper
import handleRedirectParent from "helper/handleRedirectParent";

const UserMenu = () => {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const quantityCartData = useSelector((store) => store.quantityCart);
  const membershipData = useSelector((store) => store.member);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [quantityCart, setQuantityCart] = useState(0);

  useEffect(() => {
    if (!quantityCartData.isData) {
      dispatch(getQuantityCartData());
    }

    setQuantityCart(quantityCartData.totalQuantity);
  }, [quantityCartData]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const accessToken = "access_token=";
    const refreshToken = "refresh_token=";
    const path = "Path=/";
    const baseDomain = "smartapes.sg";
    const domain = "Domain=" + baseDomain;

    document.cookie = `${accessToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
    document.cookie = `${refreshToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
    const refreshTokenLogOut = {
      refresh_token: session.refreshToken,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "v1/user-auth/logout",
      {
        method: "POST",
        body: JSON.stringify(refreshTokenLogOut),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      signOut({ callbackUrl: "/login" });
    }
  };
  return (
    <div className="menus">
      <Link href="/cart">
        <a>
          <div className="cartDiv">
            <div className="cartImageIcon">
              <Image
                src={cartIcon}
                alt="cart icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="divider"></div>
            {quantityCart === 0 ? (
              ""
            ) : (
              <span className="cartNumber">
                {quantityCart > 99 ? "99+" : quantityCart}
              </span>
            )}
          </div>
        </a>
      </Link>

      <div onClick={handleOpenUserMenu} className="userMenu">
        <Avatar alt="avatar" src={session?.user?.profile_pic} />
        <KeyboardArrowDownIcon className="iconArrowDown" />
      </div>

      {/* modal menu item */}
      <Menu
        className="menu"
        sx={{ mt: "45px", zIndex: 9000 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
      >
        <MenuItem className="userList" disableTouchRipple divider>
          <div className="user">
            {session && (
              <Avatar alt="Remy Sharp" src={session?.user?.profile_pic} />
            )}
            {session && (
              <div className="profile">
                <Typography className="name">
                  {session?.user?.full_name}
                </Typography>
                <Typography className="rank">
                  {membershipData?.status === "ACTIVE" ? "Member" : ""}
                </Typography>
              </div>
            )}
          </div>
        </MenuItem>
        <MenuItem className="menuItem" divider>
          <div className="menuList">
            <Typography
              textAlign="center"
              onClick={() => handleRedirectParent()}
            >
              Go To Parent Dashboard
            </Typography>
            <Login />
          </div>
        </MenuItem>
        <MenuItem
          className="menuItem"
          divider
          onClick={() =>
            handleRedirectParent({ additionalPathRedirect: "profile" })
          }
        >
          <div className="menuList">
            <Person />
            <Typography textAlign="center">My Profile</Typography>
          </div>
        </MenuItem>
        <MenuItem
          className="menuItem"
          onClick={() =>
            handleRedirectParent({
              additionalPathRedirect: "order-list",
            })
          }
          divider
        >
          <div className="menuList">
            <AccountBalanceWallet />
            <Typography textAlign="center">Orders</Typography>
          </div>
        </MenuItem>
        <Link href="/wishlist">
          <a>
            <MenuItem
              className="menuItem"
              divider
              onClick={() => handleCloseUserMenu()}
            >
              <div className="menuList">
                <FavoriteBorder />
                <Typography textAlign="center">Wishlist</Typography>
              </div>
            </MenuItem>
          </a>
        </Link>

        {/* // TODO : not implement yet */}
        {/* <MenuItem className="menuItem" divider>
          <div className="menuList">
            <NotificationsNone />
            <Typography textAlign="center">Notifications</Typography>
          </div>
        </MenuItem> */}
        {/* // TODO : not implement yet */}

        <MenuItem className="menuItem" onClick={handleLogout}>
          <div className="menuList">
            <Logout />
            <Typography textAlign="center">Logout</Typography>
          </div>
        </MenuItem>
      </Menu>

      <div className="memberBtnHome">
        {membershipData?.memberType === "none" ? (
          <Link href="/membership">
            <PrimaryButton>
              <Image src={shieldIcon} alt="member" />
              <p>Upgrade Member</p>
            </PrimaryButton>
          </Link>
        ) : (
          <MemberBadge />
        )}
      </div>
    </div>
  );
};

export default UserMenu;
