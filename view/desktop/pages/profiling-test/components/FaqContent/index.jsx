import { useState } from "react";

// mui material
import { IconButton } from "@mui/material";

// style
import classes from "./_FaqContent.module.scss";

// icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FaqContent = () => {
  const [isShow, setIsShow] = useState({
    0: true,
  });

  function handlerShowFaqContent(key) {
    setIsShow((prev) => {
      return { ...prev, [key]: !isShow[key] };
    });
  }

  return [...Array(5)].map((_, key) =>
    isShow[key] ? (
      <div key={key} className={classes.faqContentContainer}>
        <div className={classes.headingContent}>
          <IconButton onClick={() => handlerShowFaqContent(key)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <h4>Still need some answer?</h4>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Mattis maecenas est nisl
          ligula faucibus massa. Venenatis pellentesque porta quis morbi
          vestibulum facilisis. Mattis porta at enim sit velit aliquam
          condimentum. Enim fermentum a varius diam in dui laoreet.
        </p>
      </div>
    ) : (
      <div
        key={key}
        className={`${classes.faqContentContainer} ${classes.isClose}`}
      >
        <div className={classes.headingContent}>
          <IconButton onClick={() => handlerShowFaqContent(key)}>
            <ControlPointIcon />
          </IconButton>
          <h4>Still need some answer?</h4>
        </div>
      </div>
    )
  );
};

export default FaqContent;
