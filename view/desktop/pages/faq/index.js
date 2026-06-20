// next js
import Link from "next/link";
import { useRouter } from "next/router";

// constant
import { faqContent } from "constant/faqStaticPage";

// Mui
import { Grid, Typography } from "@mui/material";

// icons
import { KeyboardArrowRight } from "@mui/icons-material";

// styles
import classes from "./_Faq.module.scss";

const FaqPage = () => {
  const {
    query: { cat = "account-and-security", subCat = "sign-up-and-login" },
  } = useRouter() || {};

  function querySearchParam(item) {
    const content = encodeURIComponent(item.pathSlug);

    return `cat=${cat}&subCat=${subCat}&content=${content}`;
  }

  return (
    faqContent[cat][subCat]?.content?.map((item, key) => (
      <Link key={key} href={`/faq/article?${querySearchParam(item)}`}>
        <a>
          <Grid className={classes.contentFaq}>
            <Typography>{item.title}</Typography>
            <KeyboardArrowRight />
          </Grid>
        </a>
      </Link>
    )) || "Content not implement yet"
  );
};

export default FaqPage;
