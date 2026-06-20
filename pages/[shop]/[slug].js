import { wrapper } from "store/store";
import View from "view";

// Auth
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

// SSR
import getDataBundles from "pages/api/dataBundles/getProductBundlesById";
import getProductsBySlug from "pages/api/dataProducts/getProductsBySlug";
import getProductById from "../api/dataProducts/getProductById";
import getAddressShopByShopId from "../api/shop/getAddressShopByShopId";

const ProductPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="product-detail" />;
};

export default ProductPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const shopId = query.shop_id;
      const productId = query.id;
      const membershipData = store.getState().member;

      const session = await getServerSession(req, res, authOptions);
      const dataProductDetail = await getProductById({ productId: productId });

      if (dataProductDetail.code) {
        return {
          redirect: {
            destination: `/`,
            permanent: false,
          },
        };
      }

      const isBundle = dataProductDetail.has_active_bundle;

      const lengthOfArraysCategoryTree = dataProductDetail.category_tree.length;
      const randomIndexByCategoryTree = Math.floor(
        Math.random() * lengthOfArraysCategoryTree
      );
      const idCategoryTree =
        dataProductDetail.category_tree[randomIndexByCategoryTree].id;

      const { results: relatedProducts } = await getProductsBySlug(
        idCategoryTree,
        5
      );

      const { results: dataShopAddress } = await getAddressShopByShopId({
        shopId: shopId,
      });

      const dataBundles = await getDataBundles({ productId });

      console.log("session", session);
      console.log("membership_tier", session?.user?.membership_tier);

      return {
        props: {
          isBundle,
          dataBundles,
          relatedProducts,
          product: dataProductDetail,
          shop: dataShopAddress[0],
          membershipData,
        },
      };
    }
);
