import React from "react";

// MUI
import { Container, Grid } from "@mui/material";

// Components
import BenefitSection from "./components/BenefitSection";
import DescriptionSection from "./components/DescriptionSection";
import FooterSection from "./components/FooterSection";
import HeaderSection from "./components/HeaderSection";
import PartnerSection from "./components/PartnerSection";

// Styles
import classes from "./_AboutUs.module.scss";

// Constant
import { DescriptionList } from "../../../../constant/aboutUsConstant";

const AboutUs = () => {
  return (
    <Grid className={classes.borderBottom}>
      <Container>
        <Grid
          container
          gap={2}
          className={classes.container}
          flexDirection="column"
          alignItems="center"
        >
          {/* About Us Header Section */}
          <HeaderSection />
          {/* Partners */}
          <PartnerSection />
          {/* Description */}
          {DescriptionList.map((data, index) => (
            <DescriptionSection key={index} {...data} />
          ))}
          {/* Benefits */}
          <BenefitSection />
        </Grid>
      </Container>
      {/* Explore and Social Media Section */}
      <FooterSection />
    </Grid>
  );
};

export default AboutUs;
