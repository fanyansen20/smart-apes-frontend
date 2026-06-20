import { get } from "helper/network";

export default async function getDataCartByType({ type, auth }) {
  try {
    const response = await get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts?limit=9999&type=${type}`,
      auth
    );

    const { status, code, data } = response.data;

    if (status == "success" && code == 200) {
      return data.results;
    } else {
      return [];
    }
  } catch (error) {}
}
