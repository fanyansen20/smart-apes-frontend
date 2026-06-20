// React
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// MUI Components
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";

// Components
import CatOneBanner from "@public/assets/images/banner-cat-one.svg";
import SubHeaderSection from "view/mobile/components/SubHeaderSection";
import ProductsContainerMobile from "../../components/ProductsList";

// Styles
import classes from "./CatOne.module.scss";

const renderProductsList = ({ title, dataProduct, onClickSeeAll }) => (
  <>
    <Grid className="dividerCatalogOne">
      <Divider />
    </Grid>

    <ProductsContainerMobile
      title={title}
      dataProduct={dataProduct}
      isLoading={false}
      onClickSeeAll={onClickSeeAll}
      maxProductLength={6}
    />
  </>
);

function CategorySlug({
  categorySlugLevelOne,
  dataCategories,
  dataProductsPromotion,
  dataTopProductsSales,
  dataProductsRecommendations,
}) {
  const router = useRouter();
  const { slug1 } = router.query;
  const categoriesLevel2 = dataCategories.filter(
    (category) => category.slug === categorySlugLevelOne
  );
  const redirectToDetailProductList = (sectionType) =>
    router.push(`/category/${slug1}/section/${sectionType}`);
  const { search, isLoadingSearch } = useSelector((state) => state.search);
  useEffect(() => {
    if (search && isLoadingSearch && !document.onkeydown) {
      document.onkeydown = (e) => {
        const splittedUrl = window.location.pathname.split("/");
        const isSearchPage = splittedUrl.includes("search");
        const isCategoryLevelOnePage =
          splittedUrl[splittedUrl.length - 1] === categorySlugLevelOne;

        if (
          e.key === "Enter" &&
          e.target.name === "inputSearch" &&
          !isSearchPage &&
          isCategoryLevelOnePage
        ) {
          router.push({
            pathname: `${window.location.pathname}/search`,
            query: {
              keyword: e.target.value,
            },
          });
        }
      };
    }
  }, [isLoadingSearch, search]);

  return (
    <Stack direction="column" spacing={2} px={2} mb={6}>
      <div className={classes.bannerSection}>
        <Image src={CatOneBanner} alt="Category One Banner" />
      </div>

      <SubHeaderSection>
        {categoriesLevel2[0].display_string} Category
      </SubHeaderSection>

      <Grid container direction="row" gap={1.8}>
        {categoriesLevel2[0].children.map((category) => (
          <Link
            key={category.slug}
            href={`${categorySlugLevelOne}/${category?.slug}`}
          >
            <Paper
              variant="outlined"
              key={category.slug}
              className={classes.menuCard}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Image
                  width="24px"
                  height="24px"
                  src={category.icon_button_url}
                  alt={`Image ${category.display_string}`}
                />
                <Typography className={classes.menuTitle}>
                  {category.display_string}
                </Typography>
              </Stack>
            </Paper>
          </Link>
        ))}
      </Grid>

      {dataTopProductsSales.length > 0 &&
        renderProductsList({
          title: "Best Seller",
          dataProduct: dataTopProductsSales,
          onClickSeeAll: () => redirectToDetailProductList("sales"),
        })}
      {dataProductsPromotion.length > 0 &&
        renderProductsList({
          title: "Monthly Promotion",
          dataProduct: dataProductsPromotion,
          onClickSeeAll: () => redirectToDetailProductList("promotions"),
        })}
      {dataProductsRecommendations.length > 0 &&
        renderProductsList({
          title: "Recommendation for you",
          dataProduct: dataProductsRecommendations,
          onClickSeeAll: () => redirectToDetailProductList("recommendations"),
        })}
    </Stack>
  );
}

export default memo(CategorySlug);
