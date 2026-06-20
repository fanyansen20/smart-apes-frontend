// React
import React, { useRef, useState } from "react";
// Next
import Image from "next/image";

// Mui
import { Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";

// Image
import illustrationStartChat from "@public/assets/images/illustration-start-chat.svg";
// Icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailLightIcon from "@public/assets/icons/icon-email-light.svg";

// Styling
import classes from "./_contact-us.module.scss";

// Libs
import useSendContactUse from "@hooks/contact-us/useSendContactUse";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useController, useForm } from "react-hook-form";

const ContactUs = () => {
  const { handlerSendEmail } = useSendContactUse();
  // #region State Initialization
  const captchaRef = useRef(null);
  const [isCaptchaClicked, setIsCaptchaClicked] = useState(false);
  // #endregion

  // #region Form State Initialization
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { field: firstNameField } = useController({
    control,
    name: "firstName",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
  });
  const { field: lastNameField } = useController({
    control,
    name: "lastName",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
  });
  const { field: emailField } = useController({
    control,
    name: "email",
    defaultValue: "",
    rules: {
      validate: {
        isEmail: (recipient) =>
          recipient.includes("@") || "Invalid email format",
      },
      required: "This field is required",
    },
  });
  const { field: phoneField } = useController({
    control,
    name: "phoneNumber",
    defaultValue: "",
    rules: {
      validate: {
        maxPhoneLength: (phoneNumber) =>
          phoneNumber.length <= 12 || "Must Not Exceed 12 Digit Limit",
      },
    },
  });
  const { field: messageField } = useController({
    control,
    name: "message",
    defaultValue: "",
    rules: {
      required: "This field is required",
    },
  });
  // #endregion

  // #region Function
  /**
   * @typedef {{
   * firstName : string
   * lastName : string
   * email : string
   * phoneNumber : number
   * message : string
   * }} formData
   */

  /**
   *
   * @param {formData:formData} props
   */
  const onSubmit = (formData) => {
    const modifiedData = {
      firstName: { value: formData.firstName },
      lastName: { value: formData.lastName },
      email: { value: formData.email },
      phoneNumber: { value: formData.phoneNumber },
      message: { value: formData.message },
    };

    try {
      handlerSendEmail({
        captchaRef,
        formInput: modifiedData,
        setIsCaptcha: setIsCaptchaClicked,
      });
    } catch {
    } finally {
      reset();
    }
  };
  // #endregion

  return (
    <Grid container xs={12} gap={3} p={3}>
      {/* Header Section */}
      <Grid
        container
        xs={12}
        className={classes.container}
        gap={2}
        justifyContent={"center"}
      >
        <Image src={illustrationStartChat} alt="Contact Image" />
        <Typography className={classes.pageTitle}>Contact Us</Typography>
        <Typography>
          Got questions or feedback? We&apos;re here to help, Reach out to us
          anytime! Your input are valuable to us, we also committed to provide
          the support you need. Feel free to contact us!
        </Typography>
      </Grid>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={2} justifyContent={"center"}>
          <TextBox
            {...firstNameField}
            labelText="First Name*"
            placeholder="First Name"
            errorText={errors[firstNameField.name]?.message}
          />

          <TextBox
            {...lastNameField}
            labelText="Last Name*"
            placeholder="Last Name"
            errorText={errors[lastNameField.name]?.message}
          />

          <TextBox
            {...emailField}
            labelText="Email*"
            placeholder="you@example.com"
            errorText={errors[emailField.name]?.message}
          />

          <TextBox
            {...phoneField}
            type="number"
            labelText="Phone"
            placeholder="Your Phone Number"
            errorText={errors[phoneField.name]?.message}
          />

          <TextBox
            {...messageField}
            multiline
            rows={6}
            labelText="Your Message*"
            placeholder="Type Your Message Here"
            errorText={errors[messageField.name]?.message}
          />

          <ReCAPTCHA
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            onChange={() => setIsCaptchaClicked(true)}
          />

          <PrimaryButton
            type="submit"
            disabled={!isCaptchaClicked}
            fullWidth
            text="Submit"
          />
        </Grid>
      </form>

      {/* Icon Section */}
      <Grid container className={classes.socialMediaSection} gap={2}>
        <Grid
          container
          alignItems="center"
          direction={"row"}
          xs={12}
          gap={2}
          className={classes.socialMediaContainer}
          onClick={() =>
            (window.location =
              "https://wa.me/65123123123?text=smart%20apes%20test")
          }
        >
          <Grid item justifyContent="center" xs={1.5}>
            <PrimaryButton text={<WhatsAppIcon color="inherit" />} />
          </Grid>

          <Grid item xs={8}>
            <Typography className={classes.whatsappTitle}>
              Message us on WhatsApp
            </Typography>
          </Grid>
        </Grid>

        <Link href="mailto:cs@smartapes.sg">
          <Grid
            container
            alignItems="center"
            direction={"row"}
            xs={12}
            gap={2}
            className={classes.socialMediaContainer}
          >
            <Grid item justifyContent="center" xs={1.5}>
              <PrimaryButton
                text={
                  <Image
                    width={24}
                    height={24}
                    src={EmailLightIcon}
                    alt="email Icon"
                  />
                }
              />
            </Grid>

            <Grid item xs={8}>
              <Typography className={classes.titleEmail}>
                Email us on
              </Typography>
              <Typography>cs@smartapes.sg</Typography>
            </Grid>
          </Grid>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
