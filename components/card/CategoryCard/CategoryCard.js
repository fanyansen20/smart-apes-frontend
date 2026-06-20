//Next JS
import Image from "next/image";

//Image
import ComingSoonFeature from "@public/assets/images/coming-soon-feature.svg";

//Material UI
import { Grid, Typography } from "@mui/material";

const CategoryCard = ({ imageIcon, children, isComingSoon }) => {
  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      className="categoryCard"
    >
      {isComingSoon && (
        <div className="imageComingSoonFeature">
          <Image src={ComingSoonFeature} layout="fill" alt="icon category" />
        </div>
      )}

      <Grid item md={3} className="imageCategoryCardButton">
        <Image
          src={imageIcon}
          layout="fill"
          objectFit="contain"
          alt="icon category"
        />
      </Grid>
      <Grid item md={6.7}>
        <Typography className="textButtonCategory">{children}</Typography>
      </Grid>
    </Grid>
  );
};

export default CategoryCard;
