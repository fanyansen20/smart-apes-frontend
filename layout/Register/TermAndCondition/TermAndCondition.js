import { useEffect, useRef, useState } from "react";

// material ui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";

// google captcha
import ReCAPTCHA from "react-google-recaptcha";

// helper
import API from "@helper/apiHelper";

// Icon
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Component
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// data term and condition
import useNotification from "@hooks/useNotification";
import { data } from "utils/terms-of-services/data";
import { ListInfo } from "utils/terms-of-services/styledComponents";

const TermAndCondition = ({
  user,
  setNextClicked,
  setRegisterSuccess,
  setTermAndCondition,
}) => {
  const [_msg, sendNotification] = useNotification();

  const captchaRef = useRef(null);

  const [dataUser, setDataUser] = useState(null);
  const [isTermsAccepted, setTermsIsAccepted] = useState(false);
  const [isPoliciesAccepted, setPoliciesIsAccepted] = useState(false);
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const [isAcceptCaptcha, setIsAcceptCaptcha] = useState(false);

  useEffect(() => {
    captchaRef.current.reset();
    const phoneCode = user.countryCodeNumber + user.inputNumber;
    user["phone_number"] = phoneCode;

    setDataUser(user);
  }, [user]);

  const backChildFromHandler = () => {
    setNextClicked(false);
    setTermAndCondition(false);
  };

  const handlerRegister = async (e) => {
    e.preventDefault();
    const { countryCodeNumber, inputNumber, ...newDataUser } = dataUser;

    const token = captchaRef.current.getValue();
    setIsLoadSubmit(true);

    try {
      const { status } = await API.post(
        "v1/user-auth/register",
        JSON.stringify(newDataUser),
        {
          headers: {
            "Content-Type": "application/json",
            "Captcha-Token": token,
          },
        }
      );

      if (status === 201) {
        setRegisterSuccess(true);
        setTermAndCondition(false);
      } else {
        captchaRef.current.reset();
      }
    } catch (error) {
      sendNotification({
        variant: "error",
        msg: [error?.response?.data?.message ?? "Something wrong in our side"],
      });
      console.error(error);
    } finally {
      setIsLoadSubmit(false);
    }
  };

  return (
    <Box className="termAndConditionContainer">
      <ParentCentreLogo />
      <Grid container alignItems="center" sx={{ margin: "20px 0" }}>
        <Grid className="termsArrowBack">
          <Button sx={{ color: "black" }}>
            <KeyboardArrowLeftIcon
              onClick={backChildFromHandler}
              className="arrowLeftIcon"
            />
          </Button>
        </Grid>
        <Grid>
          <Typography className="title">Terms and Conditions</Typography>
        </Grid>
      </Grid>

      <Box className="textBoxContent">
        <Typography className="title">TERMS AND CONDITIONS</Typography>
        <ListInfo>
          These terms and conditions (“Terms and Conditions”) govern your use of
          www.smartapes.com.sg (the “Company Site”) and your relationship with
          GRIP EDUCTECH PTE. LTD. (the “Company”, “we” or “us”). Please read
          them carefully as they affect your rights and liabilities under the
          law. If you do not agree to these Terms and Conditions, please do not
          register for or use the Company Site. If you have any questions on the
          Terms and Conditions, please contact{" "}
          <Link underline="none" href="mailto:cs@smartapes.com.sg">
            cs@smartapes.com.sg
          </Link>
          .
        </ListInfo>
        <ol className="orderedListNumber">
          {data.map((item, id) => (
            <ListInfo sx={{ fontSize: "14.5px", fontWeight: "700" }} key={id}>
              <li>
                {item.title}
                <ol className="orderedListNumber">
                  {item.list.map((vList, vListId) => (
                    <ListInfo key={vListId}>
                      <li>{vList}</li>
                    </ListInfo>
                  ))}
                </ol>
              </li>
            </ListInfo>
          ))}
        </ol>
      </Box>

      <Box>
        <Grid container direction="column" className="acceptTermsAndService">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={() => {
                  setTermsIsAccepted(!isTermsAccepted);
                  captchaRef.current.reset();
                }}
              />
            }
            label="I Accept and Agree SMART APES Terms and Conditions"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={() => {
                  setPoliciesIsAccepted(!isPoliciesAccepted);
                  captchaRef.current.reset();
                }}
              />
            }
            label="I Accept and Agree to SMART APES’s Privacy Policy"
          />
        </Grid>
        <Grid container direction="column" alignItems="center" gap={2}>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            ref={captchaRef}
            onChange={() => {
              setIsAcceptCaptcha(true);
            }}
          />
          <PrimaryButton
            text="Submit"
            onClick={handlerRegister}
            disabled={
              !isTermsAccepted || !isPoliciesAccepted || !isAcceptCaptcha
            }
            isLoading={isLoadSubmit}
            fullWidth
            size="large"
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default TermAndCondition;
