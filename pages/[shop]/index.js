import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBundlesShop } from "store/reducer/shops/getBundlesShop";
import { getShopProducts } from "store/reducer/shops/getShopProducts";
import { getDataShop } from "store/reducer/shops/shopDataSlice";
import { wrapper } from "store/store";

// Component
import View from "view";

const ShopPage = ({ device, resultsDataBundle }) => {
  const dispatch = useDispatch();
  const { dataShop: shopData, isLoading: loadShopData } = useSelector(
    (store) => store.shopData
  );

  const { dataProduct } = useSelector((store) => store.dataShopProducts);

  useEffect(() => {
    if (!loadShopData) {
      dispatch(getShopProducts({ shopId: shopData.id }));
    }
  }, [shopData]);

  return (
    <View
      resultsDataBundle={resultsDataBundle}
      shopData={shopData}
      shopProducts={dataProduct}
      device={device}
      path="landing-page-shop"
    />
  );
};

export default ShopPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const shopSlug = params.shop;

      await store.dispatch(getDataShop({ shopSlug }));

      const { dataShop, error } = store.getState().shopData;

      if (error) {
        return {
          notFound: true,
        };
      }

      await store.dispatch(getBundlesShop({ shopId: dataShop.id }));

      const resultsDataBundle = store.getState().dataBundlesShop;

      return {
        props: {
          shopSlug,
          resultsDataBundle,
        },
      };
    }
);
