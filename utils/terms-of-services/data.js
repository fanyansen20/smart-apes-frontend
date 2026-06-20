import { Link } from "@mui/material";
import classes from "../../pages/terms-and-conditions/style.module.scss";
import { ListInfo } from "./styledComponents";

const companySiteRules = [
  "disseminating any unlawful, harassing, libellous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material or otherwise breaching any laws;",
  "transmitting material that encourages conduct that constitutes a criminal offence, or otherwise breaches any applicable laws, regulations or code of practice;",
  "interfering with any other person’s use or enjoyment of the Company Site;",
  "causing, or is likely to cause annoyance, inconvenience or anxiety to others;",
  "making, transmitting or storing electronic copies of materials protected by copyright without the permission of the owner.",
  "causing, or is likely to cause, the Company Site or any access to it to be interrupted, damaged or impaired in any way, or",
  "using the Company Site for fraudulent purposes, or in connection with a criminal offence or other unlawful activity.",
];

const vendorsMaterialRules = [
  "reveals any confidential or sensitive information;",
  "contains or links to any unlawful, threatening, abusive, defamatory or indecent material or material which is deliberately intended to upset other users;",
  "contains any material which you do not have permission to use (including material which may be protected by copyright, trade marks, database rights or any other form of intellectual property right);",
  "Contains viruses or any other components with harmful or contaminating effects on the Company Site or any equipment connected to it; or",
  "Impersonates any living person.",
];

const saleItemsRules = [
  "For physical items, Vendor must dispatch items sold within Ten (10) Working Days once the Order Confirmation is made available to them.",
  "For purchases of programmes/classes, Vendors must contact the Buyers within Ten (10) Working Days upon receipt of the Order Confirmation or Three (3) Working Days prior to the commencement of the programme/classes, whichever is earlier. In the event the programme/class is scheduled for commencement in less than Three (3) Business Days’, the Vendor must endeavour to contact the Buyer as soon as possible.",
  "All postage, customs, import, export and excise duty, GST and  any other taxes associated with the Fixed Price sale (if applicable) will be  paid by the Buyer and it is the Vendor's and Smart Apes responsibility to determine, collect  and remit the applicable GST, customs, import, export and excise duties and any other taxes  associated with the Fixed Price Sale. Unless otherwise agreed by us in advance in writing, the price of any items sold using the Service must be displayed  inclusive of any customs, import, export and excise duty, GST and any other taxes associated with the Fixed Price Sale, which may be applicable and Sellers will not charge  or seek to charge the Buyer, or allow the Buyer to be charged, for any customs, import, export and excise duty, GST or other taxes which are additional to the price displayed for the items on the Site;",
  "The sale will be subject to any warranties implied under applicable law;",
  "The Buyer will resolve any dispute directly with the Vendor; and",
  "The contract between the Buyer and Vendor will be governed by the laws of Singapore and the parties irrevocably submit to the non-exclusive jurisdiction of the courts of Singapore.",
];

export const header = {
  date: "Last Update : 13/02/2023",
  title: "Terms and Conditions",
  description: `These terms and conditions (“Terms and Conditions”) govern your use
  of www.smartapes.com.sg (the “Company Site”) and your relationship
  with GRIP EDUCTECH PTE. LTD. (the “Company”, “we” or “us”). Please
  read them carefully as they affect your rights and liabilities under
  the law. If you do not agree to these Terms and Conditions, please
  do not register for or use the Company Site. If you have any
  questions on the Terms and Conditions, please contact${" "}`,
};

export const data = [
  {
    title: "Introduction",
    list: [
      `The Company Site is an online marketplace to buy and sell goods or services (“items”) or to use the other features provided including, but not limited to, posting, selling, finding and buying of educational resources, digital resources including reviews and discussions (collectively, the “Service”)`,
    ],
    italicAdditionalInfo: true,
    additionalInfo:
      "By using Smart Apes services or opening an account, you give your irrevocable acceptance of and consent to the terms of this agreement, including those additional terms and conditions and policies referenced herein and/or linked hereto.  If you do not agree to these terms, please do not use our services or access the site. If you are under the age of 18 or the legal age for giving consent hereunder pursuant to the applicable laws in your country (the “legal age”), you must get permission from a parent or legal guardian to open an account and that parent or legal guardian must agree to the terms of this agreement. If you do not know whether you have reached the legal age, or do not understand this section, please do not create an account until you have asked your parent or legal guardian for help. If you are the parent or legal guardian of a minor who is creating an account, you must accept the terms of this agreement on the minor's behalf and you will be responsible for all use of the account or company services using such account, whether such account is currently open or created later.",
  },
  {
    title: "Use of the Company Site",
    list: [
      "The Company Site is provided to you for your use subject to these Terms and Conditions. By using the Company Site you agree to be bound by these Terms and Conditions. ",
    ],
  },
  {
    title: "Amendments",
    list: [
      "We may update these Terms and Conditions from time to time for legal or regulatory reasons or to allow the proper operation of the Company Site. We reserve the right to change any of the terms and conditions contained in these Terms and Conditions or any policies or guidelines governing the Company Site or Service, at any time and in our sole and absolute discretion. Any changes will be effective upon posting of the revision on the Company Site. All notice of changes to these Terms and Conditions will be posted on the Company Site and may be posted without any notice to you. You are responsible for reviewing the notice and any applicable changes. You will be subject to the new Terms and Conditions in force at the time that you use the Company Site. If you do not wish to accept the new Terms and Conditions you should not continue to use the Company Site. If you continue to use the Company Site after the date on which the change comes into effect, your use of the Company Site indicates your agreement to be bound by the new Terms and Conditions. ",
    ],
  },
  {
    title: "Registration",
    list: [
      "Only visitors to the Company Site who are registered and agree to these Terms and Conditions (“users”, “Buyers”, “Sellers”, “you”, “your” as the context requires) may participate in buying or selling on the Company site using the Service.",
      "To register on the Company Site you must be over eighteen years of age. If you are under 18, you may use the Company Site only with the involvement of a parent or a guardian.",
      "You must ensure that the details provided by you on registration or at any time are correct and complete.",
      "You must inform us immediately of any changes to the information that you provided when registering by updating your personal details in order that we can communicate with you effectively.",
    ],
  },
  {
    title: "Your Use of the Company Site",
    list: [
      <>
        You may not use the Company Site for any of the following purposes:
        <ol
          className={`${classes.orderedListNumber} ${classes.orderedListSubNumber}`}
        >
          {companySiteRules.map((item, id) => (
            <ListInfo key={id}>
              <li>{item}</li>
            </ListInfo>
          ))}
        </ol>
      </>,
      "We reserve the right to refuse service, terminate accounts or remove or edit content if you are in breach of applicable laws, these Terms and Conditions or any other applicable terms and conditions, guidelines or polices.  ",
      "You will be responsible for our losses and costs resulting from your breach of this clause 5.",
    ],
  },
  {
    title: "Password and Security",
    list: [
      "When you register to use the Company Site you will be asked to create a password or will be provided with a password. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and to the extent permitted by applicable law you agree to accept responsibility for all activities that occur under your account or password. You should take all necessary steps to ensure that the password is kept confidential and secure and should inform us immediately if you have any reason to believe that your password has become known to anyone else, or if the password is being, or is likely to be used in an unauthorised manner. You are responsible for ensuring that the details you provide us with are correct and complete, and for informing us of any changes to the information you have provided. ",
      "If the Company has reasons to believe that there is likely to be a breach of security or misuse of the Company Site, we may require you to change your password or we may suspend your account.",
    ],
  },
  {
    title: "The Company’s right to suspend or cancel your registration",
    list: [
      "We may suspend or cancel your registration immediately at our reasonable discretion or if you breach any of your obligations under these Terms and Conditions.",
      <>
        You can cancel your registration at any time by informing us in writing
        at{" "}
        <Link underline="none" href="mailto:contact@smartapes.com.sg">
          contact@smartapes.com.sg
        </Link>
        . If you do so, you must stop using the Company Site.
      </>,
      "The suspension or cancellation of your registration and your right to use the Company Site shall not affect either party’s statutory rights or liabilities.",
    ],
  },
  {
    title: "Availability of the Company Site ",
    list: [
      <>
        Although we aim to offer you the best service possible, we make no
        promise that the Service at the Company Site will meet your
        requirements. We cannot guarantee that the Service will be fault-free.
        If a fault occurs with the Company Site you should report it to{" "}
        <Link underline="none" href="mailto:contact@smartapes.com.sg">
          contact@smartapes.com.sg
        </Link>{" "}
        and we will attempt to correct the fault as soon as we reasonably can.
      </>,
      "Your access to the Company Site may be occasionally restricted to allow for repairs, maintenance or the introduction of new facilities or services. We will attempt to restore the Service as soon as we reasonably can.",
    ],
  },
  {
    title: "Using the Service",
    list: [
      "The Service allows third party Sellers to list and sell their items at the Company Site. In each such case this is indicated on the respective items detail page. While the Company as a platform provider helps facilitate transactions that are carried out on the Company platform, the Company is neither the Buyer nor the vendor of the vendor's items. The Company provides a venue for vendor and Buyers to negotiate and complete transactions. Accordingly, the contract formed at the completion of a sale for these third party items is solely between Buyer and Vendor. The Company is not a party to this contract nor assumes any responsibility arising out of or in connection with it nor is it the vendor's agent. The vendor is responsible for the sale of the items and for dealing with any Buyer claims or any other issue arising out of or in connection with the contract between the Buyer and Seller. The Company is not obliged to mediate between Buyers and Vendor, enforce, or execute fulfilment of any contract.",
      "The Company warrants that it has the right to provide the Service and will use all reasonable skill and care in making the Service available to you and in ensuring its availability. Because of the number of sources from which the Company obtains the content for the Service and because of the nature of the Internet, errors and omissions do occur and the Company does not give any other warranties in respect of the Service.",
      "The Company is continually seeking to improve the Service. The Company reserves the right, at its discretion, to make changes to any part of the Service provided that it does not materially reduce their content or functionality.",
    ],
  },
  {
    title: "Vendors – Conditions specific to Sellers",
    list: [
      `You will have to be registered as a vendor (“Vendor”) on the Company Site before you are allowed to post and sell items on the Company Site.`,
      "Upon your account registration as a Vendor, you agree to pay the Company’s service fees and charges (“Service Fees”) for completed sales transactions. These Service Fees may vary in the future. Service Fees charged by the Company will be automatically deducted from the total sales transactions during stipulated periods. The settlement amount will then be paid out to Sellers on a date determined by us.",
      "By using our Service to sell an items, you represent to Vendors that you are the true owner and are able to transfer good title to the items free from any third party claims, liens or encumbrances and the listing is accurate, current and complete and is not misleading or otherwise deceptive.",
      <>
        Vendors agree that the Company may in its sole discretion engage in
        promotional activities for and on behalf of Vendors to encourage
        transactions between Buyer and Vendors including but not limited to
        reducing or discounting the prices set by the Vendors.
        <br />
        <br />
        Submitting Material
        <br />
      </>,
      "The Company Site allows Vendors to submit material for inclusion on the Company Site. Whilst the Company does not control the submission of material, we do reserve the right to delete, move and edit any material submitted. Publication will be at our discretion.",
      "Vendors are solely responsible for managing and providing information of the items for sale including but not limited to the summary of resource, price, subject, level, type of resource, difficulty level, learning objectives and previews of the items. ",
      <>
        Vendors are solely responsible for managing and providing information of
        the items for sale including but not limited to the summary of resource,
        price, subject, level, type of resource, difficulty level, learning
        objectives and previews of the items.
        <br />
        <br />
        Restricted Material
        <br />
      </>,
      <>
        Vendors are solely responsible for the material submitted to the Company
        Site and by submitting any material Sellers agree to follow these rules.
        Vendors may not submit any material which:
        <ol
          className={`${classes.orderedListNumber} ${classes.orderedListSubNumber}`}
        >
          {vendorsMaterialRules.map((item, id) => (
            <ListInfo key={id}>
              <li>{item}</li>
            </ListInfo>
          ))}
        </ol>
        <br />
        <br />
        Licence to Use Material
        <br />
      </>,
      "By submitting material to the Company Site, Vendors are granting the Company a perpetual royalty-free non-exclusive licence to reproduce, modify, translate, make available, distribute and allow others to use any material you submit in whole or in part or in any form. We will try to credit authors of the material where possible, but cannot guarantee to do so.",
      <>
        The Company Site offers Vendors a portal to submit material and Vendors
        agree to be responsible for all the Company’s losses arising out any
        breach by Vendors of these Terms and Conditions.
        <br />
        <br />
        Confirmation of Sales
        <br />
      </>,
      "We will notify Vendors by email or any other form of communication as we deem fit upon a successful purchase with verified payment of your items.",
      <>
        Vendors will receive a sales transactions report at the end of every
        transaction period as defined by us.
        <br />
        <br />
        Settlement / Withdrawal
        <br />
      </>,
      "We would disburse the settlement amount to Vendors to the bank account specified by Vendors at the time of registration. The minimum settlement amount to be paid out is S$30. If your settlement amount is less than S$30, it will be rolled over to the next transaction period and paid out only if and when it exceeds the minimum amount.",
      "There will be a withdrawal charge for each request of withdrawal other than the standard payment date. The settlement amount will be paid to Vendors in 7 working days after the withdrawal request has been acknowledged and accepted by us. The withdrawal charge is 18% on settlement amount.",
      "We reserve the right to adjust the fees and charges at any time in the future at our sole and absolute discretion. The Vendors will be notified of these changes before the effective date. ",
      "We will not be responsible for technical fault arising from payment system but will work with the system provider to minimise the downtime.",
    ],
  },
  {
    title: "Buyers – Conditions specific to Buyers",
    list: [
      "You will have to be registered as a buyer or will be registered as a guest buyer (collectively known as “Buyers” on the Company Site before you are allowed to buy items and/or make payments on the Company Site.",
      `Upon your account registration as a Buyer and/or upon your acceptance to purchase items on the Company Site as a guest buyer, you agree to pay the Company’s transaction fees (“Transaction Fees”) for completed sales transactions. These Transaction Fees may vary in the future.`,
      <>
        Buyers must carefully read the items detail page and review information{" "}
        <ListInfo
          sx={(theme) => ({
            color: `${theme.palette.error.light} !important`,
          })}
          component="span"
        >
          such as price, delivery charges, GST, etc. , Frequently Asked
          Questions and Terms and Conditions
        </ListInfo>{" "}
        for sales before purchasing an item. By making a payment for a purchase,
        you are deemed to have understood and agreed to all information about
        the items you are purchasing. Under this condition, the Company/Seller
        will not assume any responsibility of mis-information.
      </>,
      "We take no responsibility and assume no liability for any loss or damages to a Buyer arising from shipping information and/or payer information entered by the Buyer, wrong remittance by the Buyer in connection with the payment for the items purchased or delays or technical faults in the payment process. We reserve the right to check whether a Buyer is duly authorized to use certain payment method, and may suspend the transaction until such authorization is confirmed or cancel the relevant transaction where such confirmation is not available.",
      "We reserve the right to change our shipping arrangement in unforeseen circumstances, such as but not limiting to, surge in volume of orders or to maintain service standard.",
      "For International Buyers (outside Singapore), the shipping charges paid on our website are limited to shipping to your country. Buyers will assume the responsibility include, but not limited to: custom clearance, import taxes and any other fees required by our forwarder. We reserve the right to dispose the parcel in event that Buyers do not assume any of the earlier responsibilities or respond to us within stipulated period required by the forwarder. We take no responsibility for declaration terms or regulations specific to your country.",
    ],
  },
  {
    title: "Sale and Payment",
    list: [
      "For items listed for sale using the Company Site, Vendors/the Company may charge Buyers delivery charges. Applicable delivery charges will be displayed on each items detail page. Once payment mode has been selected and order has been submitted, changes to the payment mode are not possible and cancellation is not allowed.",
      "Once the payment for the items is approved, the Company will confirm each order to the Vendors and the Buyer (“Order Confirmation”).",
    ],
  },
  {
    title: "Contract between Vendor and Buyer",
    list: [
      <>
        Unless the Buyer and vendor expressly agree otherwise, the following
        terms and conditions will apply to the contract between the Buyer and
        Vendor for the sale of the relevant items:
        {saleItemsRules.map((item, id) => (
          <ListInfo key={id}>
            <li>{item}</li>
          </ListInfo>
        ))}
      </>,
    ],
  },
  {
    title: (
      <>
        Delivery<ListInfo> Digital Items</ListInfo>
      </>
    ),
    list: [
      "A web link will be available via email or any other form of communication as we deem fit to Buyers upon the purchase of a digital item for the download of the digital items. The web link will be available for a number of days or downloads as fixed by Sellers after which the link will expire.",
      <>
        All digital files will be watermarked for the purpose of prevention of
        circulation.
        <br />
        <br />
        Physical Items
        <br />
      </>,
      "Delivery of physical items will be made to the address specified by you at the time of purchase. We take no responsibility and assume no liability for any loss or damages to a Buyer arising from shipping information for both before or after order has been shipped.",
      <>
        The Company/Vendor will not be liable for any loss or damage once the
        items have left the premises or whilst in possession with third party
        partners, not limited to, courier companies.
        <br />
        <br />
        Programmes / Classes
        <br />
      </>,
      "Buyers will be contacted by the Vendor for confirmation of the programmes/classes or any other further arrangements via Smart Apes Marketplace as may be required.",
    ],
  },
  {
    title: "Refund, Returns and Exchange Policy",
    list: [
      "The Company Site is a venue to allow registered users to offer, sell, and buy. We are not involved in the actual transaction between Buyers and Vendor. The refund, returns and exchange policies may vary from Buyer to Vendor and will be displayed on each items detail page. Buyers are deemed to have accepted the Vendors’ refund, returns and exchange policies upon the purchase of the items.",
      "The Company reserves the right to make the decision if any refunds are to be made in event of disputes.",
      "Buyers must observe the refund policy stated on the product pages by respective Vendors and the Company, and the terms stated on the Frequently Asked Questions.",
      "The Company does not allow any refunds or exchanges for International Buyers (outside Singapore).",
    ],
  },
  {
    title: "Cancellation and Termination",
    list: [
      "Your access to the Service may be terminated by written notice if you are in material breach of this agreement and the breach is not remedied within the period of 7 days after written notice of the breach has been given to you. If we reasonably believe your breach of these Terms & Conditions affects our lawful operation of the Service or third party users we may suspend your access to the Service at any time.",
    ],
  },
  {
    title: "Limitation of Liability",
    list: [
      "The Company Site provides content from third parties, other Internet sites or resources and while the Company tries to ensure that material included on the Company Site is correct, reputable and of high quality, it does not make any warranties or guarantees in relation to that content. If the Company is informed of any inaccuracies in the material on the Company Site we will attempt to correct the inaccuracies as soon as we reasonably can.",
      "You will not hold the Company responsible for other users' content, actions or inactions, or items they list. Instead, the Company Site is a venue to allow registered users to offer, sell, and buy. We are not involved in the actual transaction between Vendors and Sellers. We have no control over and do not guarantee the quality, safety or legality of items advertised, the truth or accuracy of users’ content or listings, the ability of Vendors to sell items, the ability of Buyers to pay for items, or that a Buyer or Vendor will actually complete a transaction.",
      "You will not hold the Company responsible for other users' actions or inactions, including things they post. Instead, the Company Site is a venue to allow registered users to offer, sell, and buy. We are not involved in the actual transaction between Buyers and Vendor. We have no control over and do not guarantee the quality, safety or legality of items advertised, the truth or accuracy of listings, the ability of Vendors to sell items, the ability of Buyers to pay for items, or that a Buyer or Vendor will actually complete a transaction.",
      "We do not transfer legal ownership of items from the Vendor to the Buyer. Unless the Buyer and the Vendor agree otherwise, the Buyer will become the items’ lawful owner upon physical and/or digital receipt of the items from the Vendor. We cannot guarantee continuous or secure access to our Service, and operation of the Company Site may be interfered with by numerous factors outside of our control. Accordingly, to the extent legally permitted, we exclude all implied warranties, terms and conditions. We are not liable for any loss of money, goodwill, or reputation, or any special, indirect, or consequential damages arising out of your use of our sites and services.",
      "Accordingly, to the fullest extent permitted at law, we will not be liable (whether in contract, tort – including negligence, or under any statutory implied term) for any damages of any kind including without limitation direct, indirect, incidental, punitive, special and consequential, damages (including without limitation, loss of profits, loss of revenue or loss of data) arising out of or in connection with these Terms and Conditions, the Company Site, the Service, the inability to use the Service or those resulting from any goods or services purchased or obtained or messages received or feedback or ratings posted to the Company Site or transactions entered into through the Service.",
    ],
  },
  {
    title: "Indemnity",
    list: [
      "You will indemnify and hold us (and our officers, directors, agents, subsidiaries, joint ventures and employees), harmless from any claim or demand, including reasonable legal fees, made by any third party due to or arising out of your breach of these Terms and Conditions, or your violation of any law or the rights of a third party.",
    ],
  },
  {
    title: "Privacy Policy",
    list: [
      "We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent. We use your information only as described in the Company’s Privacy Policy. We view protection of users' privacy as a very important community principle. For a complete description of how we use and protect your personal information, see the Company’s Privacy Policy. If you object to your Information being transferred or used in this way please do not use our Service. In certain cases information can be share in GRIP EDUTECH cooperate companies.",
    ],
  },
  {
    title: "Intellectual Property",
    list: [
      "The Company and/or other third parties are the owner(s) of the licensee(s) of all intellectual property rights (“Intellectual Property Rights”) in the Company Site. Such Intellectual Property Rights shall include but are not limited to copyrights, trademarks, industrial design rights, patents, database rights, know-how, privileged or similar information, whether registered or not, or registerable by any means, and the right to file an application for registration thereof, as well as all other rights related to the Company or other third parties’ trademarks, products or business activities.",
      "All rights, title and interests in all Intellectual Property Rights in all concepts, systems, written, graphic and other materials relating to the Company and/or other third parties shall at all times remain the property of the Company and/or other third parties.",
      "The content of the Company Site is protected by Intellectual Property Rights. You may retrieve and display the content of the Company Site on a computer screen, store such content in electronic form on disk (but not any server or other storage device connected to a network) or print one copy of such content for your own personal, non-commercial use, provided you keep intact all and any copyright and proprietary notices. You may not otherwise reproduce, modify, copy or distribute or use for public or commercial purposes any of the materials or content on the Company Site without written permission from the Company.",
    ],
  },
  {
    title: "Third Party Websites",
    list: [
      "As a convenience to customers, the Company Site includes links to other web sites or material which are beyond its control. The Company is not responsible for content on any site outside the Company Site.",
    ],
  },
  {
    title: "Advertising and Sponsorship",
    list: [
      "Part of the Company Site may contain advertising and sponsorship. Advertisers and sponsors are responsible for ensuring that material submitted for inclusion on the Company Site complies with relevant laws and codes. We will not be responsible to you for any error or inaccuracy in advertising and sponsorship material.",
    ],
  },
  {
    title: "No Agency",
    list: [
      "No agency, partnership, joint venture, employee-employer or franchiser-franchisee relationship is intended or created by this Agreement.",
    ],
  },
  {
    title: "Applicable Law",
    list: [
      "These Terms and Conditions will be subject to the laws of Singapore. If a dispute arises between you and the Company, our goal is to provide you with a neutral and cost effective means of resolving the dispute quickly. We will try to solve any disagreements quickly and efficiently. If you are not happy with the way we deal with any disagreement and you want to take court proceedings, you must do so within Singapore.",
    ],
  },
  {
    title: "International Use",
    list: [
      "We make no promise that materials on the Company Site are appropriate or available for use in locations outside Singapore, and accessing the Company Site from territories where its contents are illegal or unlawful is prohibited. If you choose to access this site from locations outside Singapore, you do so on your own initiative and are responsible for compliance with local laws.",
    ],
  },
  {
    title: "Severability",
    list: [
      "If any of these Terms and Conditions shall be deemed unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from these Terms and Conditions and shall not affect the validity and enforceability of any remaining provisions.",
    ],
  },
  {
    title: "Entire Agreement",
    list: [
      "These Terms and Conditions incorporates by reference all terms, conditions, policies, guidelines and other information on the Company Site concerning the Company Site or the Service including but not limited to the Privacy Policy constitutes the entire agreement between parties with respect of the subject matter hereof and supersedes any prior written or oral agreement, claims, representations and understandings of the parties relating to the subject matter thereof.",
    ],
  },
  {
    title: "Miscellaneous",
    list: [
      "You may not transfer any of your rights under these Terms and Conditions to any other person. We may transfer our rights under these Terms and Conditions to another business where we reasonably believe your rights will not be affected.",
      "If you breach these Terms and Conditions and the Company chooses to ignore this, the Company will still be entitled to use its rights and remedies at a later date or in any other situation where you breach the Terms and Conditions.",
      "The Company shall not be responsible for any breach of these Terms and Conditions due to any act of God, war, strike, lockout, industrial action, fire, flood, drought, tempest or any other event caused by circumstances beyond its reasonable control.",
      "The SmartAPES MARKETPLACE is owned by GRIP EDUTECH PTE. LTD.",
      <>
        If you have any queries please contact{" "}
        <Link underline="none" href="mailto:cs@smartapes.com.sg">
          cs@smartapes.com.sg
        </Link>
      </>,
    ],
  },
];
