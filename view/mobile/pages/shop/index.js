// Next
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// MUI
import { Stack, IconButton, Tabs, Tab, Box } from "@mui/material";

// Styles
import classes from "./shop.module.scss";

// Comp
import ShopHomeMobile from "./components/ShopHomeMobile";
import ShopProductMobile from "./components/ShopProductMobile";
import ShopRatingsMobile from "./components/ShopRatingsMobile";

// Assets
import DocumentIcon from "@public/assets/icons/document.svg";
import ChatIcon from "@public/assets/icons/chat-outlined.svg";
import HomeIcon from "@public/assets/icons/home-fill.svg";
import BoxIcon from "@public/assets/icons/box.svg";
import StarIcon from "@public/assets/icons/star-half.svg";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function Shop({ shopData, shopProducts, shopRatings, slugShop, querySearch }) {
  const router = useRouter();
  const [querySearchProduct, setQuerySearchProduct] = useState(querySearch);
  const [tabsIndex, setTabsIndex] = useState(querySearch ? 1 : 0);

  // Handle change tab
  const handleChangeTab = (_, newTabsIndex) => {
    setTabsIndex(newTabsIndex);
    setQuerySearchProduct(false);
    if (querySearchProduct) {
      router.push(`/${slugShop}`);
    }
  };

  return (
    <div>
      <Stack className={classes.container} spacing={1}>
        <section className={classes.shopInfo}>
          <div className={classes.shopName}>
            <Image
              src={shopData?.logo_url}
              width="32px"
              height="32px"
              alt={shopData?.name}
            />
            <div>
              <h1>{shopData?.name}</h1>
              <p>{shopData?.country_id}</p>
            </div>
          </div>
          <div>
            <IconButton>
              <Image
                src={DocumentIcon}
                width="12px"
                height="12px"
                alt="shop description"
              />
            </IconButton>
            <IconButton>
              <Image
                src={ChatIcon}
                width="12px"
                height="12px"
                alt="shop description"
              />
            </IconButton>
          </div>
        </section>
        <section>
          <Tabs
            value={tabsIndex}
            onChange={handleChangeTab}
            variant="fullWidth"
            TabIndicatorProps={{
              style: { background: "#7e54f1", color: "#7e54f1" },
            }}
          >
            <Tab
              onClick={() => setQuerySearchProduct(false)}
              icon={
                <Image
                  src={HomeIcon}
                  width="24px"
                  height="24px"
                  alt="products"
                  className="tabIcon"
                />
              }
              aria-label="Home"
            />
            <Tab
              onClick={() => setQuerySearchProduct(false)}
              icon={
                <Image
                  src={BoxIcon}
                  width="24px"
                  height="24px"
                  alt="products"
                  className="tabIcon"
                />
              }
              aria-label="Products"
            />
            <Tab
              onClick={() => setQuerySearchProduct(false)}
              icon={
                <Image
                  src={StarIcon}
                  width="24px"
                  height="24px"
                  alt="products"
                  className="tabIcon"
                />
              }
              aria-label="Rating"
            />
          </Tabs>
        </section>
        <section>
          <TabPanel value={tabsIndex} index={0}>
            <ShopHomeMobile shopData={shopData} shopProducts={shopProducts} />
          </TabPanel>
          <TabPanel value={tabsIndex} index={1}>
            <ShopProductMobile
              shopId={shopData.id}
              bannerImg={shopData.banner_url}
              querySearch={querySearchProduct}
            />
          </TabPanel>
          <TabPanel value={tabsIndex} index={2}>
            <ShopRatingsMobile shopId={shopData.id} />
          </TabPanel>
        </section>
      </Stack>
    </div>
  );
}

export default Shop;
