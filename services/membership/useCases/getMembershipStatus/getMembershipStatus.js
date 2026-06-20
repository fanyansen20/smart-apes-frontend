import API from "@helper/apiHelper";

/**
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export const getMembershipStatus = async (userId) => {
  try {
    const res = await API.get(`/v1/users/${userId}/membership`);
    return res.data;
  } catch (error) {
    return error;
  }
};
