import { faqPagesPath } from "../pagePath";

export const logoutAccountSmartApes = {
  content: [
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "Users can Log out from their smarapes account by clicking the profile icon and then choose “Log Out”",
    },
  ],
  helpCount: { yes: 0, no: 0 },
  relatedArticle: [
    {
      title: "How do I register an account in Smart Apes?",
      path: faqPagesPath.register,
    },
    {
      title: "How do I login to my account?",
      path: faqPagesPath.login,
    },
  ],
};
