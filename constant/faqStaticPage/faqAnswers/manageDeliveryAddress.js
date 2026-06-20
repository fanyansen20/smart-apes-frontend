import { faqPagesPath } from "../pagePath";

export const manageDeliveryAddress = {
  content: [
    {
      text: "1. Users can add a new address for delivery purposes through the “My Profile” menu.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "2. Click your profile icon, choose the “My Profile” menu.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "3. In the page “Your Address” click “+Add New Address”, Input all the required fields then click confirm. If the user wishes to set up this new address as the primary address, tick the check box “Set to Primary Address” and then click confirm.",
    },
    {
      attachments: [
        {
          type: "image",
          url: "https://stage-smartapes-cdn.sgp1.digitaloceanspaces.com/images/1560/09b5d27a-1136-49f1-8bc9-fac55266478d-1708418711788.webp",
        },
      ],
      text: "4. If users want to delete previously registered address, users can just choose from the address list and click “Delete Address”",
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
