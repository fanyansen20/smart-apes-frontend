export default async function postWishlistFromCart(auth, idProduct) {
  const payload = {
    product_id: idProduct,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts/${idProduct}/move-to-wishlist`,
      options
    );

    const resultWishlist = await response.json();

    return resultWishlist;
  } catch (error) {
    console.error(error.message);
  }
}
