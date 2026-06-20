import { Container, Grid, Link } from "@mui/material";
import SubHeaderCard from "components/SubHeaderCard";
import classes from "pages/terms-and-conditions/style.module.scss";
import React, { memo, useEffect, useState } from "react";
import { data, header } from "utils/terms-of-services/data";
import {
  ListInfo,
  PageTitle,
  SubTitle,
} from "utils/terms-of-services/styledComponents";
// import AllData from "utils/terms-of-services/AllData";

function TermAndServices() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container
      sx={{
        mt: 4,
        textAlign: "justify",
      }}
      maxWidth="lg"
    >
      <Grid container>
        <Grid item md="12">
          <SubHeaderCard>{header.date}</SubHeaderCard>
        </Grid>
        <Grid item md="12">
          <PageTitle>{header.title}</PageTitle>
        </Grid>
        <Grid item md="12">
          <ListInfo>
            {header.description}
            <Link underline="none" href="mailto:cs@smartapes.com.sg">
              cs@smartapes.com.sg
            </Link>
            .
          </ListInfo>
          <ol className={classes.orderedListNumber}>
            {/* <AllData /> */}
            {data.map((item, id) => (
              <SubTitle key={id}>
                <li>
                  {item.title}
                  <ol className={classes.orderedListNumber}>
                    {item.list.map((vList, vListId) => (
                      <ListInfo key={vListId}>
                        <li>{vList}</li>
                      </ListInfo>
                    ))}
                  </ol>
                </li>
              </SubTitle>
            ))}
          </ol>
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(TermAndServices);
