import HeadComponent from "@components/head/HeadComponent";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// Mui
import {
  Collapse,
  Container,
  Grid,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";

// Images & icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailLightIcon from "@public/assets/icons/icon-email-light.svg";

// css
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import classes from "./_FaqLayout.module.scss";

// constant
import { faqCategories } from "constant/faqStaticPage";

// helper
import { convertToKebabCase } from "@helper/convertToKebabCase";

// hooks
import { useSelectCategory } from "@hooks/faq/useSelectCategory";

const FaqLayout = ({ children }) => {
  const faqData = children?.props?.children?.props?.children?.props?.faqData;
  const faqImagePreview = faqData?.content?.answerContent?.content?.find(
    (content) => content?.attachments?.length > 0
  )?.attachments?.[0]?.url;

  // #region hooks
  const { isCollapseCategories, handlerCollapseCategories, isActiveCategory } =
    useSelectCategory();
  // #endregion

  return (
    <Fragment>
      <Grid sx={{ display: { xs: "block", md: "none" } }}>{children}</Grid>
      <Grid sx={{ marginTop: "-60px", display: { xs: "none", md: "block" } }}>
        <HeadComponent
          title="Smart Apes FAQ"
          image={faqImagePreview}
          description={`${
            faqData?.content?.title || "Find out more about Smart Apes Platform"
          }`}
        />
        <div className={classes.headerFaq}>
          <Container>
            <Grid container direction="column" gap="40px" alignItems="center">
              <Typography className={classes.titleHeaderFaq}>
                Frequently Asked Question
              </Typography>
            </Grid>
          </Container>
        </div>

        <div className={classes.contentFaq}>
          <Container>
            <Grid container justifyContent="space-between">
              <Grid item md={3.4} className={classes.categoriesFaq}>
                {faqCategories.map((categories, key) => (
                  <List key={key} disablePadding>
                    <ListItemButton
                      disablePadding
                      className={classes.listButton}
                      onClick={() => handlerCollapseCategories(categories.name)}
                    >
                      <Typography className={classes.listItemTextSelect}>
                        {categories.name}
                      </Typography>
                      {isCollapseCategories[
                        convertToKebabCase(categories?.name)
                      ] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={
                        isCollapseCategories[
                          convertToKebabCase(categories?.name)
                        ]
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      {categories.categories_level_two.map(
                        (categoryLevelTwo, key) => (
                          <Link
                            key={key}
                            href={`/faq?cat=${convertToKebabCase(
                              categories?.name
                            )}&subCat=${convertToKebabCase(categoryLevelTwo)}`}
                          >
                            <a>
                              <List disablePadding>
                                <ListItemButton
                                  className={classes.nestedListButton}
                                >
                                  <Typography
                                    className={
                                      isActiveCategory(categoryLevelTwo)
                                        ? classes.listItemTextSelect
                                        : classes.listItemText
                                    }
                                  >
                                    {categoryLevelTwo}
                                  </Typography>
                                </ListItemButton>
                              </List>
                            </a>
                          </Link>
                        )
                      )}
                    </Collapse>
                  </List>
                ))}
              </Grid>
              <Grid item md={8.3} container direction="column" gap="16px">
                {children}
              </Grid>
            </Grid>
          </Container>
        </div>
      </Grid>
      <div className={classes.footerFaq}>
        <Container>
          <Grid container direction="column" alignItems="center" gap="16px">
            <Typography className={classes.titleFooterFaq}>
              Still need some answer?
            </Typography>
            <Grid
              container
              justifyContent="center"
              sx={{ gap: { xs: "10px", md: "20px" } }}
            >
              <div className={classes.cardFooterFaq}>
                <PrimaryButton text={<WhatsAppIcon color="inherit" />} />
                <Typography className={classes.waContent}>
                  Message us on WhatsApp
                </Typography>
              </div>
              <div className={classes.cardFooterFaq}>
                <PrimaryButton
                  text={
                    <Image
                      width={24}
                      height={24}
                      src={EmailLightIcon}
                      alt="email Icon"
                    />
                  }
                />
                <div>
                  <Typography className={classes.titleEmailFaq}>
                    Email us
                  </Typography>
                  <Typography>Write your question now</Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

export default FaqLayout;
