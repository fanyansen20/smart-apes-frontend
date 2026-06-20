// next js
import Link from "next/link";

// component
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// Material UI
import { Avatar, Card, CardActions, CardHeader, Grid } from "@mui/material";

const CardStore = ({ shopName, logoShop, statusShop, shopSlug }) => {
  return (
    <Grid className="containerCardStore">
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt={shopName}
              src={logoShop}
              sx={{ width: "60px", height: "60px" }}
            />
          }
          title={
            shopName?.length > 15 ? `${shopName.substring(0, 15)}...` : shopName
          }
          subheader={statusShop}
        />
        <CardActions>
          <Link href={`/${shopSlug}`}>
            <a style={{ width: "100%" }}>
              <SecondaryButton fullWidth text="Visit Store" />
            </a>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardStore;
