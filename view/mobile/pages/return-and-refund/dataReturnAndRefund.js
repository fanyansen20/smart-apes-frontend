import illustrationAwbUpdate from "@public/assets/images/return-and-refund/illustration-AWB-update.svg";
import illustrationBuyerReturnProduct from "@public/assets/images/return-and-refund/illustration-buyer-return-product.svg";
import illustrationCheckProduct from "@public/assets/images/return-and-refund/illustration-check-product.svg";
import illustrationNearestCounter from "@public/assets/images/return-and-refund/illustration-nearest-counter.png";
import illustrationOnTheWaySeller from "@public/assets/images/return-and-refund/illustration-on-the-way-seller.svg";
import illustrationProductDeliverToSeller from "@public/assets/images/return-and-refund/illustration-product-deliver-to-seller.svg";
import illustrationRefundSuccessPocket from "@public/assets/images/return-and-refund/illustration-refund-success-pocket.svg";
import illustrationRefundSuccess from "@public/assets/images/return-and-refund/illustration-refund-success.svg";
import illustrationSellerAcknowledge from "@public/assets/images/return-and-refund/illustration-seller-acknowledge.svg";
import illustrationSellerProcessRefund from "@public/assets/images/return-and-refund/illustration-seller-process-refund.svg";
import illustrationSettleReplacementProduct from "@public/assets/images/return-and-refund/illustration-settle-replacement-product.svg";

const dataReturnAndRefund = {
  returnProduct: {
    title: "How to Return Product ?",
    items: [
      {
        image: illustrationBuyerReturnProduct,
        subTitle:
          "Buyer need to pack the product back and return it to the seller",
      },
      {
        image: illustrationProductDeliverToSeller,
        subTitle: "Buyer has to wait for the courier to pick up the product",
      },
      {
        image: illustrationAwbUpdate,
        subTitle: "Just wait, AWB will automatically update by the system",
      },
      {
        image: illustrationOnTheWaySeller,
        subTitle: "The returned product on its way to Seller address",
      },
    ],
  },
  refundProceed: {
    title: "When the refund proceed",
    items: [
      {
        image: illustrationSellerAcknowledge,
        subTitle: "Seller Acknowledge the return",
      },
      {
        image: illustrationCheckProduct,
        subTitle: "Seller checked the returned product",
      },
      {
        image: illustrationSellerProcessRefund,
        subTitle: "Seller proceed to refund",
      },
      {
        image: illustrationRefundSuccessPocket,
        subTitle: "Refund Success (Buyer must wait 3x24 Hour)",
      },
    ],
  },
  claimReplacement: {
    title: "How to claim replacement",
    items: [
      {
        image: illustrationSellerAcknowledge,
        subTitle: "seller acknowledge the return product from buyer",
      },
      {
        image: illustrationSettleReplacementProduct,
        subTitle: "Seller start and settle the replacement product",
      },
      {
        image: illustrationNearestCounter,
        subTitle: "Seller go to nearest ninja van counter ",
      },
      {
        image: illustrationRefundSuccess,
        subTitle: "replacement success and on it’s way",
      },
    ],
  },
};

export default dataReturnAndRefund;
