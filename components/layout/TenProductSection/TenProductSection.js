// next JS
import Image from "next/image";

//Material UI
import { Grid, Stack, Typography } from "@mui/material";

//Component
import ProductCard from "view/desktop/components/card/ProductCart";
import SkeletonProductCard from "../../../view/desktop/components/skeleton/SkeletonProductCard";

//Images
import HomePageLink from "@components/link/HomePageLink";

const TenProductSection = ({
  isLoadingProduct,
  dataProduct,
  normalTitle,
  colorTitle,
  colorTitleLink,
  imagePlanetRight,
  imagePlanetLeft,
  imagePlanetOrange,
  imageUfoOrange,
  link = "#",
}) => {
  return (
    <div className="containerTenProductSection">
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        sx={{ marginBottom: "20px" }}
      >
        <Typography className="bestSellerHeader">
          {normalTitle}
          <span className="titleCategory">&nbsp;{colorTitle}</span>
        </Typography>
        {colorTitleLink && (
          <HomePageLink link={link} text={`${colorTitleLink}`} />
        )}
      </Stack>

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

      {isLoadingProduct || !dataProduct ? (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ position: "relative" }}
        >
          {[...Array(10)].map((_, index) => (
            <SkeletonProductCard size="large" key={index} />
          ))}
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          gap="10px"
          sx={{ position: "relative" }}
        >
          {dataProduct.map((product) => (
            <ProductCard size="large" key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TenProductSection;
