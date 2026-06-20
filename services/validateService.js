import API from "@helper/apiHelper";

/**
 * @param {string} email
 * @returns {Promise<boolean>}
 */

export async function validateEmail(email) {
  try {
    await API.get(`v1/users/email/${email}`);

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * @param {{
 * countryCodeNumber : string
 * value : string
 * }} props
 * @returns {Promise<boolean>}
 */

export async function validatePhoneNumber({
  countryCodeNumber = "+65",
  value,
}) {
  try {
    const { data: response } = await API.get(
      `v1/users/phone-number/${countryCodeNumber}${value}`
    );

    if (response?.code === 200) {
      return false;
    }

    return true;
  } catch (error) {
    if (error?.response?.data?.code >= 400) return true;
  }
}

/**
 *
 * @param {string} zipCode
 * @returns {Promise<boolean>}
 */
export async function validateZipCode(zipCode) {
  if (zipCode.length >= 7) return false;

  if (zipCode.length >= 6) {
    try {
      await API.get(`v1/locations/zip-codes/${zipCode}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
