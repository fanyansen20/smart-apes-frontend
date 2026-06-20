import { faqPagesPath } from "../pagePath";

export const accountHacked = {
  content: [
    {
      text: "In case of the user's account getting hacked, the user is suggested to reset their password and create a new password which is stronger than the previous password. The password should consist of a minimum of  8 characters, one uppercase letters, number, and special characters",
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
