//Next Auth
import { signIn } from "next-auth/react";

/**
 * @param {{
 * errorMassage : () => {}
 * redirectTo : () => {}
 * }} props
 * @returns
 */

const useHandleSignIn = ({ errorMassage, redirectTo }) => {
  /**
   *
   * @param {{
   * email: string
   * password: string
   * tokenCaptcha: string
   * }} props
   * @returns
   */

  const handleSignIn = async ({ email, password, tokenCaptcha }) => {
    const payload = {
      email,
      password,
      tokenCaptcha,
      redirect: false,
    };

    const response = await signIn("credentials", payload);

    if (response?.error) return errorMassage();

    return redirectTo();
  };

  return {
    handleSignIn,
  };
};

export default useHandleSignIn;
