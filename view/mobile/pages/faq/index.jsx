import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

// MUI
import {
  ExpandLess,
  ExpandMore,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Collapse,
  Container,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";

// Component
import Header from "./components/Header";

// Helper
import { convertToKebabCase } from "@helper/convertToKebabCase";

// Hooks
import { useSelectCategory } from "@hooks/faq/useSelectCategory";

// Styles
import classes from "./_faq.module.scss";

// Constant
import { faqCategories, faqContent } from "constant/faqStaticPage";

const MobileFaqLayout = () => {
  const router = useRouter();
  const { cat, subCat } = router.query;

  // #region useState
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0]);
  // #endregion

  // #region hooks
  const { isCollapseCategories, handlerCollapseCategories } =
    useSelectCategory();
  // #endregion

  // #region function
  /**
   * @param {{
   * name: string;
   * categories_level_two: string[]
   * }} category
   */
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    router.push(`/faq?cat=${convertToKebabCase(category?.name)}`, undefined, {
      scroll: false,
    });
  };

  const handleSelectCategoryLevelTwo = (categoryLevelTwo) => {
    handlerCollapseCategories(categoryLevelTwo);
    router.push(
      `/faq?cat=${convertToKebabCase(
        selectedCategory?.name
      )}&subCat=${convertToKebabCase(categoryLevelTwo)}`,
      undefined,
      { scroll: false }
    );
  };

  const querySearchParam = (item) => {
    const content = encodeURIComponent(item.pathSlug);

    return `cat=${cat}&subCat=${subCat}&content=${content}`;
  };

  const findSelectedCategory = () => {
    const category = faqCategories.find(
      (el) => convertToKebabCase(el.name) === cat
    );
    if (category) setSelectedCategory(category);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    handlerCollapseCategories(subCat ?? "");
    findSelectedCategory();
  }, []);
  // #endregion

  return (
    <Fragment>
      <Header />
      <Container className={classes.container}>
        <Grid className={classes.categoryContainer}>
          {faqCategories.map((category, index) => {
            return (
              <Grid
                key={index}
                className={[
                  classes.categoryButton,
                  selectedCategory.name === category.name && classes.selected,
                ]}
                onClick={() => handleSelectCategory(category)}
              >
                <Typography>{category.name}</Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid container flexDirection="column" gap={1}>
          {selectedCategory?.categories_level_two?.map(
            (categoryLevelTwo, index) => {
              const convertedCategoryLevelTwo =
                convertToKebabCase(categoryLevelTwo);

              return (
                <List key={index} className={classes.listItemContainer}>
                  <ListItemButton
                    disablePadding
                    className={classes.listButton}
                    onClick={() => {
                      handleSelectCategoryLevelTwo(categoryLevelTwo);
                    }}
                  >
                    <Typography className={classes.listItemTextSelect}>
                      {categoryLevelTwo}
                    </Typography>
                    {isCollapseCategories[convertedCategoryLevelTwo] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={isCollapseCategories[convertedCategoryLevelTwo]}
                    className={classes.contentFaqList}
                  >
                    {(faqContent[cat] &&
                      faqContent[cat][convertedCategoryLevelTwo]?.content?.map(
                        (content, index) => {
                          return (
                            <Link
                              key={index}
                              href={`/faq/article?${querySearchParam(content)}`}
                            >
                              <Grid className={classes.contentFaq}>
                                <Typography>{content.title}</Typography>
                                <KeyboardArrowRight />
                              </Grid>
                            </Link>
                          );
                        }
                      )) ||
                      "Content not implement yet"}
                  </Collapse>
                </List>
              );
            }
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default MobileFaqLayout;
