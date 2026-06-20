import API from "@helper/apiHelper";

/**
 *
 * @param {{
 * payload : {}
 * successHandler : () => void
 * errorHandler : () => void
 * }} props
 */
export async function createChildren({
  payload,
  successHandler,
  errorHandler,
}) {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const response = await API.post("v1/children", payload, config);

    return successHandler(response.data);
  } catch (error) {
    errorHandler(error);
  }
}
