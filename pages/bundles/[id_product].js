// Next
import { getServerSession } from "next-auth";

// Redux
import { getBundleListByProductId } from "store/reducer/getBundleListByProductId/getBundleListByProductIdSlice";
import { wrapper } from "store/store";

// API
import { authOptions } from "pages/api/auth/[...nextauth]";
import getUserAddressById from "pages/api/users/getUserAddressById";

// View
import View from "view";

const BundlesDetail = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="bundle-detail" />;
};

export default BundlesDetail;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, res }) => {
      const productId = params.id_product;
      const session = await getServerSession(req, res, authOptions);
      await store.dispatch(getBundleListByProductId({ product_id: productId }));

      const accessToken = session?.accessToken || null;
      const user = session?.user || null;

      const { results: dataUserAddress } = await getUserAddressById({
        auth: `Bearer ${accessToken}`,
        userId: user?.id,
      });

      const getBundleListState = store.getState().getBundleListByProductId;

      return {
        props: {
          productId,
          getBundleListState,
          dataUserAddress: dataUserAddress || null,
          user,
        },
      };
    }
);
