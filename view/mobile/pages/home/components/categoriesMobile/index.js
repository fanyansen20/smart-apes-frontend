import React from "react";

// Next js
import Image from "next/image";
import Link from "next/link";

// MUI
import { Typography } from "@mui/material";

// Css
import classes from "./_CategoriesMobile.module.scss";

const CategoriesMobile = ({ dataCategories }) => {
  return (
    <div className={classes.containerCategories}>
      {dataCategories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`}>
          <a>
            <div className={classes.itemCategories}>
              <div className={classes.iconCategories}>
                <Image
                  src={category.icon_button_url}
                  alt={category.display_string}
                  width={40}
                  height={40}
                  objectFit="contain"
                />
              </div>
              <Typography className={classes.titleCategory}>
                {category.display_string}
              </Typography>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesMobile;
