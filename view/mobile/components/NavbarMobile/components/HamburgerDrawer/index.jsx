import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

// assets
import classes from "./_HamburgerDrawer.module.scss";

// MUI Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// const
import {
  menuNavigation,
  urlGoToParent,
} from "view/mobile/components/FooterNavigation";

// components
import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";

// hooks
import useLoginCallback from "@hooks/useLoginCallback";

/**
 *
 * @param {{
 * open : boolean
 * onClose : () => void
 * }} param0
 * @returns
 */

const HamburgerDrawer = ({ open, onClose }) => {
  const { push } = useRouter();
  const handleLoginCallback = useLoginCallback();

  const { status } = useSession();

  const isLogin = status === "authenticated";

  const changeBottomNavigation = (value) => {
    onClose();
    const isParentUrl = value === "orders" || value === "profile";
    const callbackUrl = isParentUrl
      ? decodeURIComponent(`/?parent-url=${value}`)
      : value;

    if (!value) return push(`/`);

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
    <Drawer open={open} onClose={onClose} anchor="right">
      <div className={classes.containerHamburgerDrawer}>
        <Grid container direction="column" alignItems="start" gap={2}>
          <List className={classes.listContainer}>
            <ListItem disablePadding className={classes.titleDrawer}>
              <ListItemButton disableRipple onClick={onClose}>
                <ListItemIcon>
                  <ArrowBackIosIcon />
                </ListItemIcon>
                <p>Menu</p>
              </ListItemButton>
            </ListItem>

            {menuNavigation.map((item, key) => (
              <ListItem
                key={key}
                disablePadding
                className={[
                  classes.subContent,
                  key !== 0 && classes.showBorder,
                ]}
              >
                <ListItemButton
                  disableRipple
                  onClick={() => changeBottomNavigation(item.value)}
                >
                  <ListItemIcon>
                    <Image
                      src={item.iconSrc}
                      width={24}
                      height={24}
                      alt="navigation-icon"
                    />
                  </ListItemIcon>
                  <p> {item.label}</p>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </div>
    </Drawer>
  );
};

export default HamburgerDrawer;
