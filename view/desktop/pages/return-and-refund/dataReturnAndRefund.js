import illustrationAwbUpdate from "@public/assets/images/return-and-refund/illustration-AWB-update.svg";
import illustrationBuyerReturnProduct from "@public/assets/images/return-and-refund/illustration-buyer-return-product.svg";
import illustrationCheckProduct from "@public/assets/images/return-and-refund/illustration-check-product.svg";
import illustrationNearestCounter from "@public/assets/images/return-and-refund/illustration-nearest-counter.png";
import illustrationProductDeliverToSeller from "@public/assets/images/return-and-refund/illustration-product-deliver-to-seller.svg";
import illustrationRefundSuccessPocket from "@public/assets/images/return-and-refund/illustration-refund-success-pocket.svg";
import illustrationRefundSuccess from "@public/assets/images/return-and-refund/illustration-refund-success.svg";
import illustrationSellerAcknowledge from "@public/assets/images/return-and-refund/illustration-seller-acknowledge.svg";
import illustrationSellerProcessRefund from "@public/assets/images/return-and-refund/illustration-seller-process-refund.svg";
import illustrationSettleReplacementProduct from "@public/assets/images/return-and-refund/illustration-settle-replacement-product.svg";

const dataReturnAndRefund = [
  {
    title: "How to Return Product ?",
    items: [
      {
        imgUrl: illustrationBuyerReturnProduct,
        subTitle:
          "Buyer need to pack the product back and return it to the seller",
      },
      {
        imgUrl: illustrationNearestCounter,
        subTitle: "Buyer need to go to the nearest NinjaVan Counter",
      },
      {
        imgUrl: illustrationAwbUpdate,
        subTitle: "Just wait, AWB will automatically update by the system",
      },
      {
        imgUrl: illustrationProductDeliverToSeller,
        subTitle: "The returned product on its way to Seller address",
      },
    ],
  },
  {
    title: "When the refund proceed",
    items: [
      {
        imgUrl: illustrationSellerAcknowledge,
        subTitle: "Seller Acknowledge the return",
      },
      {
        imgUrl: illustrationCheckProduct,
        subTitle: "Seller checked the returned product",
      },
      {
        imgUrl: illustrationSellerProcessRefund,
        subTitle: "Seller proceed to refund",
      },
      {
        imgUrl: illustrationRefundSuccessPocket,
        subTitle: "Refund Success (Buyer must wait 3x24 Hour)",
      },
    ],
  },
  {
    title: "How to claim replacement",
    items: [
      {
        imgUrl: illustrationSellerAcknowledge,
        subTitle: "seller acknowledge the return product from buyer",
      },
      {
        imgUrl: illustrationSettleReplacementProduct,
        subTitle: "Seller start and settle the replacement product",
      },
      {
        imgUrl: illustrationNearestCounter,
        subTitle: "Seller go to nearest ninja van  counter ",
      },
      {
        imgUrl: illustrationRefundSuccess,
        subTitle: "replacement success and on it’s way",
      },
    ],
  },
];

export default dataReturnAndRefund;
