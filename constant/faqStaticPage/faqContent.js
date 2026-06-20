// Sign Up and Login
import { accountBlocked } from "./faqAnswers/accountBlocked";
import { accountHacked } from "./faqAnswers/accountHacked";
import { changeAccountName } from "./faqAnswers/changeAccountName";
import { changeEmailAddress } from "./faqAnswers/changeEmailAddress";
import { forgotAccountPassword } from "./faqAnswers/forgotAccountPassword";
import { loginAccountSmartApes } from "./faqAnswers/loginAccountSmartApes";
import { logoutAccountSmartApes } from "./faqAnswers/logoutAccountSmartApes";
import { manageDeliveryAddress } from "./faqAnswers/manageDeliveryAddress";
import { registerSmartApesAccount } from "./faqAnswers/registerAccountInSmartApes";
import { resetAccountPassword } from "./faqAnswers/resetAccountPassword";

export const faqContent = {
  "account-and-security": {
    name: "Account and Security",
    pathSlug: "account-and-security",
    "sign-up-and-login": {
      name: "Sign Up and Login",
      pathSlug: "sign-up-and-login",
      content: [
        {
          title: "How do I register an account in Smart Apes?",
          pathSlug: "how-do-i-register-an-account-in-smart-apes",
          answerContent: registerSmartApesAccount,
        },
        {
          title: "How do I log in to my account?",
          pathSlug: "how-do-i-log-in-to-my-account",
          answerContent: loginAccountSmartApes,
        },
        {
          title: "How do I log out from my account?",
          pathSlug: "how-do-i-log-out-from-my-account",
          answerContent: logoutAccountSmartApes,
        },
        {
          title: "How do I reset my password?",
          pathSlug: "how-do-i-reset-my-password",
          answerContent: resetAccountPassword,
        },
        {
          title: "How do I change my email address in my Smart Apes Account?",
          pathSlug: "how-do-i-change-my-email-address-in-my-smart-apes-account",
          answerContent: changeEmailAddress,
        },
        {
          title: "I forgot my password. How do I change my password?",
          pathSlug: "i-forgot-my-password-how-do-i-change-my-password",
          answerContent: forgotAccountPassword,
        },
        {
          title: "What should I do if my account were hacked?",
          pathSlug: "what-should-i-do-if-my-account-were-hacked",
          answerContent: accountHacked,
        },
        {
          title: "Why was my account blocked?",
          pathSlug: "why-was-my-account-blocked",
          answerContent: accountBlocked,
        },
        {
          title: "How do I change the account name?",
          pathSlug: "how-do-i-change-the-account-name",
          answerContent: changeAccountName,
        },
        {
          title: "How do I add or remove and edit the delivery address?",
          pathSlug: "how-do-i-add-or-remove-and-edit-the-delivery-address",
          answerContent: manageDeliveryAddress,
        },
      ],
    },
    "parent-dashboard": {
      name: "Parent Dashboard",
      pathSlug: "parent-dashboard",
      content: [
        {
          title: "How do I access the parent dashboard?",
          answerContent: "",
        },
        {
          title: "How do I add my child details?",
          answerContent: "",
        },
        {
          title: "What is Free Assessment?",
          answerContent: "",
        },
        {
          title: "How do I take a free assessment?",
          answerContent: "",
        },
        {
          title: "How do I access assessment central?",
          answerContent: "",
        },
        {
          title: "How do I change my child level?",
          answerContent: "",
        },
      ],
    },
  },
  payment: {
    name: "Payment",
    pathSlug: "payment",
  },
  order: {
    name: "Order",
    pathSlug: "order",
  },
  delivery: {
    name: "Delivery",
    pathSlug: "delivery",
  },
  complain: {
    name: "Complain",
    pathSlug: "complain",
  },
};
