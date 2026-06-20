// React
import React from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Mui
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// Style
import classes from "./_FooterMobile.module.scss";

// Images
import ninjaVan from "@public/assets/icons/ninja-van.svg";
import mastercardIcon from "@public/assets/images/mastercard-icon.svg";
import visaIcon from "@public/assets/images/visa-icon.svg";
import iconFacebook from "public/assets/logo/navbarIcon/facebook-logo.svg";
import iconInstagram from "public/assets/logo/navbarIcon/instagram-logo.svg";

// Constants
import { PATH_BOTTOM_NAV } from "constant/mobileApp";

function FooterMobile() {
  const { pathname } = useRouter();
  const dummyCustomerServicesURL = [
    { title: "Help Centre", path: "faq" },
    { title: "How to Buy", path: "how-to-buy" },
    { title: "How to Sell", path: "how-to-sell" },
    { title: "Payment Methods", path: "payment-method" },
    { title: "Return & Refund", path: "return-and-refund" },
    { title: "Terms & Conditions", path: "terms-and-conditions" },
    { title: "Contact Us", path: "contact-us" },
  ];

  const dummyAboutSmartApesURL = [
    { title: "About Us", path: "about-us" },
    { title: "SMART APES Policies", path: "privacy-policy" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Grid container mb={PATH_BOTTOM_NAV.includes(pathname.split("/")[1]) && 7}>
      <Grid direction="column" spacing={2} xs={12}>
        {/* Customer Services */}
        <Accordion defaultExpanded className={classes.AccordionSection}>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls="customer-service-accordion-content"
            id="customer-service-accordion"
          >
            <Typography className={classes.AccordionTitle}>
              Customer Services
            </Typography>
          </AccordionSummary>

          {dummyCustomerServicesURL?.map((link, idx) => (
            <>
              <AccordionDetails key={idx}>
                <Link href={`/${link?.path}`} passHref>
                  <Grid container justifyContent={"space-between"}>
                    <Typography>{link?.title}</Typography>
                    <KeyboardArrowRightIcon />
                  </Grid>
                </Link>
              </AccordionDetails>
              <Divider variant="middle" />
            </>
          ))}
        </Accordion>

        {/* About Smart Apes */}
        <Accordion defaultExpanded className={classes.AccordionSection}>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls="about-accordion-content"
            id="about-accordion"
          >
            <Typography className={classes.AccordionTitle}>
              About SMART APES
            </Typography>
          </AccordionSummary>

          {dummyAboutSmartApesURL?.map((link, idx) => (
            <>
              <AccordionDetails key={idx}>
                <Link href={`/${link?.path}`} passHref>
                  <Grid container justifyContent={"space-between"}>
                    <Typography>{link?.title}</Typography>
                    <KeyboardArrowRightIcon />
                  </Grid>
                </Link>
              </AccordionDetails>
              <Divider variant="middle" />
            </>
          ))}
        </Accordion>

        {/* Payments */}
        <Grid
          container
          className={classes.FooterTitle}
          direction={"column"}
          alignItems={"flex-start"}
        >
          <Typography>Payments</Typography>
          <Grid container gap={2}>
            <Image src={visaIcon} alt="Visa Logo" height="52px" />
            <Image src={mastercardIcon} alt="mastercard Logo" height="52px" />
          </Grid>
        </Grid>

        {/* Logistics */}
        <Grid
          container
          className={classes.FooterTitle}
          direction={"column"}
          alignItems={"flex-start"}
        >
          <Typography>Logistics</Typography>
          <Image
            src={ninjaVan}
            alt="Ninja Van Logo"
            width="105px"
            height="30px"
          />
        </Grid>

        {/* Social Media */}
        <Grid
          container
          className={classes.FooterTitle}
          direction={"column"}
          alignItems={"flex-start"}
        >
          <Typography>Follow Us On</Typography>
          <Grid container gap={3}>
            <Image
              src={iconInstagram}
              alt="Instagram Logo"
              width="30px"
              height="30px"
            />
            <Image
              src={iconFacebook}
              alt="Facebook Logo"
              width="30px"
              height="30px"
            />
          </Grid>
        </Grid>

        {/* Copyright Footer */}
        <Grid className={classes.footerCopyright} my={3}>
          <Typography>
            &copy; {`${currentYear} SmartApes. All Rights Reserved.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FooterMobile;
