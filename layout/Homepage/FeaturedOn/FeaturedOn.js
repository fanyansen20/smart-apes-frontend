//Next JS
import Image from "next/image";

//Material UI
import { Box, Grid, Stack, Typography } from "@mui/material";

//Components
import HomePageCarousel from "@components/carousel/HomePageCarousel/HomePageCarousel";

// Image our pathner
import bbc from "public/assets/images/featuredOn/bbc.svg";
import forbes from "public/assets/images/featuredOn/forbes.svg";
import itv from "public/assets/images/featuredOn/itv.svg";
import rte from "public/assets/images/featuredOn/rte.svg";
import skyNews from "public/assets/images/featuredOn/sky-news.svg";
import theIrsih from "public/assets/images/featuredOn/the-irish-times.svg";
import theTimes from "public/assets/images/featuredOn/the-times.svg";
import yahoo from "public/assets/images/featuredOn/yahoo-news.svg";

const FeaturedOn = () => {
  const imageFeaturedOnTop = [
    theTimes,
    bbc,
    yahoo,
    itv,
    forbes,
    theIrsih,
    skyNews,
    rte,
  ];
  const imageFeaturedOnBottom = [
    forbes,
    theIrsih,
    skyNews,
    rte,
    theTimes,
    bbc,
    yahoo,
    itv,
  ];

  return (
    <Grid className="partnersContainer">
      {/* Top Tutor Header Start */}
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography className="partnersHeaderTitle">Featured On</Typography>
      </Stack>
      {/* Top Tutor Header End */}
      <HomePageCarousel>
        {imageFeaturedOnTop.map((images, key) => (
          <Box className="containerFeaturedOn" key={key}>
            <div className="imageFeaturedOn">
              <Image
                style={{ paddingTop: "10px" }}
                src={images}
                alt="client"
                layout="fill"
              />
            </div>
            <div className="imageFeaturedOn">
              <Image
                style={{ paddingTop: "10px" }}
                src={imageFeaturedOnBottom[key]}
                alt="client"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Box>
        ))}
      </HomePageCarousel>
    </Grid>
  );
};

export default FeaturedOn;
