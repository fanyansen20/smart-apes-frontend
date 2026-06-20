// next js
import Image from "next/image";
import Link from "next/link";

// Mui Material
import { Fab, Grid, Tooltip } from "@mui/material";

// constant
import { dataFloatingButton } from "./contentFloringButton";

// style
import classes from "./_FloatingButton.module.scss";

const FloatingButton = () => {
  return (
    <Grid className={classes.containerImageFloat}>
      {dataFloatingButton.map((item, key) => (
        <Link key={key} href={item.linkTooltip}>
          <a>
            <Tooltip
              classes={{
                tooltip: classes.tooltipCustom,
              }}
              className={classes.tooltipMarketPlace}
              title={item.tooltipTitle}
              placement="left"
              arrow
            >
              <Fab>
                <div className={classes.imageIconMarketPlace}>
                  <Image
                    src={item.imageTooltip}
                    alt="Image Tooltip"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Fab>
            </Tooltip>
          </a>
        </Link>
      ))}
    </Grid>
  );
};

export default FloatingButton;
