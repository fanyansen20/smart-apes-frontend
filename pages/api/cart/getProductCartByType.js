export default async function getProductCartByType({ auth, type }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts?type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    const dataProductCart = await response.json();
    const { status, code, data } = await dataProductCart;

    if (status == "success" && code == 200) {
      return data.results;
    } else {
      return [];
    }
  } catch (err) {
    return err.massage;
  }
}
