// Next
import Image from "next/image";

// React
import { memo, useEffect, useRef, useState } from "react";

// Mui
import { Container, Grid, Typography } from "@mui/material";

// Icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailLightIcon from "@public/assets/icons/icon-email-light.svg";

// Image
import illustrationStartChat from "@public/assets/images/illustration-start-chat.svg";

// hooks
import useChangeFormValue from "@hooks/contact-us/useChangeFormValue";
import useSendContactUse from "@hooks/contact-us/useSendContactUse";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLayout({}));
  }, []);

  const initialState = {
    firstName: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    lastName: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    phoneNumber: {
      value: "",
      isValid: true,
      errorMessage: "",
    },
    message: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  };

  const inputFormLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Message",
  };

  const captchaRef = useRef(null);
  const [isCaptchaClicked, setIsCaptchaClicked] = useState(false);

  const { handlerSendEmail } = useSendContactUse();
  const { formInput, handlerChangeForm, setFormInput } =
    useChangeFormValue(initialState);

  const isButtonDisabled = () => {
    const hasError = Object.values(formInput).some(
      (formInputItem) => !formInputItem.isValid
    );

    if (!hasError && isCaptchaClicked) return false;

    return true;
  };

  return (
    <Container className="container-contact-us" maxWidth="lg">
      <Grid container justifyContent="space-between">
        <Grid item container md={7} className="overviewContactUs" gap="32px">
          <Grid item md={10} className="headerContactUs">
            <Typography className="titleContact">Contact Us</Typography>
            <Typography className="bodyContact">
              {`Got questions or feedback? We're here to help, Reach out to us
              anytime! Your input are valuable to us, we also committed to
              provide the support you need. Feel free to contact us!`}
            </Typography>
          </Grid>

          <Grid item md={10} className="socialMediaContact">
            <Grid
              item
              container
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              <Grid justifyContent="center" item md={1.5}>
                <PrimaryButton text={<WhatsAppIcon color="inherit" />} />
              </Grid>
              <Grid item md={8}>
                <Typography className="whatsappTitle">
                  Message us on WhatsApp
                </Typography>
              </Grid>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item md={1.5}>
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
              <Grid item md={8}>
                <Typography className="titleEmail">Email us on</Typography>
                <Typography className="emailBody">cs@smartapes.sg</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Image src={illustrationStartChat} alt="illustration char" />
          </Grid>
        </Grid>

        <Grid item md={5} container direction="column" gap="15px">
          <Grid container justifyContent="space-between">
            <Grid item md={5.8}>
              <TextBox
                labelText="First Name*"
                placeholder="First Name"
                value={formInput["firstName"].value}
                onChange={(event) =>
                  handlerChangeForm({ event, inputFormLabels })
                }
                name="firstName"
                errorText={formInput["firstName"].errorMessage}
              />
            </Grid>
            <Grid item md={5.8}>
              <TextBox
                labelText="Last Name*"
                placeholder="Last Name"
                value={formInput["lastName"].value}
                onChange={(event) =>
                  handlerChangeForm({ event, inputFormLabels })
                }
                name="lastName"
                errorText={formInput["lastName"].errorMessage}
              />
            </Grid>
          </Grid>

          <TextBox
            labelText="Email*"
            placeholder="you@example.com"
            value={formInput["email"].value}
            onChange={(event) => handlerChangeForm({ event, inputFormLabels })}
            name="email"
            errorText={formInput["email"].errorMessage}
          />

          <TextBox
            labelText="Phone"
            placeholder="Your phone number"
            value={formInput["phoneNumber"].value}
            onChange={(event) => handlerChangeForm({ event, inputFormLabels })}
            name="phoneNumber"
          />

          <TextBox
            labelText="Your Message*"
            placeholder="Type your message here"
            multiline
            rows={4}
            value={formInput["message"].value}
            onChange={(event) => handlerChangeForm({ event, inputFormLabels })}
            name="message"
            errorText={formInput["message"].errorMessage}
          />
          <center>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              onChange={() => setIsCaptchaClicked(true)}
              ref={captchaRef}
            />
          </center>

          <PrimaryButton
            onClick={() => {
              handlerSendEmail({
                captchaRef,
                formInput,
                setIsCaptchaClicked,
              });
              setFormInput(initialState);
            }}
            fullWidth={true}
            disabled={isButtonDisabled()}
            text="Submit"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(ContactUs);
