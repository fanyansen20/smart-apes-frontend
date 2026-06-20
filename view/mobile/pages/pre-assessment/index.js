// React
import React, { useState } from "react";

// Next
import Image from "next/image";

// Mui
import { Avatar, Grid, Typography } from "@mui/material";

// Style
import classes from "./_PreAssessment.module.scss";

// Assets
import previewImage from "@public/assets/pre-assessment/preview-image.svg";

// Constant
import {
  reasonData,
  testimonialData,
  tutorialData,
} from "constant/preAssessment";

// Hooks
import useAnimateAssessmentImage from "@hooks/pre-assessment/useAnimateAssessmentImage";

const PreAssessment = () => {
  const [imageHowTo, setImageHowTo] = useState(tutorialData[0].image.src);
  const [isLoadImage, setIsImageLoad] = useState(false);
  useAnimateAssessmentImage({
    tutorialData,
    setImageHowTo,
    setIsImageLoad,
  });

  /**
   *
   * @param {string} image
   */
  const handlerChangeImageHowTo = (image) => {
    setIsImageLoad((prevState) => !prevState);
    setImageHowTo(image);
    setTimeout(() => {
      setIsImageLoad((prevState) => !prevState);
    }, 300);
  };

  return (
    <Grid container xs={12} p={2} gap={3}>
      <Grid item className={classes.container}>
        <Typography className={classes.pageTitle}>
          Test your children ability with{" "}
          <span className={classes.highlight}>Assessment Test</span> today!
        </Typography>
      </Grid>

      <Grid container gap={3} className={classes.container}>
        <Typography>
          Take our Assessment Test for FREE and Find out your children Ability
          Right Now! Start Creating your Children Account by clicking this
          button
        </Typography>
        <Image src={previewImage} alt="Pre Assessment Preview Image" />
      </Grid>

      <Grid item xs={12} className={classes.container}>
        <Typography className={classes.sectionTitle}>
          Full of Benefit
        </Typography>

        <Typography className={classes.pageTitle}>
          How to Create Children Account ? <br /> And Get Free-Assessment Test?
        </Typography>

        <Grid className={classes.contentHowTo}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className={classes.dashedBorder} />

              <Grid
                container
                wrap="no-wrap"
                direction={"row"}
                className={classes.containerListHowTo}
              >
                {tutorialData.map((tutorial, key) => (
                  <Grid
                    key={key}
                    className={`${classes.containerListNumber} ${
                      imageHowTo == tutorial.image.src && classes.active
                    }`}
                    onClick={() => handlerChangeImageHowTo(tutorial.image.src)}
                  >
                    <div className={classes.circleListContainer}>
                      <div className={classes.borderCircle}>
                        <div className={classes.circleItem}>
                          {tutorial.number}
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>

              {tutorialData.map(
                (tutorial, key) =>
                  imageHowTo == tutorial.image.src && (
                    <Grid key={key}>
                      <Typography className={classes.tutorialSubTitle}>
                        {tutorial.title}
                      </Typography>

                      <Grid item xs={12} my={3}>
                        <div className={classes.containerImageHowTo}>
                          <div
                            className={
                              isLoadImage
                                ? classes.imageTutor
                                : classes.imageTutorAnimate
                            }
                          >
                            <Image
                              src={imageHowTo}
                              layout="fill"
                              objectFit="contain"
                              alt="image tutor"
                            />
                          </div>
                        </div>
                      </Grid>

                      <Typography
                        className={classes.tutorialContent}
                        align="justify"
                      >
                        {tutorial.content}
                      </Typography>
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={12} gap={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>
            Why Smart Apes ?
          </Typography>
        </Grid>

        <Typography className={classes.pageTitle}>
          Why SMART APES giving you Assessment Test for your children?
        </Typography>

        {reasonData?.map((reason, idx) => (
          <Grid
            key={idx}
            container
            xs={12}
            gap={1}
            direction={"row"}
            className={classes.container}
          >
            <Grid item xs={2}>
              <Image
                src={reason?.image}
                alt="note icon image"
                width={"48px"}
                height={"48px"}
              />
            </Grid>

            <Grid item xs={9}>
              <Typography className={classes.pageSubTitle}>
                {`${reason?.title1} ${reason?.title2}`}
              </Typography>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={9}>
              <Typography className={classes.paragraph}>
                {reason?.content}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid container xs={12} gap={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.sectionTitle}>Testimonial</Typography>
        </Grid>

        <Typography className={classes.pageTitle}>
          What our Customers Said about SMART APES?
        </Typography>

        <div className={classes.testimonialContainer}>
          {testimonialData?.map((testimony, idx) => (
            <Grid
              key={idx}
              container
              direction={"row"}
              xs={12}
              className={classes.testimonialBox}
            >
              <Grid container xs={12} mb={2}>
                <Grid item xs={2}>
                  <Avatar
                    src={testimony?.imageProfile}
                    alt="Testimony icon image"
                    sx={{ width: 48, height: 48 }}
                  />
                </Grid>

                <Grid item xs={9}>
                  <Typography className={classes.pageSubTitle}>
                    {`${testimony?.title1} ${testimony?.title2}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.paragraph}>
                  {testimony?.content}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default PreAssessment;
