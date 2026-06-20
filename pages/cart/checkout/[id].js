//React
import View from "view";

//Next JS
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

// API
import getDataCheckoutsById from "pages/api/checkouts/getDataCheckoutsById";
import getPaymentMethods from "pages/api/paymentMethod/getPaymentMethods";
import getUserAddressById from "pages/api/users/getUserAddressById";

// Helpers
import { convertDataBundles } from "@helper/convertProductData";
import { autoSelectDeliveryService } from "services/checkout/autoSelectDeliveryService";

const CheckoutPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="checkout" />;
};

export default CheckoutPage;

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

  const { accessToken, user } = session;
  const { id: checkoutId } = query;

  const userId = user.id;

  const dataCheckout = await getDataCheckoutsById({
    auth: `Bearer ${accessToken}`,
    checkoutId: checkoutId,
  });

  if (dataCheckout?.types) {
    dataCheckout.types = dataCheckout?.types?.map((productsType) => ({
      ...productsType,
      shops: productsType?.shops?.map((productsByShop) => ({
        ...productsByShop,
        bundles: productsByShop?.bundles?.map((productBundle) => ({
          ...productBundle,
          mappedProductBundleData: convertDataBundles({
            ...productBundle,
            bundle_qty: productBundle.bundle_qty,
          }),
        })),
      })),
    }));
  }

  const { results: dataUserAddress } = await getUserAddressById({
    auth: `Bearer ${accessToken}`,
    userId: userId,
  });

  const { results: paymentMethods } = await getPaymentMethods();
  const selectedDeliveryServices = await autoSelectDeliveryService(
    session?.accessToken,
    dataCheckout.id
  );

  return {
    props: {
      dataCheckout,
      dataUserAddress,
      paymentMethods,
      selectedDeliveryServices,
    },
  };
}
