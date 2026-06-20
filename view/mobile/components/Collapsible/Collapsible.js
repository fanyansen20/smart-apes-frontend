import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import { useRef, useState } from "react";
import classes from "./Collapsible.module.scss";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Collapsible = ({ children, initialHeight = 30 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const heightRef = useRef();

  const [height, setHeight] = useState();

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
    setHeight(heightRef.current.clientHeight);
  };

  const currentHeight = isExpanded ? height : initialHeight;
  return (
    <div className={classes.containerCollapsible}>
      <div
        className={classes.cardCollapse}
        style={{ height: currentHeight + "px" }}
      >
        <div className={classes.cardBody} ref={heightRef}>
          {children}
        </div>
      </div>
      {isExpanded ? (
        <div className={classes.toggleSection}>
          <SecondaryButton onClick={handleToggle}>
            <p>See Less</p>
            <ExpandLessIcon />
          </SecondaryButton>
        </div>
      ) : (
        <div className={classes.toggleSection}>
          <SecondaryButton onClick={handleToggle}>
            <p onClick={handleToggle}>See More</p>
            <ExpandMoreIcon />
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
