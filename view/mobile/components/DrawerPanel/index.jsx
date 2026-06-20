// React
import React from "react";

// MUI Components
import { Drawer, IconButton, Stack, Typography } from "@mui/material";

// MUI Icons
import { CloseRounded } from "@mui/icons-material";

// Styles
import classes from "./DrawerPanel.module.scss";

const DrawerPanel = ({ children, onClose, open, title }) => (
  <Drawer
    anchor="bottom"
    open={open}
    classes={{
      paper: classes.drawerPanel,
    }}
    onClose={onClose}
  >
    <Stack direction="column" gap={2} className={classes.panelContainer}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography className={classes.panelHeaderText}>{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Stack>

      {/* Panel Content */}
      {children}
    </Stack>
  </Drawer>
);

export default DrawerPanel;
