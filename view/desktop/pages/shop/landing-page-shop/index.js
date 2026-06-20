// React
import Image from "next/image";
import { memo } from "react";

// Import css
import classes from "./_ShopLandingPage.module.scss";

// Helper
import { htmlParser } from "@helper/htmlParser";

// MUI
import { Container } from "@mui/material";

// Image
import planetOrange from "@public/assets/images/planet-jup-orange.svg";
import bigPlanetRight from "@public/assets/images/planet.png";
import ufoOrange from "@public/assets/images/ufo-orange.svg";
import NoProductIllustration from "public/assets/images/illustration-no-product.svg";

// Components
import TenProductSection from "@components/layout/TenProductSection/TenProductSection";
import ShopBundleContainer from "./components/shopBundleSection";

const LandingPageShop = ({ shopData, shopProducts, resultsDataBundle }) => {
  const { isBundle, dataBundles } = resultsDataBundle;

  return (
    <div className={classes.shopHomeContainer}>
      <Container maxWidth="lg">
        {shopData?.banner_url && (
          <div className={classes.bannerContainer}>
            <Image
              src={shopData.banner_url}
              height="200px"
              width="1000px"
              objectFit="contain"
              layout="responsive"
              alt="shop banner"
              style={{ borderRadius: "5px" }}
            />
          </div>
        )}

        {isBundle && <ShopBundleContainer dataBundles={dataBundles} />}

        {shopData?.is_show_featured_products && (
          <section>
            <TenProductSection
              dataProduct={shopProducts?.featuredProducts?.results}
              normalTitle="Featured Products"
              imagePlanetOrange={
                shopProducts?.featuredProducts?.results?.length
                  ? planetOrange
                  : ""
              }
              imageUfoOrange={
                shopProducts?.featuredProducts?.results?.length ? ufoOrange : ""
              }
            />
          </section>
        )}
      </Container>
      {shopData?.is_show_featured_products && (
        <div className={classes.separator}></div>
      )}
      <Container maxWidth="lg">
        {shopProducts?.allProducts?.results?.length === 0 ? (
          <div className={classes.noProductStore}>
            <Image
              src={NoProductIllustration}
              alt="no products available"
              height="70px"
              layout="responsive"
            />
            <h3>No Product</h3>
            <h5>
              Currently no products available. please come back another time
            </h5>
          </div>
        ) : (
          <section>
            <TenProductSection
              dataProduct={shopProducts?.allProducts?.results}
              normalTitle="Best Seller"
              colorTitleLink="See All"
              imagePlanetRight={
                shopProducts?.allProducts?.results ? bigPlanetRight : ""
              }
              link={`/${shopData.slug}/products`}
            />
          </section>
        )}
      </Container>
      <div className={classes.aboutSeparator}></div>
      <Container maxWidth="lg">
        <section className={classes.aboutStore}>
          <h3>About {shopData.name}</h3>
          <div className={classes.storeDescription}>
            {shopData?.desc && htmlParser(shopData.desc)}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default memo(LandingPageShop);
