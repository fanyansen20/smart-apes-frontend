// React
import { useState } from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// MUI Components
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

// Icons
import CloseIcon from "@public/assets/icons/close-icon.svg";
import preassessmentIcon from "@public/assets/icons/iconmonstr-delivery.svg";
import contactUsIcon from "@public/assets/icons/iconmonstr-speech-bubble.svg";
import MonkeyHead from "@public/assets/icons/monkey-head.svg";
import profilingIcon from "@public/assets/icons/profiling-icons.svg";

// Styles
import classes from "./floatingButton.module.scss";

export const floatingBtnNavigation = [
  {
    icon: <Image src={contactUsIcon} alt="Contact Us" />,
    name: "Contact Us",
    value: "contact-us",
  },
  {
    icon: <Image src={preassessmentIcon} alt="Pre Assessment Test" />,
    name: "Pre Assessment Test",
    value: "pre-assessment",
  },
  {
    icon: <Image src={profilingIcon} alt="Profiling Test" />,
    name: "Profiling Test",
    value: "profiling-test",
  },
];

const FloatingButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const smartapesIcon = <Image src={MonkeyHead} alt="SmartApes Icon" />;
  const closeIcon = <Image src={CloseIcon} alt="Close Icon" />;

  const handleAction = async (destination) => {
    await router.push(destination);
    handleClose();
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      icon={open ? closeIcon : smartapesIcon}
      classes={{
        root: classes.speedDialContainer,
        fab: open ? classes.speedDialOpenBtn : classes.speedDialMainBtn,
      }}
      className={classes.speedDialButton}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {floatingBtnNavigation.map((navigation) => (
        <SpeedDialAction
          className={classes.speedDialActionBtn}
          key={navigation.name}
          icon={navigation.icon}
          tooltipTitle={navigation.name}
          onClick={() => handleAction(navigation.value)}
        />
      ))}
    </SpeedDial>
  );
};

export default FloatingButton;
