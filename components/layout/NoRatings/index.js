// Mui
import { Grid } from "@mui/material";

// Shared
import IllustrationPage from "@components/shared/IllustrationPage";

// Images
import noRating from "@public/assets/images/not-rating.svg";

const NoRatings = () => {
  return (
    <Grid container justifyContent="center">
      <IllustrationPage
        illustrationImage={noRating}
        titleIllustration="No Ratings"
        contentIllustration="No Ratings for this product yet."
      />
    </Grid>
  );
};

export default NoRatings;
