// React
import React, { Fragment } from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";

// MUI Components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// Icons
import Check from "view/mobile/assets/icons/check.svg";

// Images
import AccurateResult from "@public/assets/images/accurate-result.svg";
import ChildrenInfo from "@public/assets/images/children-info.svg";
import ChildrenNeeds from "@public/assets/images/children-needs.svg";
import GripLearning from "@public/assets/images/grip-learning-description.svg";
import ImproveResult from "@public/assets/images/improve-result.svg";
import LearnerProfile from "@public/assets/images/learner-profile.svg";
import PersonalityTest from "@public/assets/images/personality-test.svg";
import ProfilingTestIllustration from "@public/assets/images/profiling-test-illustration.svg";
import PurchaseProfiling from "@public/assets/images/purchase-profiling-test.svg";
import SmartapesGripCollabs from "@public/assets/images/smartapes-grip-collabs.svg";
import TakeProfilingTest from "@public/assets/images/take-profiling-test.svg";

// Styles
import classes from "./ProfilingTest.module.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

/**
 * Description placeholder
 *
 * @param {string} featureList
 * @param {import("@mui/material").SxProps<import("@mui/material").Theme>} [iconStyleProps={}]
 * @returns {JSX.Element}
 */
export const pricingPlanFeatureList = (featureList, iconStyleProps = {}) => (
  <Stack direction="row" gap={1} alignItems="center">
    <Avatar
      sx={{ width: 19.76, height: 19.76, ...iconStyleProps }}
      src={Check.src}
      alt="Check"
    />
    <Typography className={classes.pricingPlanFeatureList}>
      {featureList}
    </Typography>
  </Stack>
);

/**
 * Description placeholder
 *
 * @param {string} title
 * @param {string} description
 * @returns {JSX.Element}
 */
const headerSection = (title, description) => (
  <>
    <Typography className={classes.sectionTitle}>{title}</Typography>
    <Typography className={classes.sectionDesc}>{description}</Typography>
  </>
);

/**
 * Description placeholder
 *
 * @returns {JSX.Element}
 */
const ProfilingTest = () => {
  const router = useRouter();

  // #region redux state
  const { dataProduct } = useSelector((state) => state.getTestProduct);
  // #endregion

  // #region function
  /**
   *
   * @param {string} url
   */
  const navigateToCheckoutProfilingTest = (url) => {
    router.push(url);
  };

  const navigateToAssignTest = () => {
    router.push("/profiling-test/assign");
  };
  // #endregion

  return (
    <Stack direction="column" spacing={4} pb={10} px={2}>
      {/* Hero Banner */}
      <Stack direction="column" gap={1}>
        {/* Title and Explanation */}
        <Stack direction="column" spacing={2}>
          <Typography className={classes.mainHeader}>
            Know your children&apos;s personality Better with
            <span className={classes.primaryText}> Profiling Test</span>
          </Typography>
          <Typography className={classes.sectionInfo}>
            Understand how your child learns and discover strategies to maximize
            their learning potential, abilities, and effectiveness, achieving
            true mastery in learning.
          </Typography>
        </Stack>

        {/* Illustration */}
        <Image src={ProfilingTestIllustration} alt="Profiling Test" />
      </Stack>

      {/* Smart Apes x Grip Learning */}
      <Stack direction="column" gap={2}>
        {/* Title */}
        <Stack direction="column" spacing={2}>
          {headerSection(
            "SMART APES x GRIP LEARNING",
            "Purchase and enhance your children's learning, all-in-one place"
          )}
        </Stack>

        {/* Collabs Illustration */}
        <Image src={SmartapesGripCollabs} alt="Smartapes Grip" />

        {/* Info List */}
        <Stack
          direction="row"
          gap={1}
          className={`${classes.sectionInfo} ${classes.childrenInfo}`}
        >
          <Image layout="fill" src={ChildrenInfo} alt="Smartapes Grip Info 1" />
          <span>
            Explore integrated approaches for unlocking your child&apos;s
            potential, along with a convenient platform where you can acquire
            the essentials to foster their development.
          </span>
        </Stack>

        {/* Info List */}
        <Stack
          direction="row"
          gap={1}
          className={`${classes.sectionInfo} ${classes.childrenNeeds}`}
        >
          <Image
            layout="fill"
            src={ChildrenNeeds}
            alt="Smartapes Grip Info 2"
          />
          <span>
            Get various children&apos;s needs in just one place, where you can
            shop seamlessly without any hassle
          </span>
        </Stack>
      </Stack>

      {/* What is Grip Learning */}
      <Stack direction="column" gap={2}>
        {/* Heading */}
        {headerSection(
          "WHAT IS GRIP LEARNING",
          "The GRIP Learning Profile™ helps children find their preferred learning styles."
        )}

        {/* Grip Illustration */}
        <Image src={GripLearning} alt="Smartapes Grip" />

        {/* Description */}
        <Typography className={classes.sectionInfo}>
          Helps children find their preferred learning styles. Learning styles
          are how children like to learn, process information, and respond to
          different ways of teaching. The profile is created through extensive
          research on the factors that affect how we think and behave when
          learning.
        </Typography>
      </Stack>

      {/* WHY GRIP LEARNING */}
      <Stack direction="column" gap={2}>
        {/* Heading */}
        {headerSection(
          "WHY GRIP LEARNING",
          "Why you should take profiling test"
        )}

        {/* Reason List */}
        <Grid container justifyContent="space-evenly">
          <Grid item xs={3}>
            <Image src={PersonalityTest} alt="Free Basic Personality Test" />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography className={classes.sectionList}>
              Free Basic Personality Test
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Image
              src={AccurateResult}
              alt="Accurate results for better improvement"
            />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography className={classes.sectionList}>
              Accurate results for better improvement
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Image src={ImproveResult} alt="Improve for the better future" />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography className={classes.sectionList}>
              Improve for the better future
            </Typography>
          </Grid>
        </Grid>
      </Stack>

      {/* How to Take Test */}
      <Stack direction="column" gap={2}>
        {/* Heading */}
        {headerSection(
          "HOW TO TAKE TEST",
          "Easy steps to take the GRIP Profiling Test"
        )}

        {/* Step List */}
        <Paper
          className={classes.cardStepTest}
          elevation={0}
          component={Grid}
          container
          gap={2}
          justifyContent="space-evenly"
        >
          <Grid item xs={3}>
            <Image src={PurchaseProfiling} alt="Purchase the Profiling Test" />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography textAlign="left" className={classes.sectionList}>
              Purchase the Profiling Test
            </Typography>
          </Grid>
        </Paper>
        <Paper
          className={classes.cardStepTest}
          elevation={0}
          component={Grid}
          container
          gap={2}
          justifyContent="space-evenly"
        >
          <Grid item xs={3}>
            <Image src={LearnerProfile} alt="Create a Learner Profile" />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography textAlign="left" className={classes.sectionList}>
              Create a Learner Profile
            </Typography>
          </Grid>
        </Paper>
        <Paper
          className={classes.cardStepTest}
          elevation={0}
          component={Grid}
          container
          gap={2}
          justifyContent="space-evenly"
        >
          <Grid item xs={3}>
            <Image src={TakeProfilingTest} alt="Take the Profiling Test" />
          </Grid>
          <Grid item xs={8} alignSelf="center">
            <Typography textAlign="left" className={classes.sectionList}>
              Take the Profiling Test
            </Typography>
          </Grid>
        </Paper>
      </Stack>

      {/* GRIP Learning Premium */}
      <Stack direction="column" gap={2} className={classes.pricingPlanSection}>
        {/* Heading */}
        {headerSection("PRICING", "Transparent and Simple Pricing")}

        {/* Pricing Plan Cards */}
        <Swiper
          slidesPerView={"auto"}
          centeredSlides
          centeredSlidesBounds
          spaceBetween={16}
          pagination={{
            clickable: true,
            bulletActiveClass: classes.bulletSlideActive,
          }}
          modules={[Pagination]}
          className={classes.swiperPricingPlanSection}
        >
          {dataProduct?.map((item, index) => {
            const benefitList = JSON.parse(item?.desc) || [];
            return (
              <SwiperSlide
                key={index}
                tag="slide"
                data-hash="premium-pricing-plan"
              >
                <Stack direction="column" gap={2.5}>
                  <Stack direction="column" gap={1} alignItems="center">
                    <Chip
                      label={`${item?.main_variant?.discount?.percent}% OFF`}
                      className={classes.primaryChip}
                    />
                    <Typography className={classes.cardHeader}>
                      {item?.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography className={classes.cardBasePrice}>
                        {item?.main_variant?.base_price_string}
                      </Typography>
                      <Typography className={classes.cardFinalPrice}>
                        {item?.main_variant?.price_string}
                      </Typography>
                    </Stack>
                  </Stack>
                  <PrimaryButton
                    fullWidth
                    text="Purchase Test"
                    onClick={() =>
                      navigateToCheckoutProfilingTest(
                        `/profiling-test/checkout?type=${item?.slug}&item_id=${item?.id}`
                      )
                    }
                  />
                  <Divider />
                  <Stack direction="column" spacing={1.5}>
                    {benefitList?.benefit?.map((benefit, index) => (
                      <Fragment key={index}>
                        {pricingPlanFeatureList(benefit?.text)}
                      </Fragment>
                    ))}
                  </Stack>
                </Stack>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Stack
          direction="column"
          gap={2}
          className={classes.membershipCardBanner}
          alignSelf="center"
        >
          <Stack direction="column" spacing={1}>
            <Typography className={classes.cardBannerHeader}>
              Upgrade membership to get free Premium Test
            </Typography>
            <Typography className={classes.cardBannerInfo}>
              You will get more benefit by purchase and upgrade your membership
            </Typography>
          </Stack>
          <Button variant="outlined" className={classes.cardBannerBtn}>
            Purchase Plan
          </Button>
        </Stack>

        <Stack
          direction="column"
          gap={2}
          className={classes.basicTestCardBanner}
          alignSelf="center"
        >
          <Stack direction="column" spacing={1}>
            <Typography className={classes.cardBannerHeader}>
              Try our Basic Package and discover more!
            </Typography>
            <Typography className={classes.cardBannerInfo}>
              Get to know our package better and get our Free Basic test now
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            className={classes.cardBannerBtn}
            onClick={navigateToAssignTest}
          >
            Try Basic Test
          </Button>
        </Stack>
      </Stack>

      {/* FAQ */}
      <Stack direction="column" spacing={2}>
        {/* Heading */}
        {headerSection("FAQ", "Need Help?")}

        <Stack direction="column" spacing={2}>
          {[...Array(5)].map((_, idx) => (
            <Accordion
              key={idx}
              variant="outlined"
              className={classes.accordionFaq}
              classes={{
                expanded: classes.accordionFaqExpanded,
              }}
              defaultExpanded={idx === 0}
            >
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                classes={{
                  root: classes.accordionFaqSummary,
                  content: classes.accordionFaqSummaryContent,
                }}
              >
                <Stack
                  direction="row"
                  className={classes.accordionFaqTitle}
                  gap={1.2}
                >
                  Still need some answer?
                </Stack>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionFaqDetails}>
                Lorem ipsum dolor sit amet consectetur. Mattis maecenas est nisl
                ligula faucibus massa. Venenatis pellentesque porta quis morbi
                vestibulum facilisis. Mattis porta at enim sit velit aliquam
                condimentum. Enim fermentum a varius diam in dui laoreet.
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilingTest;
