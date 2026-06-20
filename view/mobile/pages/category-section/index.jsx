// React
import React from "react";

// Next
import { useRouter } from "next/router";

// Components
import ProductsContainerMobile from "../../components/ProductsList";

// MUI Icons
import { ArrowBackIos } from "@mui/icons-material";

// MUI Components
import { IconButton, Stack, Typography } from "@mui/material";

// Styles
import classes from "./CategorySection.module.scss";

const CategorySection = ({ productsListData }) => {
  const { query, back } = useRouter();
  const { sectionType } = query;
  const salesSectionTitle = sectionType === "sales" && "Best Seller";
  const promotionsSectionTitle =
    sectionType === "promotions" && "Monthly Promotion";
  const recommendationsSectionTitle =
    sectionType === "recommendations" && "Recommendation for you";

  const sectionPageTitle =
    salesSectionTitle || promotionsSectionTitle || recommendationsSectionTitle;

  return (
    <Stack direction="column" className={classes.sectionPageContainer} gap={2}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        className={classes.pageHeader}
      >
        <IconButton
          className={classes.backIconBtnHeader}
          size="small"
          onClick={() => back()}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
        <Typography className={classes.pageHeaderText}>
          {sectionPageTitle}
        </Typography>
      </Stack>

      <div className={classes.pageContent}>
        <ProductsContainerMobile
          isLoading={false}
          dataProduct={productsListData}
        />
      </div>
    </Stack>
  );
};

export default CategorySection;
