import { faqPagesPath } from "../pagePath";

export const changeEmailAddress = {
  content: [
    {
      text: "Once users register their email address, they cannot change it. It is strongly recommended that users use a valid email address for their smart ape’s account.",
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
