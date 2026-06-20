import { Container, Grid, Typography } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import SubHeaderCard from "components/SubHeaderCard";
import classes from "pages/terms-of-services/style.module.scss";
import {
  PageTitle,
  ListInfo,
  SubTitle,
} from "utils/terms-of-services/styledComponents";
import { data } from "utils/terms-of-services/data";
// import AllData from "../../utils/terms-of-services/AllData";

function TermsOfServices() {
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
            <SubHeaderCard>Last Update : 13/02/2023</SubHeaderCard>
          </Grid>
          <Grid item md="12">
            <PageTitle>Terms of Services</PageTitle>
          </Grid>
          <Grid item md="12">
            <Typography>
              These terms and conditions (“Terms and Conditions”) govern your
              use of www.smartapes.com.sg (the “Company Site”) and your
              relationship with GRIP EDUCTECH PTE. LTD. (the “Company”, “we” or
              “us”). Please read them carefully as they affect your rights and
              liabilities under the law. If you do not agree to these Terms and
              Conditions, please do not register for or use the Company Site. If
              you have any questions on the Terms and Conditions, please contact
              cs@smartapes.com.sg.
            </Typography>
            <ol className={classes.orderedListNumber}>
              {/* <AllData /> */}
              {data.map((item, id) => (
                <SubTitle key={id}>
                  <li>
                    {item.title}
                    {item.list.length === 1 && (
                      <ListInfo>{item.list[0]}</ListInfo>
                    )}
                    {item.list.length > 1 && (
                      <ol className={classes.orderedListNumber}>
                        {item.list.map((vList, vListId) => (
                          <ListInfo key={vListId}>
                            <li>{vList}</li>
                          </ListInfo>
                        ))}
                      </ol>
                    )}
                  </li>
                </SubTitle>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default memo(TermsOfServices);
