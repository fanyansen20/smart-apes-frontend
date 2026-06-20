export default async function getUserAddressById({ auth, userId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/users/${userId}/addresses`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    );

    const dataAddressUser = await response.json();

    return dataAddressUser;
  } catch (err) {
    return err.massage;
  }
}
