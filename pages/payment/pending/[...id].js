import View from "view";

//Next JS
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

const PaymentPending = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="payment-pending" />;
};

export default PaymentPending;

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);

  const { id: checkoutId } = query;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { checkoutId },
  };
}
