// Next Js
import Image from "next/image";

// Material UI
import { Grid, Skeleton, Stack, Typography } from "@mui/material";

// Component
import HomePageLink from "@components/link/HomePageLink";
import IllustrationPage from "@components/shared/IllustrationPage";
import ProductCard from "view/desktop/components/card/ProductCart";
import SkeletonProductCard from "../../../view/desktop/components/skeleton/SkeletonProductCard";

// Images
import landscapeBanner from "@public/assets/images/bannerPromotions/landscape-banner.svg";
import noRelatedProduct from "@public/assets/images/no-related-product.svg";

const BestSellerProduct = ({
  isLoadProduct,
  dataProduct,
  normalTitle,
  colorTitle,
  colorTitleLink,
  imagePlanetRight,
  imagePlanetLeft,
  imagePlanetOrange,
  imageUfoOrange,
  linkGoToPage,
}) => {
  return (
    <Grid className="containerBestSellerProduct">
      {dataProduct?.length !== 0 && (
        <>
          {/* image planet right */}
          {imagePlanetRight && (
            <div className="imagePlanetRight">
              <Image src={imagePlanetRight} alt="bigPlanet" layout="fill" />
            </div>
          )}

          {/* image planet left */}
          {imagePlanetLeft && (
            <div className="imagePlanetLeft">
              <Image src={imagePlanetLeft} alt="bigPlanet" layout="fill" />
            </div>
          )}
          {imagePlanetOrange && (
            <div className="imagePlanetBg">
              <Image src={imagePlanetOrange} alt="bigPlanet" layout="fill" />
            </div>
          )}
          {imageUfoOrange && (
            <div className="ufoImageBG">
              <Image src={imageUfoOrange} alt="bigPlanet" layout="fill" />
            </div>
          )}
        </>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        sx={{ marginBottom: "20px" }}
      >
        <>
          <Typography className="bestSellerHeader">
            {normalTitle}
            <span className="titleCategory">&nbsp;{colorTitle}</span>
          </Typography>
          {dataProduct?.length !== 0 && (
            <HomePageLink link={linkGoToPage} text={`${colorTitleLink}`} />
          )}
        </>
        {/* )} */}
      </Stack>

      <Grid className="containerCardBestSellerEducationMaterial">
        {isLoadProduct ? (
          <>
            <div className="rows-two-item">
              <Skeleton height="100%" />
            </div>
            {[...new Array(8)].map((_, key) => (
              <div key={key}>
                <SkeletonProductCard size="large" />
              </div>
            ))}
          </>
        ) : (
          dataProduct?.length !== 0 && (
            <>
              <div className="rows-two-item">
                <Image src={landscapeBanner} alt="landscape banner" />
              </div>
              {dataProduct?.map((product, key) => (
                <ProductCard size="large" product={product} key={key} />
              ))}
            </>
          )
        )}
      </Grid>

      {dataProduct?.length === 0 && !isLoadProduct && (
        <IllustrationPage
          illustrationImage={noRelatedProduct}
          titleIllustration="No Product At the moment"
          contentIllustration="Product will coming soon"
        />
      )}
    </Grid>
  );
};

export default BestSellerProduct;
