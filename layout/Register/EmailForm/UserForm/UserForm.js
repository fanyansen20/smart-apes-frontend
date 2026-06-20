//React
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Material UI
import { Box, Grid, InputAdornment, Stack, Typography } from "@mui/material";

// Hooks
import useDebounce from "@hooks/use-debounce";

// helper
import { isValidPhoneNumberType } from "@helper/checkValue";
import { yupResolver } from "@hookform/resolvers/yup";
import { parsePhoneNumber } from "awesome-phonenumber";
import { validateEmail, validatePhoneNumber } from "services/validateService";

//Password Strength Bar
// import PasswordStrengthBar from "react-password-strength-bar";

//Components
import PasswordVisibilityIcon from "@components/buttons/PasswordVisibility";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// Icon
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TextBox from "@components/shared/TextBox/TextBox";
import { EMAIL_ERROR_MSG } from "constant/userForm";
import { userFormSchema } from "utils/user-form/validationSchema";

const UserForm = ({
  user,
  nextHandler,
  setTermAndCondition,
  setNextClicked,
}) => {
  const {
    getValues,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.inputNumber ?? "",
      password: user?.password ?? "",
      confirmPassword: user?.password ?? "",
      countryCodeNumber: "+65",
      country_id: "SG",
      language_id: "EN",
      register_with_child: false,
    },
    resolver: yupResolver(userFormSchema),
  });

  const {
    firstName,
    lastName,
    email,
    // countryCodeNumber,
    phoneNumber,
    password,
  } = getValues();

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    "confirm-password": false,
  });

  const validateEmailService = useCallback(async () => {
    if (!errors?.email?.message && email) {
      const isExistEmail = await validateEmail(email);

      if (!isExistEmail) {
        setError("email", {
          message: EMAIL_ERROR_MSG.IS_EXIST,
        });
      }
    }
  }, [email]);

  useDebounce(validateEmailService);

  const validatePhoneNumberService = useCallback(async () => {
    const validate = parsePhoneNumber(`+65${phoneNumber}`);

    if (!validate.valid && phoneNumber !== "") {
      return setError("phoneNumber", {
        message: "Phone number not valid",
      });
    }

    const isExistPhoneNumber = await validatePhoneNumber({
      value: phoneNumber,
    });

    if (isExistPhoneNumber) {
      setError("phoneNumber", {
        message: "Phone number already taken",
      });
    }
  }, [phoneNumber]);

  useDebounce(validatePhoneNumberService);

  const handlerChangePhoneNumber = (e) => {
    const { name, value } = e.target;

    if (isValidPhoneNumberType(value)) {
      setValue(name, value, { shouldValidate: true });
    }
  };

  const handlerChangeInputField = (e) => {
    const { name, value } = e.target;
    setValue(name, value, { shouldValidate: true });
  };

  const onSubmit = () => {
    const payloadUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      inputNumber: phoneNumber,
      countryCodeNumber: "+65",
      country_id: "SG",
      language_id: "EN",
      register_with_child: false,
    };

    nextHandler(payloadUser, true);
    setTermAndCondition(true);
    setNextClicked(false);
  };

  return (
    <Grid className="formUserMenu" gap={4}>
      <ParentCentreLogo />
      <Grid container alignItems="center">
        <Typography className="title">Fill your Information</Typography>
      </Grid>

      <Stack spacing={3}>
        <TextBox
          labelText="*First Name"
          placeholder="First Name"
          name="firstName"
          onChange={handlerChangeInputField}
          value={watch("firstName")}
          errorText={errors?.firstName?.message}
        />

        <TextBox
          labelText="*Last Name"
          placeholder="Last Name"
          name="lastName"
          value={watch("lastName")}
          onChange={handlerChangeInputField}
          errorText={errors?.lastName?.message}
        />

        <TextBox
          labelText="*Email Address"
          placeholder="Email Address"
          name="email"
          value={watch("email")}
          errorText={errors?.email?.message}
          onChange={handlerChangeInputField}
        />

        <TextBox
          labelText="*Country"
          placeholder="First Name"
          disabled
          value="Singapore"
        />

        <TextBox
          labelText="*Phone Number"
          placeholder="Phone Number"
          name="phoneNumber"
          value={watch("phoneNumber")}
          onChange={handlerChangePhoneNumber}
          errorText={errors?.phoneNumber?.message}
          InputProps={{
            maxLength: 12,
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    overflow: "hidden",
                    color: "#626262",
                    background: "#F5F5F5",
                    padding: "16px 8px ",
                    marginLeft: -1.6,
                  }}
                >
                  +65
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <TextBox
          labelText="*Password"
          placeholder="********"
          errorText={errors?.password?.message}
          name="password"
          value={watch("password")}
          onChange={handlerChangeInputField}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() =>
                  setIsPasswordVisible((prev) => ({
                    ...prev,
                    password: !isPasswordVisible.password,
                  }))
                }
              >
                <PasswordVisibilityIcon visible={isPasswordVisible.password} />
              </InputAdornment>
            ),
          }}
          type={!isPasswordVisible.password && "password"}
        />

        <TextBox
          labelText="*Confirm Password"
          placeholder="********"
          name="confirmPassword"
          value={watch("confirmPassword")}
          errorText={errors?.confirmPassword?.message}
          onChange={handlerChangeInputField}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() =>
                  setIsPasswordVisible((prev) => ({
                    ...prev,
                    "confirm-password": !isPasswordVisible["confirm-password"],
                  }))
                }
              >
                <PasswordVisibilityIcon
                  visible={isPasswordVisible["confirm-password"]}
                />
              </InputAdornment>
            ),
          }}
          type={!isPasswordVisible["confirm-password"] && "password"}
        />

        <PrimaryButton
          disabled={errors?.email?.message || errors?.phoneNumber?.message}
          text="Next"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          size="large"
        />
      </Stack>
    </Grid>
  );
};

export default UserForm;
