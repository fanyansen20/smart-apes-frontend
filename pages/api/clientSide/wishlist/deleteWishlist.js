export default async function deleteWishlist({ auth, idProduct }) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/wishlists/products/${idProduct}`,
      options
    );

    return response.status;
  } catch (error) {
    console.error(error.message);
  }
}
