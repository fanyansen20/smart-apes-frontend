export default async function getProductById({ productId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products/${productId}`
    );

    const dataProductById = response.json();

    return dataProductById;
  } catch (err) {
    return err.massage;
  }
}
