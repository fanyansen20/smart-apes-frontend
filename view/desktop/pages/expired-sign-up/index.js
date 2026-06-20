// react
import { memo, useEffect } from "react";

//Next JS
// import Image from "next/image";
import expiredEmail from "@public/assets/images/expired-email.svg";
import { useRouter } from "next/router";

// Components
import IllustrationPage from "@components/shared/IllustrationPage";
import { Grid } from "@mui/material";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

const ExpiredEmailPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      isLayout({
        isNavbar: false,
        isFooter: false,
      })
    );
    setTimeout(() => {
      goToRegisterPage();
    }, 3000);
  }, []);

  async function goToRegisterPage() {
    await router.push("/register");
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <ParentCentreLogo />
      <IllustrationPage
        illustrationImage={expiredEmail}
        titleIllustration="Your link is expired"
        contentIllustration="Your link is expired. You will be redirected to
        Sign Up page"
        colorText="red"
      />
    </Grid>
  );
};

export default memo(ExpiredEmailPage);
