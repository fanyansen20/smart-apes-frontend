import React from "react";

// Css
import classes from "./_HeroBannerMobile.module.scss";

// Images
import animation from "../../../../assets/images/landing-page/smartapes-mobile-animation.svg";

const HeroBannerMobile = () => {
  return (
    <div className={classes.heroBanner}>
      <object type="image/svg+xml" data={animation.src} />
    </div>
  );
};

export default HeroBannerMobile;
