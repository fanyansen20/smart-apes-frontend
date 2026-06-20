import React, { useState } from "react";
import classes from "./ExpansionPanel.module.scss";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * @param {{
 * title: HTMLElement | string
 * children: HTMLElement
 * }} props
 * @returns
 */
const ExpansionPanel = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={classes.containerCollapsible}>
      <div className={classes.cardTitle} onClick={handleToggle}>
        <div>{title}</div>
        <div className={classes.expandIcon}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </div>
      <div className={isExpanded ? classes.cardExpand : classes.cardCollapse}>
        <div className={classes.cardBody}>{children}</div>
      </div>
    </div>
  );
};

export default ExpansionPanel;
