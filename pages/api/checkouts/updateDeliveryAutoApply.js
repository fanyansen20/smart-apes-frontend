import axios from "axios";

export default async function updateDeliveryAutoApply(accessToken, checkoutId) {
  const payload = {
    allow_shop_fleet: false,
  };

  const result = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/checkouts/${checkoutId}/auto-apply-delivery`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return result.data;
}
