import React, { Fragment } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// MUI
import { Container, Divider, Grid, Typography } from "@mui/material";

// Components
import HeaderNavigation from "view/mobile/pages/faq/components/HeaderNavigation";
// import Banner from "../components/Banner";
// import Feedback from "../components/Feedback";

// Helper
import { interpolateString } from "@helper/interpolateString";

// Hooks
// import useToggle from "@hooks/useToggle";

// Styles
// import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import classes from "./_Article.module.scss";

// Assets
// import ThumbDownIcon from "@public/assets/icons/thumb-down.svg";
// import ThumbUpIcon from "@public/assets/icons/thumb-up.svg";

const FaqArticle = ({ faqData }) => {
  const router = useRouter();

  // #region hooks
  // const [open, toggle] = useToggle();
  // const [openBanner, toggleBanner] = useToggle();
  // #endregion

  // #region function
  const goBack = () => {
    router.back();
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation
        title={`${faqData?.categoryOne?.name} FAQ's`}
        goBack={goBack}
      />
      <Container>
        <Grid container className={classes.contentContainer}>
          <Typography className={classes.titleFaq}>
            {faqData?.content?.title}
          </Typography>
          {faqData?.content?.answerContent?.content?.map(
            (content, idxContent) => {
              return (
                <Fragment key={idxContent}>
                  <Typography className={classes.contentTextFaq}>
                    {interpolateString(content?.text, content)}
                  </Typography>
                  {content?.attachments?.map((attachment, idxAttachment) => (
                    <Grid key={idxAttachment} className={classes.image}>
                      <Image
                        src={attachment?.url}
                        height="200px"
                        width="450px"
                        objectFit="contain"
                        alt={content?.text}
                      />
                    </Grid>
                  ))}
                </Fragment>
              );
            }
          )}
          <Divider className={classes.divider} />
          {/* {!open && !openBanner && (
            <Fragment>
              <Typography className={[classes.contentTextFaq, classes.bold]}>
                Is this articles help you?
              </Typography>
              <Grid container gap={1} mb={1}>
                <Grid xs={5.85}>
                  <SecondaryButton
                    fullWidth
                    disableHover
                    text="Yes"
                    color="secondary"
                    startIcon={
                      <Image
                        src={ThumbUpIcon}
                        width={24}
                        height={24}
                        alt="thumb up icon"
                      />
                    }
                    onClick={toggleBanner}
                  />
                </Grid>
                <Grid xs={5.85}>
                  <SecondaryButton
                    fullWidth
                    disableHover
                    text="No"
                    color="secondary"
                    startIcon={
                      <Image src={ThumbDownIcon} alt="thumb down icon" />
                    }
                    onClick={toggle}
                  />
                </Grid>
              </Grid>
            </Fragment>
          )}
          {open && <Feedback toggle={toggle} />}
          {openBanner && <Banner toggle={toggleBanner} />} */}
          <Typography className={[classes.contentTextFaq, classes.bold]}>
            Related Articles
          </Typography>
          {faqData?.content?.answerContent?.relatedArticle?.map(
            (relatedArticle, key) => (
              <Fragment key={key}>
                <Link href={relatedArticle?.path}>
                  <Typography className={`${classes.titleFaq} ${classes.link}`}>
                    {relatedArticle?.title}
                  </Typography>
                </Link>
              </Fragment>
            )
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default FaqArticle;
