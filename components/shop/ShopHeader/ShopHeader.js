import { useEffect, useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// MUI
import { StarRounded } from "@mui/icons-material";
import { Button, Container, Tooltip } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";
import { getDataShop } from "store/reducer/shops/shopDataSlice";

// Assets
import DetailsIcon from "../../../public/assets/icons/document.svg";
import ProfileIcon from "../../../public/assets/icons/profile.svg";
import VerifiedIcon from "../../../public/assets/icons/verified.svg";
// import PaypalImg from "../../../public/assets/images/paypal.png";
import noShopImage from "@public/assets/images/not-shop-image.svg";

// Components
import SkeletonShopHeader from "view/desktop/components/skeleton/SkeletonShopHeader";
import ShopDetailModal from "../ShopDetailModal/ShopDetailModal";

const ShopHeader = () => {
  const dispatch = useDispatch();
  const { pathname, query } = useRouter();

  const shopSlug = query.shop;

  const { dataShop: shopData, isLoading } = useSelector(
    (store) => store.shopData
  );

  useEffect(() => {
    dispatch(
      isLayout({
        slugCategory: `${shopData.slug}/products`,
      })
    );

    if (isLoading || shopData.slug !== shopSlug) {
      dispatch(getDataShop({ shopSlug }));
    }
  }, [shopData, pathname]);

  const [open, setOpen] = useState(false);

  const listTabShop = [
    {
      name: "Home",
      link: `/${shopData.slug}`,
      path: "/[shop]",
    },
    {
      name: "Products",
      link: `/${shopData.slug}/products`,
      path: "/[shop]/products",
    },
    // {
    //   name: "Ratings",
    //   link: `/${shopData.slug}/ratings`,
    //   path: "/[shop]/ratings",
    // },
  ];

  const isActiveTab = (path) => {
    return path === pathname;
  };

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <SkeletonShopHeader />
      ) : (
        <>
          <div className="shopHeader">
            <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
              <div className="shopImage">
                <Image
                  src={shopData?.logo_url ?? noShopImage}
                  alt="shop thumbnail"
                  objectFit="contain"
                  layout="fill"
                />
              </div>

              <div>
                <div className="shopName">
                  <p>{shopData?.name}</p>
                  {shopData?.shop_type !== "Unverified" && (
                    <Image
                      src={VerifiedIcon}
                      alt="verified shop"
                      width="20px"
                      height="20px"
                      objectFit="contain"
                      style={{
                        fill: "green",
                        color: "grey",
                      }}
                    />
                  )}
                </div>
                <div className="containerShopInfo">
                  <div className="shopInfo">
                    <Image
                      src={ProfileIcon}
                      alt="profile"
                      width="18px"
                      height="18px"
                      objectFit="contain"
                    />
                    <p>Joined since {shopData?.memberSince}</p>
                  </div>
                  <div className="shopInfo">
                    <div>
                      {new Array(parseInt(shopData?.ratings_average) || 0)
                        .fill("x")
                        .map((_, index) => (
                          <StarRounded key={index} className="starIcon" />
                        ))}
                      {new Array(5 - parseInt(shopData?.ratings_average) || 0)
                        .fill("x")
                        .map((_, index) => (
                          <StarRounded key={index} className="starIconDark" />
                        ))}
                    </div>
                    <p>
                      {shopData?.ratings_average} (
                      {shopData?.ratings_count_reviews})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="btnGroup">
              {/* // TODO : not implement yet */}
              {/* <Button>
                <Image
                  src={ChatIcon}
                  alt="chat seller"
                  width="18px"
                  height="18px"
                  objectFit="contain"
                />
                <p>Chat Seller</p>
              </Button> */}
              {/* // TODO : END TODO  */}

              <Tooltip
                title="Store Details"
                placement="top"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#fec84b",
                      "& .MuiTooltip-arrow": {
                        color: "#fec84b",
                      },
                    },
                  },
                }}
              >
                <Button onClick={() => setOpen(!open)}>
                  <Image
                    src={DetailsIcon}
                    alt="shop details"
                    width="18px"
                    height="18px"
                    objectFit="contain"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>

          <div className="containerTabsPanel">
            {listTabShop.map((tabShop, key) => (
              <Link key={key} href={tabShop.link}>
                <a>
                  <div
                    className={
                      isActiveTab(tabShop.path) ? "tabPanel_active" : "tabPanel"
                    }
                  >
                    {tabShop.name}
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <ShopDetailModal
            open={open}
            handleClose={() => setOpen(!open)}
            shopName={shopData.name}
            description={shopData.desc}
          />
        </>
      )}
    </Container>
  );
};

export default ShopHeader;
