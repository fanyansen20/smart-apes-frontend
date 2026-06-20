import { AxiosError } from "axios"; //eslint-disable-line
import { errorHttpMessage } from "./errorHttpMessage";

/**
 * @param {{
 * error: AxiosError
 * }} props
 * @returns {string}
 */
const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;

    const isClientError = Boolean(
      response?.status?.toString()?.startsWith("4")
    );

    const errorText = isClientError
      ? message
      : errorHttpMessage[response.status];

    return errorText;
  } else {
    return "Cannot connect to the server, Check your internet network";
  }
};

export default errorHandler;
