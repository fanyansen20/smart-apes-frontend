import axios from "axios";

import useNotification from "@hooks/useNotification";

const useSendContactUse = () => {
  const [_msg, sendNotification] = useNotification();

  const handlerSendEmail = async ({ captchaRef, formInput, setIsCaptcha }) => {
    const payload = {
      first_name: formInput.firstName.value,
      last_name: formInput.lastName.value,
      email: formInput.email.value,
      message: formInput.message.value,
    };

    if (formInput.phoneNumber.value) {
      payload = {
        ...payload,
        phone_number: formInput.phoneNumber.value,
      };
    }

    const captchaToken = captchaRef.current.getValue();

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/support/contact-us`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Captcha-Token": captchaToken,
        },
      }
    );

    if (result.status === 200) {
      sendNotification({
        msg: ["Your Message has been submitted, Please check your email"],
      });
    }

    setIsCaptcha(false);
    captchaRef.current.reset();
  };

  return { handlerSendEmail };
};

export default useSendContactUse;
