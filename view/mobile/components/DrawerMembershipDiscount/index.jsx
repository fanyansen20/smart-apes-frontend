import React from "react";

// Next JS
import Image from "next/image";

// MUI
import { ChevronRightRounded } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import DrawerPanel from "../DrawerPanel";

// Hooks
import useToggle from "@hooks/useToggle";

// Styles
import classes from "./_DrawerMembershipDiscount.module.scss";

// Assets
import ShieldIcon from "@public/assets/icons/shield.svg";

// Constant
import { MembershipBenefit } from "constant/membership";
import { useRouter } from "next/router";

const DrawerMembershipDiscount = () => {
  // #region hooks
  const router = useRouter();
  const [open, toggle] = useToggle();
  // #endregion

  // #region function
  const navigateToMembership = () => {
    router.push("/membership");
  };
  // #endregion

  return (
    <>
      <Container onClick={toggle} className={classes.container}>
        <Grid container gap={1}>
          <Image src={ShieldIcon} alt="shield icon" width={20} height={20} />
          <Typography className={classes.containerTitle}>
            Be part of something great
          </Typography>
        </Grid>
        <ChevronRightRounded className={classes.chevron} />
      </Container>
      <DrawerPanel
        open={open}
        title="Be part of something great"
        onClose={toggle}
      >
        <Grid>
          {MembershipBenefit?.map((data, index) => (
            <Grid key={index} className={classes.benefitContainer}>
              <Grid className={classes.badgeContainer}>
                <Image
                  src={data.image}
                  alt="member badge"
                  className={classes.membershipBadge}
                  width={30}
                  height={30}
                />
              </Grid>
              {data.description}
            </Grid>
          ))}
          <Grid mt={2}>
            <PrimaryButton fullWidth onClick={navigateToMembership}>
              Learn More
            </PrimaryButton>
          </Grid>
        </Grid>
      </DrawerPanel>
    </>
  );
};

export default DrawerMembershipDiscount;
