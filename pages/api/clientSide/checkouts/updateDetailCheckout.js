export default async function updateDetailCheckout({
  accessToken,
  checkoutId,
  notes,
  checkoutItemId,
  qtyCart,
}) {
  const payload = { notes, qty: qtyCart };

  const options = {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/checkouts/${checkoutId}/item/${checkoutItemId}/notes`,
      options
    );

    const json = await res.json();

    return { data: json };
  } catch (error) {
    return error.sent;
  }
}
