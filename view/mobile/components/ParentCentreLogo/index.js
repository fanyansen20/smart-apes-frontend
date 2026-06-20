import Image from "next/image";
import SALogo from "public/assets/logo/navbarIcon/smart-apes-logo.svg";
import classes from "./ParentCentreLogo.module.scss";

const ParentCentreLogo = () => {
  return (
    <section className={classes.logo}>
      <Image src={SALogo} alt="SmartApes Logo" width="177px" height="51px" />
      <p>Parents Centre</p>
    </section>
  );
};

export default ParentCentreLogo;
