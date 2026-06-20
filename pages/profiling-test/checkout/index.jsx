import View from "view";

// next and react js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

import { getTestProduct } from "store/reducer/profilingTest/getTestProduct";

// hooks
import useLoginCallback from "@hooks/useLoginCallback";

// API
import getPaymentMethods from "pages/api/paymentMethod/getPaymentMethods";

const CheckoutProfilingTest = ({ device, paymentMethods }) => {
  const responseData = useSelector((store) => store.getTestProduct);

  const handleLoginCallback = useLoginCallback();
  const dispatch = useDispatch();

  const { query } = useRouter();
  const { data: session, status } = useSession();

  const { type, item_id } = query;

  const isEmptyData =
    responseData.dataProduct.length === 0 && responseData.status === "idle";

  useEffect(() => {
    if (status === "loading") return;

    if (!session && status !== "authenticated")
      return handleLoginCallback(
        `profiling-test/checkout?type=${type}&item_id=${item_id}`
      );
  }, [status, session]);

  useEffect(() => {
    if (isEmptyData) {
      dispatch(getTestProduct());
    }
  }, [responseData.status]);

  function filterDataProduct(dataCheckout, params) {
    return dataCheckout.find((item) => item.slug === params);
  }

  return (
    <View
      paymentMethods={paymentMethods}
      device={device}
      path="checkout-profiling-page"
      dataCheckout={filterDataProduct(responseData.dataProduct, type)}
      itemId={item_id}
    />
  );
};

export default CheckoutProfilingTest;

export async function getServerSideProps() {
  const { results: paymentMethods } = await getPaymentMethods();

  return {
    props: { paymentMethods },
  };
}
