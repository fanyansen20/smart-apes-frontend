import API from "@helper/apiHelper";

const getDataBundles = async ({ productId }) => {
  try {
    const { data: dataBundles } = await API.get(
      `v1/bundles/active/products/${productId}`
    );

    return dataBundles;
  } catch (error) {
    console.error("Bundle error: ", error?.message);
    return null;
  }
};

export default getDataBundles;
