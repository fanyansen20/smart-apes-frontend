import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

// Components
import AlertComponent from "@components/shared/Alert/AlertComponents";

// Icon
import CloseIcon from "@mui/icons-material/Close";

const useNotification = () => {
  const [conf, setConf] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <>
      <CloseIcon
        className="closeIconComponent"
        onClick={() => closeSnackbar(key)}
      />
    </>
  );

  useEffect(() => {
    if (conf?.msg) {
      let variant = "success";
      const className = "AlertComponent";
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(<AlertComponent title={variant} subTitles={conf.msg} />, {
        variant,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        action,
        className,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;
