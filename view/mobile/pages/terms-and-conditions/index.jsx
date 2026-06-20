import React from "react";

// Next
import Link from "next/link";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Component
import { ListInfo, SubTitle } from "utils/terms-of-services/styledComponents";
import SubHeaderSection from "view/mobile/components/SubHeaderSection";

// Constant
import { data, header } from "utils/terms-of-services/data";

// Style
import classes from "./_TermAndCondition.module.scss";

function TermsAndConditions() {
  return (
    <Container>
      <Grid container className={classes.container} gap={2}>
        <SubHeaderSection>{header.date}</SubHeaderSection>
        <Grid>
          <Typography className={classes.title}>{header.title}</Typography>
          <Grid item xs={12}>
            <ListInfo>
              {header.description}
              <br />
              <Link underline="none" href="mailto:cs@smartapes.com.sg">
                cs@smartapes.com.sg
              </Link>
              .
            </ListInfo>
          </Grid>
          <Grid item xs={12} className={classes.listContainer}>
            <ol className={classes.orderedListNumber}>
              {data.map((item, index) => {
                return (
                  <SubTitle key={index}>
                    <li>
                      {item.title}
                      {item?.list && (
                        <ol className={classes.orderedListNumber}>
                          <Grid ml={2} mt={-1.5}>
                            {item?.list?.map((listItem, listIndex) => {
                              return (
                                <ListInfo key={listIndex}>
                                  <li>{listItem}</li>
                                </ListInfo>
                              );
                            })}
                          </Grid>
                        </ol>
                      )}
                    </li>
                  </SubTitle>
                );
              })}
            </ol>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TermsAndConditions;
