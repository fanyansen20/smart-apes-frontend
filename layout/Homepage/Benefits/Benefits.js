//Next JS
import Image from "next/image";

//Material UI
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

//Components
import GradientButton from "../../../components/buttons/GradientButton";

//Images
import arrowRight from "public/assets/images/arrow-right.svg";
import memberBenefit from "public/assets/images/member_benefit.svg";
import learningProfiling from "public/assets/images/home_learning_profiling.svg";

const Benefits = () => {
  return (
    <Container maxWidth="lg" className="benefitContainer">
      <Grid container className="benefitGridContainer">
        <Grid xs={12} md={5} className="benefitGridItem">
          <div className="benefit">
            <Image
              src={memberBenefit}
              alt="memberbenefit"
              height={99}
              width={130}
            />
            <div className="benefitDetails">
              <Typography className="benefitDetailsTitle">
                Member Benefits
              </Typography>
              <Typography className="benefitDetailsContent">
                Member Benefit means any benefit including access to services
                and offerings available to a Member of that Membership Type.
              </Typography>
              <div className="benefitDetailsButtonDiv">
                <GradientButton>
                  <Typography className="benefitDetailsButtonText">
                    See Details
                  </Typography>
                  <Image src={arrowRight} alt="arrow right"></Image>
                </GradientButton>
              </div>
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={5} className="benefitGridItem">
          <div className="benefit">
            <Image
              src={learningProfiling}
              alt="learningProfiling"
              height={99}
              width={130}
            />
            <div className="benefitDetails">
              <Typography className="benefitDetailsTitle">
                Learning Profiling
              </Typography>
              <Typography className="benefitDetailsContent">
                GRIP Profiling to help learners identify their preferred
                learning styles. We can define learning styles as preferences
                and tendencies students.
              </Typography>
              <div className="benefitDetailsButtonDiv">
                <GradientButton>
                  <Typography className="benefitDetailsButtonText">
                    See Details
                  </Typography>
                  <Image src={arrowRight} alt="arrow right"></Image>
                </GradientButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Benefits;
