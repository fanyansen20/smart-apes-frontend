// react
import View from "view";

//Next JS
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import getDataCheckoutsById from "pages/api/checkouts/getDataCheckoutsById";

const PaymentSuccess = ({ device }) => {
  return <View device={device} path="payment-success" />;
};

export default PaymentSuccess;

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { id: checkoutId, type } = query;

  const queryParam = type
    ? `../pending/${checkoutId}?type=${type}`
    : `../pending/${checkoutId}`;

  const dataCheckout = await getDataCheckoutsById({
    auth: `Bearer ${session?.accessToken}`,
    checkoutId: checkoutId,
  });

  if (dataCheckout) {
    if (dataCheckout.status === "PENDING") {
      return {
        redirect: {
          destination: queryParam,
          permanent: false,
        },
      };
    }

    if (dataCheckout.status !== "PAID") {
      return {
        redirect: {
          destination: `../../404.js`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
