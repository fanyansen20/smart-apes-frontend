//React
import { memo, useEffect, useRef, useState } from "react";

///Next.js Components
import Link from "next/link";
import { useRouter } from "next/router";
//Next Auth
import { useSession } from "next-auth/react";

//Material UI
import { Box, Typography } from "@mui/material";

//Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import AuthLayout from "@layout/AuthLayout";
import AuthenticationSuccess from "@layout/Register/WaitingConfirmationEmail/WaitingConfirmationEmail";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

//Images
import TextBox from "@components/shared/TextBox/TextBox";
import { EMAIL_ERROR_MSG, EMAIL_FORMAT } from "constant/userForm";
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

// styles
import classes from "./_ForgotPasswordMobile.module.scss";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSession();
  const emailInput = useRef();
  const [handleError, setHandleError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    dispatch(isLayout({ isNavbar: false, isFooter: false }));
  }, []);

  useEffect(() => {
    if (status == "authenticated") router.replace("/");
  }, [status, router]);

  const emailIsValid = (emailInputValue) => {
    if (!emailInputValue) {
      setHandleError(EMAIL_ERROR_MSG.IS_EMPTY);
    } else if (!emailInputValue?.match(EMAIL_FORMAT)) {
      setHandleError(EMAIL_ERROR_MSG.IS_INVALID);
    } else {
      setHandleError(null);
    }

    return emailInputValue && emailInputValue?.match(EMAIL_FORMAT);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (emailIsValid(emailInput.current.value)) {
      const email = {
        email: emailInput.current.value,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/user-auth/forgot-password`,
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        setHandleError(EMAIL_ERROR_MSG.IS_NOT_FOUND);
      }
    }
  };

  const emailOnChange = (e) => {
    if (e.target.value?.length > 0) {
      emailIsValid(e.target.value);
    }
  };

  const content = (
    <Box
      className={classes.containerForgetPasswordMobile}
      component="form"
      onSubmit={submitHandler}
    >
      <ParentCentreLogo />
      <Box>
        <Typography className={classes.title}>Forgot Password</Typography>
      </Box>
      <Box>
        <Typography className={classes.inputLabel}>Email Address</Typography>
        <TextBox
          fullWidth
          placeholder="you@example.com"
          inputRef={emailInput}
          onChange={emailOnChange}
        />
      </Box>
      {handleError && (
        <Box>
          <Typography sx={{ color: "red" }}>{handleError}</Typography>
        </Box>
      )}

      <PrimaryButton type="submit" size="large" fullWidth text="Submit" />

      <div className={classes.loginLinkDiv}>
        <Typography className={classes.loginText}>
          Already have an account?
        </Typography>
        <Link href="/login">
          <Typography className={classes.loginLink}>Sign in</Typography>
        </Link>
      </div>
    </Box>
  );

  return (
    <AuthLayout>
      {!success && content}
      {success && <AuthenticationSuccess />}
    </AuthLayout>
  );
};

export default memo(ForgotPassword);
