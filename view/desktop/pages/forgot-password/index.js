//React
import { memo, useEffect, useRef, useState } from "react";

///Next.js Components
import Link from "next/link";
import { useRouter } from "next/router";
//Next Auth
import { useSession } from "next-auth/react";

//Material UI
import {
  Box,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";

//Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import AuthLayout from "@layout/AuthLayout";
import AuthenticationSuccess from "@layout/Register/WaitingConfirmationEmail/WaitingConfirmationEmail";

//Images
import { EMAIL_ERROR_MSG, EMAIL_FORMAT } from "constant/userForm";
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["Mulish"].join(","),
    color: "#333333",
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 700,
    },
  },
});

const InputTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#A5C5F5",
    },
    "&:hover fieldset": {
      borderColor: "#A5C5F5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});

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
      className="forgotPasswordDiv"
      component="form"
      onSubmit={submitHandler}
    >
      <Box>
        <Typography className="title">Forgot Password</Typography>
      </Box>
      <Box>
        <Typography className="inputLabel">Email Address</Typography>
        <InputTextField
          fullWidth
          placeholder="you@example.com"
          inputRef={emailInput}
          onChange={emailOnChange}
          className="formInput"
        />
      </Box>
      {handleError && (
        <Box>
          <Typography sx={{ color: "red" }}>{handleError}</Typography>
        </Box>
      )}

      <PrimaryButton type="submit" size="large" fullWidth text="Submit" />

      <div className="additionalLinkDiv">
        <div className="loginLinkDiv">
          <Typography className="loginText">
            Already have an account ?
          </Typography>
          <Link href="/login">
            <Typography className="loginLink">Sign in</Typography>
          </Link>
        </div>
      </div>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthLayout>
        {!success && content}
        {success && <AuthenticationSuccess />}
      </AuthLayout>
      {/* <Grid container className="gridContainer">
        <Grid className="leftDiv">
          <div className="imageDiv"></div>
        </Grid> */}
      {/* <Grid className="rightDiv"></Grid> */}
      {/* </Grid> */}
    </ThemeProvider>
  );
};

export default memo(ForgotPassword);
