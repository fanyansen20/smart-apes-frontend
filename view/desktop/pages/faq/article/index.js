import { interpolateString } from "@helper/interpolateString";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

// mui material
import { Breadcrumbs, Grid, Typography } from "@mui/material";

// icon
import { Home } from "@mui/icons-material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// images
import thumbDown from "@public/assets/icons/thumb-down.svg";
import thumbUp from "@public/assets/icons/thumb-up.svg";

// style
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import classes from "./_DetailArticle.module.scss";

const DetailArticle = ({ faqData }) => {
  return (
    <>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />}>
        <Grid container alignItems="center">
          <Home sx={{ color: "inherit" }} />
        </Grid>

        <Link
          href={`/faq?cat=${faqData?.categoryOne?.pathSlug}&subCat=${faqData?.categoryTwo?.pathSlug}`}
        >
          <a>
            <Typography className={classes.titleBreadcrumb}>
              {faqData?.categoryOne?.name}
            </Typography>
          </a>
        </Link>
        <Typography className={classes.titleBreadcrumb}>
          {faqData?.categoryTwo?.name}
        </Typography>
      </Breadcrumbs>
      <Grid className={classes.contentContainer}>
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
                  <Image
                    key={idxAttachment}
                    src={attachment?.url}
                    height="200px"
                    width="450px"
                    objectFit="contain"
                    alt={content?.text}
                  />
                ))}
              </Fragment>
            );
          }
        )}

        {/* <div className={classes.statusContent}>
          <Typography>Lorem ipsum dolor siamet jamet consectuor.</Typography>
        </div> */}

        <div className={classes.divider} />

        <Typography className={classes.contentTextFaq}>
          Is this article help you?
        </Typography>

        <Grid container gap="8px">
          <Grid item md={1.4}>
            <SecondaryButton
              fullWidth
              text="Yes"
              color="secondary"
              startIcon={
                <Image
                  src={thumbUp}
                  width={24}
                  height={24}
                  alt="thumb up icon"
                />
              }
            />
          </Grid>
          <Grid item md={1.4}>
            <SecondaryButton
              fullWidth
              text="No"
              color="secondary"
              startIcon={<Image src={thumbDown} alt="thumb down icon" />}
            />
          </Grid>
        </Grid>

        <div className={classes.divider} />

        <Typography className={classes.contentTextFaq}>
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
    </>
  );
};

export default DetailArticle;
