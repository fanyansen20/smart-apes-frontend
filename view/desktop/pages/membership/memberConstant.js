import CertificateImage from "@public/assets/images/certificate.svg";
import MedalBasic from "@public/assets/images/membership/medal-basic.svg";
import MedalElite from "@public/assets/images/membership/medal-elite.svg";
import MedalPremium from "@public/assets/images/membership/medal-premium.svg";
import PercentageImage from "@public/assets/images/percentage.svg";
import ReportImage from "@public/assets/images/report.svg";

export const memberBenefit = [
  {
    text: "As a Member you will get bonus discount! from every SMART APES store partner & Get the up to date product recommendation to boost your children education",
    image: PercentageImage,
  },
  {
    text: "You will get free upcoming workshop held by popular institute in the Singapore, and Free Certificate!",
    image: CertificateImage,
  },
  {
    text: "Your children will get FREE Profiling test, so you can unlock your children potential, conduct by GRIP LEARNING",
    image: ReportImage,
  },
];

export const memberTiers = [
  {
    icon: MedalBasic,
    title: "Basic",
    isMostPopular: false,
    perksRef: {
      testCountBold: "1×",
      discountBold: "5% off",
    },
    perks: [
      "Parent's Dashboard",
      "AI personalized Academic Test",
      "{testCountBold} GRIP Learning Premium Test",
      "Member Discount {discountBold}",
      "Member Workshop",
      "Member Events",
    ],
  },
  {
    icon: MedalPremium,
    title: "Premium",
    isMostPopular: true,
    perksRef: {
      testCountBold: "2×",
      discountBold: "20% + 5% off",
    },
    perks: [
      "Parent's Dashboard",
      "AI personalized Academic Test",
      "{testCountBold} GRIP Learning Premium Test",
      "Member Discount {discountBold}",
      "Member Workshop",
      "Member Events",
    ],
  },
  {
    icon: MedalElite,
    title: "Elite",
    isMostPopular: false,
    perksRef: {
      testCountBold: "4×",
      discountBold: "30% off",
    },
    perks: [
      "Parent's Dashboard",
      "AI personalized Academic Test",
      "{testCountBold} GRIP Learning Premium Test",
      "Member Discount {discountBold}",
      "Member Workshop",
      "Member Events",
    ],
  },
];
