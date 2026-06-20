// React
import React, { useEffect, useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Helper
import {
  setIsLoadingSearch,
  setIsReset,
  setPage,
  setSearch,
} from "store/reducer/search/searchSlice";

// MUI Components
import {
  Badge,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuIcon from "@mui/icons-material/Menu";
import IconCart from "@public/assets/icons/cart-mobile.svg";
import SearchIcon from "@public/assets/icons/search-mobile.svg";

// Components
import { handleGeneralSearch } from "@components/input/handleSearchNavigation ";
import { floatingBtnNavigation } from "view/mobile/pages/home/components/floatingButton";
import { menuNavigation } from "../FooterNavigation";
import DrawerSearchBar from "./components/DrawerSearchBar";
import HamburgerDrawer from "./components/HamburgerDrawer";

// Constants
import {
  IS_GENERAL_SEARCH,
  IS_NOT_HAMBURGER,
  PATH_WITH_TITLE,
} from "constant/mobileApp";

// Styles
import classes from "./_NavbarMobile.module.scss";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";

/**
 * @param {{
 * cartQty : number
 * }} props
 * @returns
 */
export const CartIcon = ({ cartQty }) => {
  return (
    <Link href="/cart">
      <a>
        <IconButton>
          <Badge badgeContent={cartQty} color="error">
            <Image src={IconCart} width="26px" height="26px" alt="share" />
          </Badge>
        </IconButton>
      </a>
    </Link>
  );
};

function NavbarMobile() {
  const dispatch = useDispatch();

  const { search, isReset } = useSelector((store) => store.search);

  const [openDrawerSearch, setOpenDrawerSearch] = useState(false);
  const [openHamburgerDrawer, setOpenHamburgerDrawer] = useState(false);

  const { pathname, back, query, push } = useRouter();

  const isGeneralSearch = IS_GENERAL_SEARCH.includes(pathname);

  const dataCart = useSelector((store) => store.quantityCart);

  useEffect(() => {
    if (dataCart.status === "idle") {
      dispatch(getQuantityCartData());
    }
  }, []);

  const { keyword, tab } = query;
  const isSearchPage = pathname.split("/").includes("search");
  const checkIfNeedTitle = PATH_WITH_TITLE.includes(pathname);
  const checkIfNeedCart = PATH_WITH_TITLE.includes(pathname);
  const notNeedHamburger = IS_NOT_HAMBURGER.includes(pathname);

  const checkIfNeedBackBtn = ![...menuNavigation, ...floatingBtnNavigation]
    .map((menu) => menu?.value)
    .includes(pathname.split("/")[1]);

  const drawerHamburger = () => setOpenHamburgerDrawer(!openHamburgerDrawer);

  const handleChangeSearch = () => {
    dispatch(setIsReset(true));
    dispatch(setPage(1));
    dispatch(setIsLoadingSearch(true));
    window.scrollTo(0, 0);
  };

  const handleSubmitSearch = (e) => {
    if (e?.key === "Enter") {
      e.preventDefault();
      handleChangeSearch();
      setOpenDrawerSearch(false);

      if (isGeneralSearch) {
        return handleGeneralSearch(push, search, `&tab=${tab ?? "product"}`);
      }

      // Push Search Keyword into URL Query Params
      if (isSearchPage) {
        push(
          {
            query: {
              ...query,
              keyword: e.target.value,
            },
          },
          undefined,
          { shallow: true }
        ).then(() => dispatch(setSearch(e.target.value)));
      }
    }
  };

  const handleClick = (inputRef) => {
    if (inputRef?.current) {
      inputRef?.current?.click();
    }
  };

  /**
   * @param {import("react").MutableRefObject} inputRef
   */
  const handleClearSearch = (inputRef) => {
    dispatch(setSearch(""));
    handleChangeSearch();

    handleClick(inputRef);

    if (query?.keyword) {
      delete query?.keyword;
      push({ query }), undefined, { shallow: true };
    }
  };

  const backToPrevPage = () => {
    handleClearSearch();
    back();
  };

  useEffect(() => {
    if (keyword && !isReset && !search) {
      dispatch(setSearch(keyword));
    }
  }, [keyword]);

  return (
    <>
      {checkIfNeedTitle && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginX={1}
        >
          <Stack direction="row" alignItems="center" gap="6px" m="11px">
            <IconButton
              className={classes.backIconBtnHeader}
              size="small"
              onClick={() => back()}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Typography fontWeight={600}>
              Your {pathname.split("/")[1]}
            </Typography>
          </Stack>

          {checkIfNeedCart && (
            <CartIcon cartQty={dataCart?.totalQuantity ?? 0} />
          )}
        </Stack>
      )}

      {!checkIfNeedTitle && (
        <Grid
          container
          p={1.5}
          justifyContent="space-around"
          alignItems="center"
          className={classes.searchNavbar}
        >
          {!checkIfNeedTitle && checkIfNeedBackBtn && (
            <Grid item xs={1}>
              <IconButton
                className={classes.backIconBtn}
                size="small"
                onClick={backToPrevPage}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
            </Grid>
          )}

          <Grid item xs={!checkIfNeedTitle && checkIfNeedBackBtn ? 8 : 10}>
            <Paper
              variant="outlined"
              component="form"
              onClick={() => setOpenDrawerSearch(true)}
              className={classes.searchInput}
            >
              <p>{search ? search : "Search product or store"}</p>
              <IconButton type="button" size="small" aria-label="search">
                <Image
                  src={SearchIcon}
                  width="16em"
                  height="16em"
                  alt="search-mobile"
                />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item>
            <CartIcon cartQty={dataCart?.totalQuantity ?? 0} />

            {!notNeedHamburger && (
              <IconButton disableRipple onClick={drawerHamburger}>
                <MenuIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}

      <DrawerSearchBar
        isCategorySearchPage={isSearchPage}
        open={openDrawerSearch}
        isGeneralSearch={isGeneralSearch}
        handleSubmitSearch={handleSubmitSearch}
        handleClearSearch={handleClearSearch}
        onClose={() => setOpenDrawerSearch(false)}
      />

      <HamburgerDrawer open={openHamburgerDrawer} onClose={drawerHamburger} />
    </>
  );
}

export default NavbarMobile;
