import API from "@helper/apiHelper";

export default async function createCheckoutProduct(payload) {
  try {
    const res = await API.post("v1/checkouts/product", payload);
    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message,
      code: error?.response?.data?.code || error?.response?.status,
    };
  }
}
