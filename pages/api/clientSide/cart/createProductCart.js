export default async function createProductCart(accessToken, payload) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts`,
      options
    );

    const results = await res.json();

    return results;
  } catch (error) {
    return error;
  }
}
