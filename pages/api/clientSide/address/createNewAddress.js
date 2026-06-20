export default async function createNewAddress(accessToken, userId, payload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/users/${userId}/addresses`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const results = await res.json();

    return results;
  } catch (error) {
    return error;
  }
}
