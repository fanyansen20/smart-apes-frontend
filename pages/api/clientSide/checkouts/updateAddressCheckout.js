export default async function UpdateAddressCheckout(
  accessToken,
  checkout_id,
  idAddress
) {
  const payload = { user_address_id: idAddress };

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/checkouts/${checkout_id}/user-address`,
      options
    );

    const json = await res.json();

    return { data: json };
  } catch (error) {
    return error.sent;
  }
}
