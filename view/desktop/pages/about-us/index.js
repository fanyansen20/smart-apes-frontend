// Next Js
import Image from "next/image";

// Mui material
import { Chip, Container, Grid, Paper, Typography } from "@mui/material";

// style
import classes from "./_AboutUs.module.scss";

// component
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// constant
import { ServiceList } from "constant/aboutUsConstant";

// icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailLightIcon from "@public/assets/icons/icon-email-light.svg";

// Images
import gramediaIcon from "@public/assets/about-us/gremedia-logo.svg";
import companyOfficeImage from "@public/assets/about-us/grip-principle-office.svg";
import illustrationAboutUs from "@public/assets/about-us/illustration-about-us.svg";
import illustrationMentor from "@public/assets/about-us/illustration-mentor.svg";
import planetYupPlanet from "@public/assets/images/planet-jup-orange.svg";

const LabelButtonPrimary = ({ text }) => {
  return <Chip className={classes.labelButtonPrimary} label={text} />;
};

const AboutUs = () => {
  return (
    <>
      <Container>
        <Grid className={classes.containerHeroBanner}>
          <Grid
            item
            md={5}
            container
            justifyContent="center"
            direction="column"
          >
            <Typography className={classes.titleTextHeroBanner} align="left">
              Empowering <span className={classes.primaryText}>Mind</span>, to
              Create <span className={classes.primaryText}>Better Future!</span>
            </Typography>
            <Typography className={classes.textBody} align="left">
              Welcome to SMART APES, an innovative educational marketplace
              fostering seamless connections between learners and mentors.
            </Typography>
          </Grid>
          <Grid item md={7} className={classes.imageHeroBanner}>
            <Image
              src={illustrationAboutUs}
              layout="fill"
              objectFit="contain"
              alt="illustration about us"
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          gap="10px"
          className={classes.containerPartnersContent}
        >
          <Grid className={classes.yupPlanetBg}>
            <Image
              src={planetYupPlanet}
              alt="icon planet yup"
              objectFit="contain"
            />
          </Grid>
          <Grid>
            <LabelButtonPrimary text="PARTNERS" />
          </Grid>
          <Typography className={classes.titleText} align="center">
            Out Partners
          </Typography>
          <Typography className={classes.textBodyBold}>
            Our collaborative partners are willing to help shape your futures.
          </Typography>
          <Grid container justifyContent="space-evenly" gap="2px">
            {[...Array(4)].map((_, key) => (
              <Grid item md={2.8} key={key}>
                <Paper sx={{ padding: "20px 12px" }}>
                  <Image
                    src={gramediaIcon}
                    alt="Gramedia icon"
                    width={215}
                    height={48}
                    objectFit="contain"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid className={classes.containerReason}>
          <Grid className={classes.contentTextReason}>
            <Grid>
              <LabelButtonPrimary text="WHY SMART APES" />
            </Grid>

            <Typography className={classes.titleText} align="left">
              Unleash Your Potential in Our Diverse Educational Marketplace
            </Typography>
            <Typography className={classes.textBody} align="left">
              Core of our platform is a diverse marketplace full of insights,
              and opportunities to fuel your educational journey. It’s a vast
              platform for especially you, a learner to explore new educational
              journey to found many opportunities on our marketplace.
            </Typography>
          </Grid>
          <Grid>
            <div className={classes.imageCompony}>
              <Image
                src={companyOfficeImage}
                alt="company image"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Grid>
        </Grid>

        <Grid className={classes.containerMentor}>
          <Grid className={classes.imageMentor}>
            <Image src={illustrationMentor} alt="illustration mentor" />
          </Grid>

          <Grid
            container
            gap="10px"
            direction="column"
            justifyContent="center"
            zIndex={1}
          >
            <Grid alignSelf="flex-start">
              <LabelButtonPrimary text="Limitless potential" />
            </Grid>

            <Typography className={classes.titleText} align="left">
              Unveiling Opportunities for Mentor in Our Marketplace
            </Typography>
            <Typography className={classes.textBody} align="left">
              At the heart of our platform lies The Mentor's Marketplace, a
              thriving space filled with opportunities for educators. Bursting
              with courses, insights, and avenues to amplify your influence,
              whether you're an experienced mentor ready to share your knowledge
              and products or a passionate newcomer making your mark. Our
              marketplace is your stage for endless possibilities in the world
              of education.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          gap="10px"
          className={classes.containerPartnersContent}
        >
          <Grid>
            <LabelButtonPrimary text="Benefits" />
          </Grid>
          <Typography className={classes.titleText} align="center">
            Our Services
          </Typography>
          <Grid container justifyContent="space-evenly" gap="2px">
            {ServiceList.map(({ imageUrl, imageAlt, title, subtitle }, key) => (
              <Grid item container direction="column" md={3} key={key}>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <Typography className={classes.textService}>{title}</Typography>
                <Typography>{subtitle}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid className={classes.containerFooterHeroBanner}>
          <Grid className={classes.footerHeroBanner}>
            <Typography>
              Dive in to our Educational Marketplace for a world of knowledge,
              Explore now and spark curiosity!
            </Typography>
            <PrimaryButton text="Explore SMART APES Now" />
          </Grid>
        </Grid>
      </Container>

      <Grid className={classes.footerAboutUs}>
        <Typography className={classes.titleFooter} align="center">
          Find SMART APES on
        </Typography>
        <Grid container justifyContent="center" gap="24px">
          <div className={classes.cardFooter}>
            <PrimaryButton text={<InstagramIcon color="inherit" />} />
          </div>
          <div className={classes.cardFooter}>
            <PrimaryButton text={<FacebookIcon color="inherit" />} />
          </div>
          <div className={classes.cardFooter}>
            <PrimaryButton
              text={
                <Image
                  width={24}
                  height={24}
                  src={EmailLightIcon}
                  alt="email Icon"
                />
              }
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
