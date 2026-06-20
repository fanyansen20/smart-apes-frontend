// react & Next js
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// hooks
import useHandleSignIn from "@hooks/login/useHandleSignIn";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// Mui Material
import {
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

// styles
import classes from "./_ModalLogin.module.scss";

// components
import PasswordVisibilityIcon from "@components/buttons/PasswordVisibility";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * @param {{
 * isOpen : Boolean
 * path : string
 * closeModal : () => ()
 * }} props
 * @returns
 */

const ModalLogin = ({ isOpen, closeModal, path }) => {
  const route = useRouter();
  const { handleSignIn } = useHandleSignIn({
    errorMassage: handlerErrorMessage,
    redirectTo: handlerRedirect,
  });

  const captchaRef = useRef(null);
  const tokenCaptcha = captchaRef?.current?.getValue() || "this is captcha";

  const linkRegister = !path ? "" : `?callback=${encodeURIComponent(path)}`;

  const { handleSubmit, register, watch, reset, setValue } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      isCaptcha: false,
      errorMessage: "",
    },
  });

  const { email, password, isCaptcha, errorMessage } = watch();
  const isDisabledButton = !email || !password || !isCaptcha || errorMessage;

  const [passwordVisible, setPasswordVisible] = useState("password");

  useEffect(() => {
    setValue("errorMessage", "");
  }, [email, password]);

  function handlerErrorMessage() {
    setValue("errorMessage", "Invalid email or password");
    setValue("isCaptcha", false);
    captchaRef.current.reset();
  }

  function handlerRedirect() {
    route.push(path);
  }

  function passwordVisibilityHandler() {
    if (passwordVisible === "password") {
      setPasswordVisible("text");
      return;
    }

    setPasswordVisible("password");
  }

  function changeCaptcha() {
    setValue("isCaptcha", true);
    setValue("errorMessage", "");
  }

  function handlerCloseModal() {
    reset();
    closeModal();
  }

  function loginSubmit() {
    handleSignIn({ email, password, tokenCaptcha });
  }

  return (
    <Modal onClose={handlerCloseModal} open={isOpen}>
      <Box className={classes.containerModalLogin}>
        <section className={classes.headerModal}>
          <h2>You must Sign In to Proceed</h2>
          <p>Please fill in the login form or you can Sign Up</p>
        </section>

        <Grid container direction="column" gap={2} alignItems="center">
          <Grid container>
            <InputLabel htmlFor="input-text-email">Email</InputLabel>
            <TextField
              fullWidth
              {...register("email")}
              id="input-text-email"
              labelText="Email Address"
              placeholder="you@example.com"
              type="email"
            />
          </Grid>

          <Grid container>
            <InputLabel htmlFor="input-text-password">Email</InputLabel>
            <TextField
              id="input-text-password"
              fullWidth
              {...register("password")}
              labelText="Email Address"
              placeholder="***************"
              type={passwordVisible}
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
          </Grid>

          <Grid item alignSelf="flex-end">
            <Link href="/forgot-password">
              <a>
                <TextButton>Forgot Password?</TextButton>
              </a>
            </Link>
          </Grid>

          <ReCAPTCHA
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            onChange={() => changeCaptcha()}
          />

          {errorMessage && (
            <Grid item alignSelf="flex-start">
              <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
            </Grid>
          )}

          <PrimaryButton
            onClick={handleSubmit(loginSubmit)}
            fullWidth
            disabled={isDisabledButton}
          >
            Login
          </PrimaryButton>

          <section className={classes.additionalLink}>
            <p>
              Don’t have account?&nbsp;
              <Link
                href={`/register${linkRegister}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <a className={classes.registerLik}>Sign Up</a>
              </Link>
            </p>
          </section>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalLogin;
