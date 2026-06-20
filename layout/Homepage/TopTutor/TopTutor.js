//Next JS
import Image from "next/image";

//Material UI
import { Container, Stack, Typography, Grid } from "@mui/material";

//Components
import TopTutorDetails from "./TopTutorDetails/TopTutorDetails";
import TopTutorOrbit from "./TopTutorOrbit/TopTutorOrbit";
import SearchInput from "@components/input/SearchInput";
import HomePageLink from "@components/link/HomePageLink";

//Images
import dots from "@public/assets/images/dots.svg";
import planet from "@public/assets/images/planet.svg";
import ufo from "@public/assets/images/ufo.svg";

const TopTutor = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundImage: `url(${dots.src})` }}
      className="topTutorContainer"
    >
      {/* Top Tutor Header Start */}
      <Stack spacing={1} className="topTutorHeader">
        <Typography className="topTutorHeaderTitle">Top Tutors</Typography>
        <Typography className="topTutorHeaderText">
          Best Tutors, who already competent to guide you .
        </Typography>
        <Grid sx={{ width: "497px" }}>
          <SearchInput placeholder="Search Tutor" />
        </Grid>
        <HomePageLink text="See more Top Tutors" />
        <div className="planet">
          <Image src={planet} alt="planet" />
        </div>
        <div className="ufo">
          <Image src={ufo} alt="ufo" />
        </div>
      </Stack>
      {/* Top Tutor Header End */}

      {/* Top Tutor */}
      <Grid container className="topTutorDetailsContainer">
        <TopTutorDetails />
        <TopTutorOrbit />
      </Grid>
      {/* Tor Tutor End */}
    </Container>
  );
};

export default TopTutor;
