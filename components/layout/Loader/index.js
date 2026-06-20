// Next JS
import Image from "next/image";

//Material UI
import { Container, Typography, Grid, CircularProgress } from "@mui/material";

// Image
import successSignUp from "@public/assets/images/wait-second.svg";

// Components
import IllustrationPage from "@components/shared/IllustrationPage";

const Loader = () => {
  return (
    <Container maxWidth="2xl" className="containerNotfoundPage">
      <IllustrationPage
        illustrationImage={successSignUp}
        titleIllustration="Please Wait a Second"
        contentIllustration="We’re redirecting you now, please wait."
      />
      <CircularProgress sx={{ marginTop: "40px", color: "#BC3CE9" }} />
    </Container>
  );
};

export default Loader;
