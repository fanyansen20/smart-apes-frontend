import { faqPagesPath } from "../pagePath";

export const loginAccountSmartApes = {
  content: [
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      link: "https://smartapes.sg/login",
      linkText: "(login)",
      text: "1. Users can log in to their account in the marketplace through this URL {link} or click on the “Sign In” button in the smartapes homepage.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "2. Fill in the email and password that registered for the account, then tick the captcha box and  lastly click the “Login” button.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "3. Users will be redirected back to the marketplace homepage.",
    },
  ],
  helpCount: { yes: 0, no: 0 },
  relatedArticle: [
    {
      title: "How do I register an account in Smart Apes?",
      path: faqPagesPath.register,
    },
    {
      title: "How do I logout from my account?",
      path: faqPagesPath.logout,
    },
  ],
};
