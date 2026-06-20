//Images
import ninjaVan from "@public/assets/images/ninja_van.png";
import visaMasterCard from "@public/assets/images/visa-mastercard.png";

const dataFooters = [
  {
    title: "Customer Services",
    contents: [
      {
        title: "Help Centre",
        link: "/faq",
      },
      { title: "How to buy", link: "/faq" },
      { title: "How to sell", link: "/faq" },
      { title: "Payment Methods", link: "/faq" },
      { title: "Return &  Refund", link: "/return-and-refund" },
      { title: "Terms & Conditions", link: "/terms-and-conditions" },
      { title: "Contact Us", link: "/contact-us" },
    ],
  },
  {
    title: "About SMART APES",
    contents: [
      { title: "About Us", link: "/about-us" },
      { title: "SMART APES Policies", link: "/privacy-policy" },
    ],
  },
  {
    twoColumns: true,
    contentWithImages: [
      {
        title: "Payments",
        contentImages: [
          {
            title: "visa master card",
            image: visaMasterCard,
          },
        ],
      },
      {
        title: "Logistics",
        contentImages: [
          {
            title: "ninjaVan",
            image: ninjaVan,
          },
        ],
      },
    ],
  },
];

export default dataFooters;
