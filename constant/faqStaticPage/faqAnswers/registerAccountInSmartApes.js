import { faqPagesPath } from "../pagePath";

export const registerSmartApesAccount = {
  content: [
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      link: "https://smartapes.sg/register",
      linkText: "(register)",
      text: "1. In order for new users to register their account, they can access this URL {link} or click on the “Sign Up” button in the smartapes homepage.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "2. Users need to fill up all the required information, and then click next.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "3. Then users need to agree on the term and condition and privacy policy by ticking the check boxes as well as the captcha box. Then click the “Submit” button to complete the process.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "4. An email for verification will be sent to the registered email, user must click “Verify your Mail” in order to activate your account.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "5. Users then will be redirected to the login page and can log in to their account.",
    },
  ],
  helpCount: { yes: 0, no: 0 },
  relatedArticle: [
    {
      title: "How do I login into my account?",
      path: faqPagesPath.login,
    },
    {
      title: "How do I logout from my account?",
      path: faqPagesPath.logout,
    },
  ],
};
