import { get } from "helper/network";

export default async function getTopProduct(idCategories, limit) {
  try {
    const resTopProducts = await get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }v1/products/top/${idCategories}/sales?status=ACTIVE&limit=${limit ?? 10}`
    );

    return resTopProducts.data.results;
  } catch (error) {
    return error.massage;
  }
}
