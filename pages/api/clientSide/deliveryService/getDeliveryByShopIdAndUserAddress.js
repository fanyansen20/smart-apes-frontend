export default async function getDeliveryByShopIdAndUserAddress({
  auth,
  checkoutShopId,
  checkoutId,
}) {
  const requestOptions = {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69",
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/checkouts/${checkoutId}/shop/${checkoutShopId}/delivery-service/rates`,
      requestOptions
    );

    const data = await res.json();

    return { dataAddress: data };
  } catch (err) {
    return err.massage;
  }
}
