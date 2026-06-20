// react
import { memo, useEffect } from "react";

//Next JS
import { useRouter } from "next/router";

// Image
import successSignUp from "@public/assets/images/success-sign-up.svg";

// Components
import IllustrationPage from "@components/shared/IllustrationPage";
import { Grid } from "@mui/material";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

const SuccessSignupPage = () => {
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
      goToLoginPage();
    }, 3000);
  }, []);

  async function goToLoginPage() {
    await router.push("/login");
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
        illustrationImage={successSignUp}
        titleIllustration="Success Verify Email"
        contentIllustration="Only one step remain. You’ll be directed to login page"
      />
    </Grid>
  );
};

export default memo(SuccessSignupPage);
