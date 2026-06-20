import errorHandler from "@helper/errorHandler/errorHandler";
import { useEffect, useState } from "react";
import useNotification from "./useNotification";

const useErrorHandler = () => {
  const [_msg, sendNotification] = useNotification();
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      const errMessage = errorHandler(error);
      sendNotification({
        msg: [errMessage],
        variant: "error",
      });
    }
    return () => setError();
  }, [error]);

  return { handleClientError: setError };
};

export default useErrorHandler;
