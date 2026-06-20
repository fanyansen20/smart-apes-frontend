/**
 * Get membership purchase data eg. price, fee, duration, etc.
 * @param {string} accessToken - user session access token
 * @param {string} userId - user session id
 */
export const getMembershipPurchaseData = async (accessToken, userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/users/${userId}/membership/purchase`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return error.message;
  }
};
