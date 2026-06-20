//React
import { memo, useEffect, useRef, useState } from "react";

///Next.js
import Link from "next/link";
import { useRouter } from "next/router";

// redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Next Auth
import { signIn } from "next-auth/react";

//Material UI
import {
  Alert,
  Box,
  Grid,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";

// Components
import PasswordVisibilityIcon from "@components/buttons/PasswordVisibility";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";
import AuthLayout from "@layout/AuthLayout";
import ReCAPTCHA from "react-google-recaptcha";

// hooks
import { useForm } from "react-hook-form";

// validate
import { EMAIL_ERROR_MSG, EMAIL_FORMAT } from "constant/userForm";

const Login = () => {
  const sitekey = {
    sitekey: process.env.NEXT_PUBLIC_SITE_KEY,
  };

  const { handleSubmit, setValue } = useForm({
    email: "",
    password: "",
  });

  const captchaRef = useRef(null);
  const router = useRouter();
  const callbackPath = router?.query?.callback;

  const isSandbox = process.env.NEXT_PUBLIC_IS_SANDBOX;

  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState();

  const [isAcceptCaptcha, setIsAcceptCaptcha] = useState(false);
  const [errorMassage, setErrorMessage] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    dispatch(
      isLayout({
        isNavbar: false,
        isFooter: false,
      })
    );
  }, []);

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

    if (!isAcceptCaptcha && !isSandbox) {
      return setErrorMessage("You must fill the captcha");
    }

    if (email || validEmail || password) {
      const tokenCaptcha = captchaRef?.current?.getValue() || "thisiscaptcha";
      const response = await signIn("credentials", {
        email,
        password,
        tokenCaptcha,
        redirect: false,
      });

      if (response.error) {
        captchaRef?.current?.reset();
        setIsAcceptCaptcha(false);
        setErrorMessage("Invalid email or password");
        return;
      }

      if (callbackPath) {
        return router.push(decodeURIComponent(callbackPath));
      }

      router.push("/");
      setIsLoadingLogin(true);
    }
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
        <Grid className="loginDiv">
          <Grid>
            <Typography className="welcomeBack">Welcome back 👋</Typography>
            <Typography className="title">Login to your account</Typography>
          </Grid>

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

          {errorMassage && (
            <Box>
              <Typography sx={{ color: "red" }}>{errorMassage}</Typography>
            </Box>
          )}

          {!isSandbox && (
            <Grid container justifyContent="center">
              <ReCAPTCHA
                {...sitekey}
                ref={captchaRef}
                onChange={() => {
                  setIsAcceptCaptcha(true);
                }}
              />
            </Grid>
          )}

          <PrimaryButton
            onClick={handleSubmit(handlerSignIn)}
            isLoading={isLoadingLogin}
            size="large"
            text="Login"
            fullWidth
          />

          <div className="additionalLinkDiv">
            <div className="registerLinkDiv">
              <Typography className="registerText">
                Dont have an account ?
              </Typography>

              <Link href="/register">
                <a>
                  <Typography className="registerLink">Sign up</Typography>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/forgot-password">
                <a>
                  <Typography className="forgotPasswordLink">
                    Forgot Password
                  </Typography>
                </a>
              </Link>
            </div>
          </div>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default memo(Login);
