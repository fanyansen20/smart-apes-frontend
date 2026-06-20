//Next JS
import Image from "next/image";

//Material UI
import { Box, Grid, Container, Stack, Typography } from "@mui/material";

//Components
import HomePageCarousel from "@components/carousel/HomePageCarousel/HomePageCarousel";

//Images
import planet from "public/assets/images/planet-jup-orange.svg";
import ufo from "public/assets/images/ufo-orange.svg";

// Image our pathner
import berdikari from "public/assets/images/featuredBrand/berdikari.svg";
import bookDeponsitory from "public/assets/images/featuredBrand/book-deponsitory.svg";
import bookBeyond from "public/assets/images/featuredBrand/books-beyond.svg";
import bukaBuku from "public/assets/images/featuredBrand/bukabuku.svg";
import bukuKita from "public/assets/images/featuredBrand/buku-kita.svg";
import goSmart from "public/assets/images/featuredBrand/gob-smart.svg";
import gremedia from "public/assets/images/featuredBrand/gremedia.svg";
import kinokuniya from "public/assets/images/featuredBrand/kinokuniya.svg";
import lotus from "public/assets/images/featuredBrand/lotus.svg";
import mizanstore from "public/assets/images/featuredBrand/mizanstore.svg";
import periplus from "public/assets/images/featuredBrand/periplus.svg";
import togama from "public/assets/images/featuredBrand/togama.svg";

const FeaturedBrand = () => {
  const imageOurPartners = [
    gremedia,
    togama,
    goSmart,
    periplus,
    kinokuniya,
    berdikari,
    mizanstore,
    bukaBuku,
    bookBeyond,
    bukuKita,
    bookDeponsitory,
    lotus,
  ];

  return (
    <Grid className="featuredBrandContainer">
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography className="featuredBrandHeaderTitle">
          Featured Brand
        </Typography>
        <Typography className="featuredBrandHeaderSubTitle">
          Trusted clients who already become our partner
        </Typography>
        <div className="ufoImageFeaturend">
          <Image src={ufo} alt="ufo" layout="fill" />
        </div>
        <div className="planetImageFeaturend">
          <Image src={planet} alt="planet" layout="fill" />
        </div>
      </Stack>

      <Grid className="containerClinetFeaturedBrand">
        {imageOurPartners.map((images, key) => (
          <Box key={key} className="boxFeaturedBrand">
            <div className="imageFeaturedBrand">
              <Image key={key} src={images} layout="fill" alt="client" />
            </div>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default FeaturedBrand;
