import { faqPagesPath } from "../pagePath";

export const changeAccountName = {
  content: [
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "1. Users can change their account name from my profile menu. Click your profile icon, choose the “My Profile” menu.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "2. Click “Edit Information” to save the changes that have been made.",
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
