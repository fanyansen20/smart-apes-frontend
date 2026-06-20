//React
import { memo, useEffect, useState } from "react";

// helper
import * as Yup from "yup";

// hooks
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "@hooks/useNotification";
import { useForm } from "react-hook-form";

///Next.js Components
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

//Material UI
import { Grid, InputAdornment, Typography } from "@mui/material";

//Components
import PasswordVisibilityIcon from "@components/buttons/PasswordVisibility";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";
import AuthLayout from "@layout/AuthLayout";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// constant
import { API_FETCH_STATUS } from "constant/api";
import {
  CONFIRM_PASSWORD_ERROR_MSG,
  PASSWORD_ERROR_MSG,
  PASSWORD_RULES,
  USER_FORM_FIELDS,
} from "constant/userForm";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { checkTokenResetPassword } from "store/reducer/checkTokenResetPassword/checkTokenResetPasswordSlice";
import { isLayout } from "store/reducer/layout/layoutSlice";
import { resetPassword } from "store/reducer/resetPassword/resetPasswordSlice";

// style
import classes from "./_ResetPasswordMobile.module.scss";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required(PASSWORD_ERROR_MSG.IS_EMPTY)
    .min(PASSWORD_RULES.MINIMUM_LENGTH, PASSWORD_ERROR_MSG.IS_LOWER_THAN_MIN)
    .max(PASSWORD_RULES.MAXIMUM_LENGTH, PASSWORD_ERROR_MSG.IS_EXCEED_MAX)
    .matches(
      PASSWORD_RULES.IS_CONTAIN_LOWERCASE,
      PASSWORD_ERROR_MSG.SHOULD_HAS_LOWERCASE
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_UPPERCASE,
      PASSWORD_ERROR_MSG.SHOULD_HAS_UPPERCASE
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_NUMBER,
      PASSWORD_ERROR_MSG.SHOULD_HAS_NUMBER
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_SPECIAL,
      PASSWORD_ERROR_MSG.SHOULD_HAS_SPECIAL
    ),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD_ERROR_MSG.IS_EMPTY)
    .oneOf(
      [Yup.ref(USER_FORM_FIELDS.PASSWORD)],
      CONFIRM_PASSWORD_ERROR_MSG.SHOULD_MATCH
    ),
});

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = router.query;
  const { status } = useSession();
  const { status: statusCheckingToken } = useSelector(
    (state) => state.checkTokenResetPassword
  );
  const { status: statusResetPassword, error: errorResetPassword } =
    useSelector((state) => state.resetPassword);
  const [_msg, sendNotification] = useNotification();
  const {
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    dispatch(isLayout({ isNavbar: false, isFooter: false }));
  }, []);

  useEffect(() => {
    if (
      !router.asPath.includes("token") ||
      (Object.keys(router?.query).length > 0 && !token)
    ) {
      router.push("/login");
    }

    if (
      router.asPath.includes("token") &&
      Object.keys(router?.query).length > 0 &&
      token
    ) {
      dispatch(checkTokenResetPassword({ token }));
    }
  }, [router]);

  useEffect(() => {
    if (statusResetPassword === API_FETCH_STATUS.IS_SUCCESS) {
      router.replace(
        {
          pathname: "/login",
          query: {
            snackbarStatus: "success",
            snackbarMessage: "Your Password has been changed",
          },
        },
        "/login"
      );
    }

    if (statusResetPassword === API_FETCH_STATUS.IS_FAILED) {
      sendNotification({
        variant: "error",
        msg: [errorResetPassword],
      });
    }
  }, [statusResetPassword]);

  useEffect(() => {
    if (statusCheckingToken === API_FETCH_STATUS.IS_FAILED) {
      router.push("/reset-password-failed");
    }
  }, [statusCheckingToken]);

  useEffect(() => {
    if (status == "authenticated") router.replace("/");
  }, [status, router]);

  const passwordVisibilityHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  const confirmPasswordVisibilityHandler = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlerChangeInput = (event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true });
  };

  const submitHandler = async (data) => {
    const password = data.password;

    dispatch(resetPassword({ token, payload: { password } }));
  };

  if (statusCheckingToken === "succeeded") {
    return (
      <AuthLayout>
        <Grid className={classes.containerForgetPassword}>
          <ParentCentreLogo />

          <Grid>
            <Typography className={classes.title}>
              Change New Password
            </Typography>
          </Grid>

          <TextBox
            name="password"
            labelText="*Password"
            placeholder="********"
            onChange={handlerChangeInput}
            value={watch("password")}
            type={!passwordVisible && "password"}
            errorText={errors?.password?.message}
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

          <TextBox
            name="confirmPassword"
            labelText="*Confirm Password"
            placeholder="********"
            onChange={handlerChangeInput}
            value={watch("confirmPassword")}
            type={!confirmPasswordVisible && "password"}
            errorText={errors?.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={confirmPasswordVisibilityHandler}
                >
                  <PasswordVisibilityIcon visible={confirmPasswordVisible} />
                </InputAdornment>
              ),
            }}
          />

          <PrimaryButton
            fullWidth
            size="large"
            text="Submit"
            onClick={handleSubmit(submitHandler)}
            disabled={statusResetPassword === API_FETCH_STATUS.IS_LOADING}
            isLoading={statusResetPassword === API_FETCH_STATUS.IS_LOADING}
          />
        </Grid>
      </AuthLayout>
    );
  }
};

export default memo(ForgotPassword);
