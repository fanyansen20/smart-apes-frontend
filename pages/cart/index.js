import View from "view";
import { wrapper } from "store/store";

//Next JS
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

// API
import getUserAddressById from "pages/api/users/getUserAddressById";
import { getProductsFromCart } from "store/reducer/getProductsFromCart/getProductsFromCartSlice";

const CartPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="cart" />;
};

export default CartPage;

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

      const { results: dataUserAddress } = await getUserAddressById({
        auth: `Bearer ${accessToken}`,
        userId: user.id,
      });

      await store.dispatch(
        getProductsFromCart({
          axiosConfig: {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        })
      );

      const productsFromCartState = store.getState().getProductsFromCart;

      return {
        props: {
          accessToken,
          productsFromCartState,
          dataUserAddress,
          user,
          session,
        },
      };
    }
);
