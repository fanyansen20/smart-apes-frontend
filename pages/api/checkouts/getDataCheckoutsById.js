export default async function getDataCheckoutsById({ auth, checkoutId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/checkouts/${checkoutId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    if (response.status === 200) {
      const { data: dataCheckouts, status, code } = await response.json();
      if (code === 200 && status === "success") {
        return dataCheckouts;
      }
    } else {
      return false;
    }
  } catch (err) {
    return err.message;
  }
}
