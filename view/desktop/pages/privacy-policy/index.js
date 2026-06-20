import { Container, Grid } from "@mui/material";
import SubHeaderCard from "components/SubHeaderCard";
import React, { memo, useEffect, useState } from "react";
import { Header, data } from "utils/privacy-policy/data";
import { ListInfo, PageTitle } from "utils/privacy-policy/styledComponents";
import classes from "../../../../pages/privacy-policy/style.module.scss";
// import AllData from "utils/privacy-policy/AllData";

function PrivacyPolicy() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Container
        sx={{
          mt: 4,
          textAlign: "justify",
        }}
        maxWidth="lg"
      >
        <Grid container>
          <Grid item md="12">
            <SubHeaderCard>{Header.date}</SubHeaderCard>
          </Grid>
          <Grid item md="12">
            <PageTitle>{Header.title}</PageTitle>
          </Grid>
          <Grid item md="12">
            <ListInfo>
              {Header.subtitle}
              <br />
              {Header.description}
            </ListInfo>
          </Grid>
          <Grid item md="12">
            <ol className={classes.orderedListNumber}>
              {/* <AllData /> */}
              {data.map((item, id) => (
                <ListInfo key={id}>
                  <Grid mb={1}>{item?.section}</Grid>
                  <li>
                    {item.title}
                    {item?.list?.length === 1 && (
                      <ListInfo>{item.list[0]}</ListInfo>
                    )}
                    {item?.list?.length > 1 && (
                      <ol className={classes.subOrderedListNumber}>
                        {item.list.map((vList, vListId) => (
                          <ListInfo key={vListId}>
                            <li>{vList}</li>
                          </ListInfo>
                        ))}
                      </ol>
                    )}
                  </li>
                </ListInfo>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default memo(PrivacyPolicy);
