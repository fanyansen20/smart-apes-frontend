import { faqPagesPath } from "../pagePath";

export const accountBlocked = {
  content: [
    {
      csEmail: "cs@smartapes.sg",
      text: "User’s account was blocked due to violation of the Term of Service. User need to contact our customer service by sending email to {csEmail}",
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
