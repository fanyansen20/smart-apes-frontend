import React, { Fragment } from "react";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Component
import { ListInfo } from "utils/privacy-policy/styledComponents";
import SubHeaderSection from "view/mobile/components/SubHeaderSection";

// Constant
import { data, Header } from "utils/privacy-policy/data";

// Style
import classes from "./_PrivacyPolicy.module.scss";

function PrivacyPolicy() {
  return (
    <Container>
      <Grid container className={classes.container} gap={2}>
        <SubHeaderSection>{Header.date}</SubHeaderSection>
        <Grid>
          <Typography className={classes.title}>{Header.title}</Typography>
          <Grid item xs={12}>
            <ListInfo>{Header.subtitle}</ListInfo>
            <ListInfo>{Header.description}</ListInfo>
          </Grid>
          <Grid item xs={12}>
            {data.map((item, index) => {
              let number = index + 1;
              return (
                <Fragment key={index}>
                  {item?.section && (
                    <Grid pl={1}>
                      <ListInfo>{item?.section}</ListInfo>
                    </Grid>
                  )}
                  <Grid container pl={1}>
                    <Grid xs={0.8}>
                      <ListInfo>{number}. </ListInfo>
                    </Grid>
                    <Grid xs={11.2}>
                      <ListInfo>{item.title}</ListInfo>
                      {item?.list && (
                        <Grid>
                          {item?.list?.map((listItem, listIndex) => {
                            let listNumber = listIndex + 1;

                            return (
                              <ListInfo key={listIndex}>
                                {number}.{listNumber}. {listItem}
                              </ListInfo>
                            );
                          })}
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PrivacyPolicy;
