//Next JS
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import View from "view";

// API
import { getMembershipPurchaseData } from "pages/api/membership/getMembershipPurchaseData";

const PaymentMembershipSuccess = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="checkout-success" />;
};

export default PaymentMembershipSuccess;

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);

  const { reference } = query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { accessToken, user } = session;
  const { id: userId } = user;

  const membershipPurchaseData = await getMembershipPurchaseData(
    accessToken,
    userId
  );

  if (!membershipPurchaseData?.code === 400) {
    return {
      redirect: {
        destination: "/membership",
        permanent: false,
      },
    };
  }

  if (!reference) {
    return {
      redirect: {
        destination: "/membership/member-details",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
