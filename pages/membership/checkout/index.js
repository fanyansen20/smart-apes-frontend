// Next
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import View from "view";

// Utils
import { getMembershipPurchaseData } from "pages/api/membership/getMembershipPurchaseData";
import getPaymentMethods from "pages/api/paymentMethod/getPaymentMethods";
import { getMembershipData } from "store/reducer/membership/membershipSlice";
import { wrapper } from "store/store";

// Services
import { getMembershipTiers } from "services/membership/useCases/getMembershipTiers/getMembershipTiers";
import { getMembershipTiersModel } from "services/membership/useCases/getMembershipTiers/getMembershipTiersService";

const MemberCheckoutPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="checkout-membership" />;
};

export default MemberCheckoutPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      const { accessToken, user } = session;
      const userId = user.id;

      store.dispatch(getMembershipData({ userId, accessToken }));

      const membershipPurchaseData = await getMembershipPurchaseData(
        accessToken,
        userId
      );

      if (membershipPurchaseData?.code === 400) {
        return {
          redirect: {
            destination: "/membership/member-details",
            permanent: false,
          },
        };
      }

      const { results: paymentMethods } = await getPaymentMethods();
      const memberTiers = await getMembershipTiers();

      return {
        props: {
          userId,
          paymentMethods,
          membershipPurchaseData,
          membershipTiersList: getMembershipTiersModel(memberTiers),
        },
      };
    }
);
