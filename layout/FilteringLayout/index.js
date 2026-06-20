// Next
import Image from "next/image";

// Components
import FilterSideBar from "./FilterSideBar/FilterSideBar";

// Images
import SampleBanner from "@public/assets/images/bannerAd.png";

// Mui material
import { Container, Grid } from "@mui/material";

const FilteringLayout = ({ children, ...props }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={2.5}>
          <FilterSideBar {...props} />
        </Grid>
        <Grid item md={9.5}>
          <Image
            src={SampleBanner}
            alt="banner"
            style={{ paddingBottom: "1rem" }}
          />
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilteringLayout;
