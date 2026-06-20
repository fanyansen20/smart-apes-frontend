// react
import { useEffect } from "react";

//Next JS
import Image from "next/image";
import { useRouter } from "next/router";

//Material UI
import { Typography } from "@mui/material";

//Images
import mail from "public/assets/images/waiting-confirmation-email.svg";

// hooks
import useLoginCallback from "../../../hooks/useLoginCallback";

// Comp
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

const WaitingConfirmationEmail = () => {
  const router = useRouter();

  const handleLoginCallback = useLoginCallback();

  useEffect(() => {
    setTimeout(() => {
      if (router?.query?.callback) {
        return handleLoginCallback(router?.query?.callback);
      }

      router.push("login");
    }, 3000);
  }, []);

  return (
    <div className="waitingDiv">
      <ParentCentreLogo />

      <Image src={mail} alt="mail" />
      <div className="waitingText">
        <Typography className="waitingTextHeader">
          Waiting for Confirmation
        </Typography>
        <Typography className="waitingTextContent">
          Please check your email for your account confirmation
        </Typography>
      </div>
    </div>
  );
};

export default WaitingConfirmationEmail;
