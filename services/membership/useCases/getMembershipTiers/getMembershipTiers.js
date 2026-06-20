import API from "@helper/apiHelper";

/**
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export const getMembershipTiers = async (userId = "-") => {
  try {
    const res = await API.get(`/v1/users/${userId}/membership/purchase`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
