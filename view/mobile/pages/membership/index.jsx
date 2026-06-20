// React
import React, { memo, useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getMembershipData,
  setCheckoutTier,
} from "store/reducer/membership/membershipSlice";

// Hooks
import useLoginCallback from "@hooks/useLoginCallback";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import { pricingPlanFeatureList } from "../profiling-test";

// MUI Components
import { Avatar, Divider, Stack, Typography } from "@mui/material";

// Images
import AstronautVoucher from "@public/assets/images/astronaut-voucher.svg";
import MembershipHero from "../../assets/images/membership/membership-hero.svg";

// Icons
import AvatarMale from "@public/assets/images/male-avatar.svg";
import WalletCircle from "@public/assets/images/wallet-circle.svg";

// Styles
import classes from "./Membership.module.scss";

// Constants
import { memberBenefit } from "view/desktop/pages/membership/memberConstant";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { interpolateString } from "@helper/interpolateString";
import { Pagination } from "swiper/modules";

/**
 * @import { MembershipTier } from "types/membership"
 */

/**
 * Membership Component Page
 * @param {{
 *  membershipTiersList: MembershipTier[]
 * }} props
 * @returns {JSX.Element}
 */

function Membership({ membershipTiersList }) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const handleLoginCallback = useLoginCallback();
  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((store) => store.member);

  /**
   * @param {MembershipTier} tier
   */

  const handleChooseTier = (tier) => {
    if (!session && status !== "authenticated") return handleLoginCallback();

    tier.userId = session?.user?.id;
    dispatch(setCheckoutTier(tier));
    push("/membership/checkout");
  };

  useEffect(() => {
    dispatch(
      getMembershipData({
        userId: session?.user?.id,
        accessToken: session?.accessToken,
      })
    );
  }, []);

  return (
    <Stack gap={4} direction="column">
      <Stack direction="column" className={classes.membershipContainer}>
        {/* Hero Section */}
        <Stack direction="column" gap={2}>
          <Typography className={classes.pageHeader}>
            Be part of something great – Upgrade your
            <span className={classes.memberHighlight}> Member </span>
            today!
          </Typography>
          <Typography className={classes.sectionDescInfo}>
            One place for all your digital publishing needs with End-to-end
            Digital Transformation Solutions. Find out more now!
          </Typography>
          <Image src={MembershipHero} alt="Membership Hero Banner" />
        </Stack>

        {/* Step Section */}
        <Stack direction="column" gap={2} className={classes.secondarySection}>
          <Typography className={classes.sectionHeader}>
            Easy step to Upgrade Member
          </Typography>

          <Stack gap={2} direction="column" textAlign="left" flexWrap="wrap">
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar alt="Register an account" src={AvatarMale.src} />
              <Typography className={classes.sectionList}>
                Register an account
              </Typography>
            </Stack>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar alt="Purchase your plan" src={WalletCircle.src} />
              <Typography className={classes.sectionList}>
                Purchase your plan
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Membership Benefit */}
        <Stack direction="column" gap={2} py={2}>
          <Typography className={classes.sectionTitle}>
            Full of Benefit
          </Typography>
          <Typography className={classes.sectionHeader}>
            Upgrade member with all benefit you can get, all in one place
          </Typography>
          {memberBenefit.map((benefit, benefitIdx) => (
            <Stack key={benefitIdx} direction="row" gap={2} textAlign="left">
              <Avatar
                sx={{ width: 48, height: 48 }}
                variant="square"
                alt={benefit.text}
                src={benefit.image.src}
              />
              <Typography className={classes.sectionDescInfo}>
                {benefit.text}
              </Typography>
            </Stack>
          ))}
          <div className={classes.membershipBenefitBanner}>
            <Image alt="Membership Benefit" src={AstronautVoucher} />
          </div>
        </Stack>

        {/* Pricing Plan */}
        <Stack direction="column" gap={2} className={classes.secondarySection}>
          <Typography className={classes.sectionTitle}>Pricing</Typography>
          <Typography className={classes.sectionHeader}>
            Flexible Pricing for each Membership Tiers
          </Typography>

          {/* Pricing Plan Cards */}
          <div className={classes.pricingPlanSection}>
            <Swiper
              slidesPerView="auto"
              centeredSlides
              centeredSlidesBounds
              spaceBetween={16}
              pagination={{
                clickable: true,
                bulletActiveClass: classes.bulletSlideActive,
              }}
              modules={[Pagination]}
              className={classes.swiperPricingPlan}
            >
              {membershipTiersList?.map((membershipTier, membershipTierIdx) => (
                <SwiperSlide key={membershipTierIdx} tag="slide">
                  {(slideData) => (
                    <>
                      {membershipTier?.isMostPopular && (
                        <Typography className={classes.mostPopular}>
                          Most Popular
                        </Typography>
                      )}

                      <Stack
                        direction="column"
                        className={slideData.isActive && classes.active}
                        gap={2.5}
                        p={3}
                      >
                        <Stack direction="column" gap={1} alignItems="center">
                          <Avatar
                            className={classes.tierBadge}
                            variant="square"
                            src={membershipTier.icon.src}
                          />
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography className={classes.membershipPrice}>
                              {membershipTier.priceString}
                            </Typography>
                            <Typography className={classes.yearPeriodText}>
                              /year
                            </Typography>
                          </Stack>
                        </Stack>
                        <PrimaryButton
                          fullWidth
                          text="Purchase Plan"
                          className={classes.purchaseBtnText}
                          disabled={membershipData.status === "ACTIVE"}
                          onClick={() => handleChooseTier(membershipTier)}
                        />
                        <Divider />
                        <Typography className={classes.planHeaderList}>
                          What you will get:
                        </Typography>
                        <Stack direction="column" spacing={1.5}>
                          {membershipTier.perks.map((perk) =>
                            pricingPlanFeatureList(
                              interpolateString(perk, membershipTier.perksRef)
                            )
                          )}
                        </Stack>
                      </Stack>
                    </>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default memo(Membership);
