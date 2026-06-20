// Mui
import { Grid } from "@mui/material";

// Shared
import IllustrationPage from "@components/shared/IllustrationPage";

// Images
import noRelatedProduct from "@public/assets/images/no-related-product.svg";

const NoRelatedProduct = () => {
  return (
    <Grid container justifyContent="center">
      <IllustrationPage
        illustrationImage={noRelatedProduct}
        titleIllustration="No Related Products"
        contentIllustration="No Related Products at this time. Please try again later"
      />
    </Grid>
  );
};

export default NoRelatedProduct;
