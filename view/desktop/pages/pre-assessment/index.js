// React
import { memo, useEffect, useState } from "react";

// NextJS
import { useSession } from "next-auth/react";
import Image from "next/image";

// Material UI
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

// Images
import planetOrange from "public/assets/images/planet-jup-orange.svg";
import planet from "public/assets/images/preAssessment/3-planet-assessment.svg";
import backTick from "public/assets/images/preAssessment/back-tick-icon.svg";
import bannerPreAssessment from "public/assets/images/preAssessment/banner-pre-assessment.svg";
import DotBackground from "public/assets/images/preAssessment/dot-background-assessment.svg";
import paperPlane from "public/assets/images/preAssessment/paper-plane.svg";

// components
import Footer from "@components/footer/Footer";

// redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

// Hooks
import useAnimateAssessmentImage from "@hooks/pre-assessment/useAnimateAssessmentImage";

// Constant
import {
  reasonData,
  testimonialData,
  tutorialData,
} from "constant/preAssessment";

const PreAssessment = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [imageHowTo, setImageHowTo] = useState(tutorialData[0].image.src);
  const [isLoadImage, setIsImageLoad] = useState(false);
  useAnimateAssessmentImage({
    tutorialData,
    setImageHowTo,
    setIsImageLoad,
  });

  useEffect(() => {
    dispatch(isLayout({ isFooter: false }));
  }, []);

  const handlerChangeImageHowTo = (image) => {
    setIsImageLoad((prevState) => !prevState);
    setImageHowTo(image);
    setTimeout(() => {
      setIsImageLoad((prevState) => !prevState);
    }, 300);
  };

  const handleRedirectParent = async () => {
    const accessToken =
      "access_token=" + encodeURIComponent(session.accessToken);
    const refreshToken =
      "refresh_token=" + encodeURIComponent(session.refreshToken);
    const parentId = "parent_id=" + encodeURIComponent(session.user.id);
    const openChildrenModal = "open_modal_children=true";
    const path = "Path=/";
    const baseDomain = "smartapes.sg";
    const domain = "Domain=" + baseDomain;

    document.cookie = `${accessToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
    document.cookie = `${refreshToken}; SameSite=Lax; Secure; ${path}; ${domain}`;
    document.cookie = `${parentId}; SameSite=Lax; Secure; ${path}; ${domain}`;
    document.cookie = `${parentId}; SameSite=Lax; Secure; ${path}; ${domain}`;
    document.cookie = `${openChildrenModal}; SameSite=Lax; Secure; ${path}; ${domain}`;
    window.location = process.env.NEXT_PUBLIC_PARENT_URL;
  };

  return (
    <div className="containerPreAssessment">
      <Image
        src={DotBackground}
        layout="fill"
        objectFit="contain"
        alt="dot background"
      />
      <Container maxWidth="lg">
        <Grid className="heroSection">
          {/* image float/background */}
          <div className="containerPlanetOrangeImage">
            <Image
              src={planetOrange}
              layout="fill"
              objectFit="contain"
              alt="planet"
            />
          </div>

          <div className="containerThreePlanetImage">
            <Image
              src={planet}
              layout="fill"
              objectFit="contain"
              alt="planet"
            />
          </div>

          <div className="containerPaperPlaneImage">
            <Image
              src={paperPlane}
              layout="fill"
              objectFit="contain"
              alt="planet"
            />
          </div>

          <Grid className="textContent">
            <div>
              <Typography variant="h3">
                Test your children ability with{" "}
              </Typography>
              <Typography variant="h3" className="warningText">
                <span className="warningText">Assessment Test</span> today!
              </Typography>
            </div>

            <div className="subTitle">
              <Typography>
                Take our Assessment Test for FREE and Find out your children
                Ability Right Now!
              </Typography>
              <Typography>
                Start Creating your Children Account by clicking this button
              </Typography>
            </div>
          </Grid>
          <Grid className="heroImage">
            <Image
              src={bannerPreAssessment}
              alt="banner image"
              layout="fill"
              objectFit="contain"
            />
          </Grid>
        </Grid>
        <Grid className="accountSection">
          <Grid className="headerTitleSection">
            <Typography variant="h5">
              How to Create Children Account ?
            </Typography>
            <Typography variant="h5">And Get Free-Assessment Test?</Typography>
          </Grid>
          <Grid className="contentHowTo">
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={5}>
                <div className="dashedBorder"></div>
                {tutorialData.map((tutorData, key) => (
                  <Grid
                    key={key}
                    container
                    wrap="no-wrap"
                    className={
                      imageHowTo == tutorData.image.src
                        ? "containerListHowToActive"
                        : "containerListHowTo"
                    }
                    onClick={() => handlerChangeImageHowTo(tutorData.image.src)}
                  >
                    <Grid className="containerListNumber">
                      <div className="circleListContainer">
                        <div className="borderCircle">
                          <div className="circleItem">{tutorData.number}</div>
                        </div>
                      </div>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2">
                        {tutorData.title}
                      </Typography>
                      <Typography variant="body2" align="justify">
                        {tutorData.content}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={7}>
                <div className="containerImageHowTo">
                  <div
                    className={isLoadImage ? "imageTutor" : "imageTutorAnimate"}
                  >
                    {/* <Fade in={isLoadImage}> */}
                    <Image
                      src={imageHowTo}
                      layout="fill"
                      objectFit="contain"
                      alt="image tutor"
                    />
                    {/* </Fade> */}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="buttonHowTo">
          {status == "authenticated" ? (
            <Button onClick={handleRedirectParent}>
              Go to Parent Dashboard
            </Button>
          ) : (
            <Button href="/register ">Create an Account</Button>
          )}
        </Grid>

        <Grid className="reasonContent">
          <Grid className="headerTitleReason">
            <Typography variant="subtitle1">WHY SMART APES?</Typography>
            <Typography variant="h6">Why SMART APES giving you</Typography>
            <Typography variant="h6">
              Assessment Test for your children?
            </Typography>
          </Grid>
          <Grid container>
            {reasonData.map((reasonData, key) => (
              <Grid key={key} item md={4}>
                <Grid container direction="column">
                  <div className="imageContent">
                    <Image
                      src={reasonData.image}
                      layout="fill"
                      objectFit="contain"
                      alt="testimonial icon"
                    />
                  </div>
                  <Typography variant="subtitle2">
                    {reasonData.title1}
                  </Typography>
                  <Typography variant="subtitle2">
                    {reasonData.title2}
                  </Typography>
                  <Typography variant="body2">{reasonData.content}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid className="testimonialContent">
          <Grid className="headerTitleTestimonial">
            <Typography variant="subtitle1">TESTIMONIAL</Typography>
            <Typography variant="h6">What our Customers Said</Typography>
            <Typography variant="h6">about SMART APES?</Typography>
            <div className="boxBackground"></div>
          </Grid>
          <Grid container spacing={2}>
            {testimonialData.map((testimonialData, key) => (
              <Grid key={key} item md={4}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <Image
                          src={testimonialData.imageProfile}
                          alt="image profile"
                          layout="fill"
                          objectFit="contain"
                        />
                      </Avatar>
                    }
                  />
                  <CardContent>
                    <Typography variant="subtitle2">
                      {testimonialData.title1}
                    </Typography>
                    <div className="backTickIcon">
                      <Image
                        alt="backtick image"
                        src={backTick}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <Typography variant="subtitle2">
                      {testimonialData.title2}
                    </Typography>
                    <Typography variant="body2">
                      {testimonialData.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default memo(PreAssessment);
