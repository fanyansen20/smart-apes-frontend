// Next
import { htmlParser } from "@helper/htmlParser";
import Image from "next/image";

// MUI
import { Grid, Stack } from "@mui/material";

// Styles
import classes from "./ShopHomeMobile.module.scss";

// Comp
import CardMobile from "view/mobile/components/card";

const ShopHomeMobile = ({ shopData, shopProducts }) => {
  return (
    <div className={classes.container}>
      <Stack>
        {shopData?.banner_url && (
          <Image
            src={shopData.banner_url}
            height={50}
            width={100}
            objectFit="cover"
            layout="responsive"
            alt="shop banner"
            style={{ borderRadius: "5px" }}
          />
        )}
        {shopProducts?.allProducts?.results?.length > 0 && (
          <section>
            <div className={classes.header}>
              <h2>Featured Product</h2>
              <p>See All</p>
            </div>
            <div className={classes.containerCard}>
              {shopProducts?.featuredProducts?.results?.map(
                (product, index) => (
                  <CardMobile dataProduct={product} key={index} />
                )
              )}
            </div>
          </section>
        )}
        {shopProducts?.allProducts?.results?.length < 1 ? (
          <div className="noProductStore">
            <Image
              src={NoProductIllustration}
              alt="no products available"
              height="70px"
              layout="responsive"
            />
            <h3>No Product</h3>
            <h5>
              Currently no products available. please come back another time
            </h5>
          </div>
        ) : (
          <section>
            <div className={classes.header}>
              <h2>All Product</h2>
              <p>See All</p>
            </div>
            <div className={classes.containerCard}>
              {shopProducts?.allProducts?.results?.map((product, index) => (
                <CardMobile dataProduct={product} key={index} />
              ))}
            </div>
          </section>
        )}
        <section>
          <Grid item wrap className={classes.header} xs={12}>
            <h2>About {shopData.name}</h2>
          </Grid>

          <Grid item wrap className={classes.storeDescription} xs={12}>
            {shopData?.desc && htmlParser(shopData?.desc)}
          </Grid>
        </section>
      </Stack>
    </div>
  );
};

export default ShopHomeMobile;
