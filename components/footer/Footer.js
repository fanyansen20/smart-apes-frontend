// React
import { useEffect, useRef } from "react";
import { useController, useForm } from "react-hook-form";

// Redux
import { useDispatch, useSelector } from "react-redux";

//Next JS
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//Material UI
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";

// Constant
import dataFooters from "constant/dataInFooter";

//Images
import iconEmail from "public/assets/icons/icon-email.svg";
import AstronautFall from "public/assets/images/astorunut-fall.svg";
import HalfMoon from "public/assets/images/half-moon.svg";

// Component
import ReCAPTCHA from "react-google-recaptcha";

// helper
import useNotification from "@hooks/useNotification";
import { disabledFloatImage } from "@helper/checkUrlPage";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeFormSchema } from "./subscribeFormSchema";
import {
  subsNewsletter,
  resetStatus,
} from "store/reducer/subsNewsletter/subsNewsletterSlice";
import { API_FETCH_STATUS } from "constant/api";

const Footer = () => {
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();
  const { status, loading, error } = useSelector(
    (state) => state.subsNewsletter
  );

  const { control, watch, handleSubmit, setValue, reset } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      captcha: "",
    },
    resolver: yupResolver(subscribeFormSchema),
  });
  const { email: emailValue, captcha: captchaToken } = watch();
  const emailForm = useController({
    control,
    name: "email",
  });
  const { pathname } = useRouter();
  const captchaRef = useRef(null);

  const year = new Date().getFullYear();

  const resetSubscriptionForm = () => {
    dispatch(resetStatus());
    captchaRef.current.reset();
    reset({
      ...watch(),
      captcha: "",
    });
  };

  const pushNotification = (config) => {
    sendNotification(config);
    resetSubscriptionForm();
  };

  useEffect(() => {
    if (status === API_FETCH_STATUS.IS_SUCCESS) {
      pushNotification({
        msg: ["Email has been successfully subscribed"],
      });
    }
  }, [status]);

  useEffect(() => {
    if (error) {
      pushNotification({
        msg: [error],
        variant: "error",
      });
    }
  }, [error]);

  const onSubmit = ({ email, captcha }) => {
    dispatch(
      subsNewsletter({
        captchaToken: captcha,
        payload: { email },
      })
    );
  };

  return (
    <Container maxWidth="lg">
      <Grid className="containerFooter">
        {!disabledFloatImage(pathname) && (
          <div className="imageFooter">
            <div className="imageAstronautFall">
              <Image
                src={AstronautFall}
                alt="moon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="imageHalfMoon">
              <Image
                src={HalfMoon}
                alt="moon"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        )}

        <Card className="cardFooter">
          <Grid
            container
            sx={{
              backgroundImage: `url('/assets/images/footer_bg.svg')`,
            }}
          >
            {dataFooters.map((data, indexData) => (
              <Grid
                key={indexData}
                item
                md={2.4}
                xs={6}
                className="detailCardFooter"
              >
                {data.twoColumns &&
                  data.contentWithImages?.map((contentWithImage) =>
                    contentWithImage.contentImages.map(
                      (contentImage, indexContentImage) => (
                        <Grid
                          key={indexContentImage}
                          sx={{ marginBottom: "20px" }}
                        >
                          <Typography variant="h6">
                            {contentWithImage.title}
                          </Typography>
                          <div className="imageContent">
                            <Image
                              src={contentImage.image}
                              alt={contentImage.title}
                            />
                          </div>
                        </Grid>
                      )
                    )
                  )}

                <Typography variant="h6">{data.title}</Typography>

                {!data.twoColumns &&
                  data?.contentWithImages?.map(
                    (contentWithImage, indexContentWithImage) => (
                      <Grid
                        key={indexContentWithImage}
                        container
                        alignItems="center"
                        gap={4}
                      >
                        <Image
                          style={{ padding: "20px" }}
                          src={contentWithImage.image}
                          alt={contentWithImage.title}
                        />
                        <Typography variant="subtitle1">
                          {contentWithImage.title}
                        </Typography>
                      </Grid>
                    )
                  )}

                {data.contents?.map((content, indexContent) => (
                  <Link href={content.link ?? ""} key={indexContent}>
                    <a>
                      <Typography variant="subtitle1">
                        {content.title}
                      </Typography>
                    </a>
                  </Link>
                ))}
              </Grid>
            ))}

            <Grid
              item
              container
              gap="10px"
              md={3.8}
              sx={{ marginLeft: "50px" }}
            >
              <Grid>
                <Typography variant="h6">
                  Subscribe to our newsletter
                </Typography>
                <Typography variant="subtitle1" sx={{ marginTop: "-10px" }}>
                  We&apos;ll send you a nice letter once per week. No Spam
                </Typography>
              </Grid>

              <div className="searchInputFooter">
                <InputBase
                  {...emailForm.field}
                  className="searchInput"
                  placeholder="youremail@mail.com"
                  startAdornment={
                    <InputAdornment position="start">
                      <Image src={iconEmail} alt="icon email" layout="fixed" />
                    </InputAdornment>
                  }
                />
              </div>

              <Grid item md={12}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                  onChange={(value) => setValue("captcha", value)}
                  onExpired={() => setValue("captcha", "")}
                  ref={captchaRef}
                />
              </Grid>
              <Grid>
                <Button
                  className="subscribe-button"
                  disabled={!emailValue || !captchaToken || loading}
                  onClick={handleSubmit(onSubmit)}
                >
                  <Stack direction="row" spacing={1}>
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        style={{ height: "15px", width: "15px" }}
                      />
                    )}
                    <Typography>Subscribe</Typography>
                  </Stack>
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item md={0.6}></Grid>
                <Grid item md={8} sx={{ margin: "20px 0" }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="h6">
                        © {year} SmartApes. All Rights Reserved.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default Footer;
