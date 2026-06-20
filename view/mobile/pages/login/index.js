//React
import useHandleSignIn from "@hooks/login/useHandleSignIn";
import { memo, useEffect, useRef, useState } from "react";

///Next.js
import Link from "next/link";
import { useRouter } from "next/router";

// redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Next Auth
import { useSession } from "next-auth/react";

//Material UI
import { Alert, Grid, InputAdornment, Snackbar } from "@mui/material";

// Components
import PasswordVisibilityIcon from "@components/buttons/PasswordVisibility";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";
import AuthLayout from "@layout/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";
import AlertMobile from "view/mobile/components/AlertMobile/AlertMobile";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// hooks
import { useForm } from "react-hook-form";

// helper
import backToPrevLink from "helper/backToPrevLink";

// validate
import { EMAIL_ERROR_MSG, EMAIL_FORMAT } from "constant/userForm";

// classes
import classes from "./_LoginMobile.module.scss";

const Login = () => {
  const sitekey = {
    sitekey: process.env.NEXT_PUBLIC_SITE_KEY,
  };

  const { handleSignIn } = useHandleSignIn({
    errorMassage: handleLoginError,
    redirectTo: handlerRedirect,
  });

  const { handleSubmit, setValue, watch } = useForm({
    email: "",
    password: "",
  });

  const captchaRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState();

  const { status } = useSession();

  const [isAcceptCaptcha, setIsAcceptCaptcha] = useState(false);
  const [errorMassage, setErrorMessage] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { email, password } = watch();
  useEffect(() => {
    dispatch(
      isLayout({
        isNavbar: false,
        isFooter: false,
      })
    );
  }, []);

  useEffect(() => {
    if (status == "authenticated") {
      backToPrevLink({ router });
    }
  }, [status, router]);

  useEffect(() => {
    if (router.isReady) {
      const snackBar = {
        status: router.query.snackbarStatus,
        message: router.query.snackbarMessage,
      };
      setSnackbar(snackBar);

      if (snackBar.status) {
        setOpenSnackBar(true);
      }
    }
  }, [router]);

  const passwordVisibilityHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handlerChangeInputField = (e) => {
    const { name, value } = e.target;

    setValue(name, value);
    setErrorMessage(false);
  };

  function handleLoginError() {
    captchaRef.current.reset();
    setIsAcceptCaptcha(false);
    setErrorMessage("Invalid email or password. Try Again");
    setIsLoadingLogin(false);
  }

  function handlerRedirect() {
    const callbackPath = router?.query?.callback;

    if (callbackPath) {
      router.push(decodeURIComponent(callbackPath));
    } else {
      router.push("/");
    }
  }

  const handlerSignIn = async ({ email, password }) => {
    const validEmail = email.match(EMAIL_FORMAT);

    if (!email) {
      return setErrorMessage(EMAIL_ERROR_MSG.IS_EMPTY);
    }

    if (!validEmail) {
      return setErrorMessage(EMAIL_ERROR_MSG.IS_INVALID);
    }

    if (!password) {
      return setErrorMessage("Password cannot be empty");
    }

    if (email || validEmail || password) {
      const tokenCaptcha = captchaRef.current.getValue() || "thisiscaptcha";

      setIsLoadingLogin(true);
      await handleSignIn({ email, password, tokenCaptcha });
    }
  };

  const buttonCheck = () => {
    if (!email || !password || !isAcceptCaptcha) {
      return true;
    }

    return false;
  };

  return (
    <>
      {openSnackBar && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={snackbar.status}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}

      <AuthLayout>
        <Grid className={classes.containerLoginMobile}>
          <ParentCentreLogo />

          <section className={classes.title}>
            <p>Welcome back! 👋</p>
            <h1>Login to your parents account</h1>
          </section>

          {errorMassage && <AlertMobile type="error" message={errorMassage} />}

          <section className={classes.loginForm}>
            <TextBox
              labelText="Email Address"
              placeholder="you@example.com"
              name="email"
              type="email"
              onChange={handlerChangeInputField}
            />

            <TextBox
              labelText="Password"
              type={!passwordVisible && "password"}
              placeholder="Please enter your password"
              name="password"
              onChange={handlerChangeInputField}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={passwordVisibilityHandler}
                  >
                    <PasswordVisibilityIcon visible={passwordVisible} />
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.forgotPasswordLink}>
              <Link href="/forgot-password">
                <p>Forgot Password?</p>
              </Link>
            </div>
          </section>

          <Grid container justifyContent="center">
            <ReCAPTCHA
              {...sitekey}
              ref={captchaRef}
              onChange={() => {
                setIsAcceptCaptcha(true);
              }}
            />
          </Grid>

          <PrimaryButton
            onClick={handleSubmit(handlerSignIn)}
            isLoading={isLoadingLogin}
            disabled={buttonCheck()}
            size="large"
            text="Login"
            fullWidth
          />

          <div className={classes.registerText}>
            <p>Dont have an account ?</p>
            <Link href="/register">
              <p className={classes.registerLink}>Sign up</p>
            </Link>
          </div>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default memo(Login);
