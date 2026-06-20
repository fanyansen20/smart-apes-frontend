//React
import { useState } from "react";

//Next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//Next Auth
import { useSession } from "next-auth/react";

//Material UI
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";

//Components
import LoginRegisterButton from "./LoginRegisterButton/LoginRegisterButton";
import NavigationCategories from "./NavigationCategories/NavigationCategories";
import UserMenu from "./UserMenu/UserMenu";

// Images
import LogoBrand from "public/assets/logo/navbarIcon/smart-apes-logo.svg";

// Components
import SearchInput from "@components/input/SearchInput";
import {
  isCategoryPage,
  isHeaderCheckout,
  needLogoOnly,
} from "helper/checkUrlPage";

const LowerNavigation = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();

  const [setAnchorElNav] = useState(null);
  const [isOpenMenuCategory, setIsOpenMenuCategory] = useState(false);

  const isLogin = session && status === "authenticated";
  const isPlaceholderCategory = isCategoryPage(pathname)
    ? "Search product"
    : "Search product / Store";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handlerMenuCategory = () => {
    setIsOpenMenuCategory(!isOpenMenuCategory);
  };

  const handlerCloseMenuCategory = () => {
    setIsOpenMenuCategory(false);
  };

  return (
    <>
      <div className="navBar">
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid md={1.5} item>
              <Link href="/">
                <a>
                  <Image
                    src={LogoBrand}
                    alt="LogoBrand"
                    width="155px"
                    height="45px"
                  />
                </a>
              </Link>
            </Grid>

            {isLogin && isHeaderCheckout(pathname) && (
              <Grid item md={10.5}>
                <div className="avatarHeader">
                  <Tooltip title={session?.user?.full_name} arrow>
                    <Avatar
                      alt={session?.user?.full_name}
                      src={session?.user?.profile_pic}
                    />
                  </Tooltip>
                </div>
              </Grid>
            )}

            {!needLogoOnly(pathname) && (
              <>
                {/* Desktop Display Start */}
                <Grid
                  item
                  md={isLogin ? 7 : 8.5}
                  container
                  alignItems="center"
                  className="desktopNav"
                >
                  <Grid item md={2.5}>
                    <Button
                      className="categoryButton"
                      onClick={handlerMenuCategory}
                    >
                      <MenuIcon fontSize="small" sx={{ marginRight: "10px" }} />

                      <Typography className="categoryTitle">
                        Categories
                      </Typography>
                    </Button>
                  </Grid>

                  <Grid item md={9.5}>
                    <SearchInput
                      closeModalCategory={handlerCloseMenuCategory}
                      placeholder={isPlaceholderCategory}
                      // placeholder="Search product / store "
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="flex-end"
                  item
                  md={isLogin ? 3.5 : 2}
                >
                  {status === "loading" ? (
                    <Skeleton width="100%" height="40px" />
                  ) : (
                    <>
                      {!isLogin && <LoginRegisterButton />}

                      {isLogin && (
                        <div onMouseEnter={handlerCloseMenuCategory}>
                          <UserMenu />
                        </div>
                      )}
                    </>
                  )}
                </Grid>
                {/* Desktop Display End */}

                {/* Mobile Display Start */}
                <div className="mobileNav">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    className="mobileCategoryButton"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                {/* Mobile Display End */}
              </>
            )}
          </Grid>
        </Container>
      </div>
      <Divider />
      <Drawer
        anchor="top"
        open={isOpenMenuCategory}
        className="drawerMenuCategory"
      >
        <NavigationCategories closeModalCategory={handlerCloseMenuCategory} />
      </Drawer>
    </>
  );
};

export default LowerNavigation;
