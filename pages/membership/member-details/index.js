// Next
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { wrapper } from "store/store";

// Utils
import { getMembershipPurchaseData } from "pages/api/membership/getMembershipPurchaseData";
import { getMembershipData } from "store/reducer/membership/membershipSlice";
import View from "view";

const MemberDetailsPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="member-details" />;
};

export default MemberDetailsPage;

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

      await store.dispatch(getMembershipData({ userId, accessToken }));
      const { member } = store.getState();

      const membershipPurchaseData = await getMembershipPurchaseData(
        accessToken,
        userId
      );

      return {
        props: {
          membershipData: member,
          membershipPurchaseData,
        },
      };
    }
);
