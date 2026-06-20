// Next js
import Image from "next/image";

// Material UI
import { Grid, Typography } from "@mui/material";

// assets
import classes from "./_IllustrationPage.module.scss";

/**
 *
 * @param {{
 * illustrationImage : string
 * titleIllustration : string
 * contentIllustration : string
 * colorText : string
 * isMobileSize : boolean
 * }} props
 * @returns
 */

const IllustrationPage = ({
  illustrationImage,
  titleIllustration,
  contentIllustration,
  colorText,
  isMobileSize,
}) => {
  return (
    <Grid className={classes.containerIllustrationPage}>
      {illustrationImage && (
        <Image
          width={isMobileSize ? "227px" : "393px"}
          height={isMobileSize ? "138px" : "239px"}
          src={illustrationImage}
          alt="illustration images"
          objectFit="contain"
        />
      )}
      <Typography
        className={classes.titleIllustrationPage}
        sx={{ color: colorText }}
      >
        {titleIllustration}
      </Typography>
      <Typography className={classes.subTitleIllustrationPage}>
        {contentIllustration}
      </Typography>
    </Grid>
  );
};

export default IllustrationPage;
