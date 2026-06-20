import { Card, CardActions, CardHeader, Grid, Skeleton } from "@mui/material";

const SkeletonStoreCard = () => {
  return (
    <Grid className="containerCardStore">
      <Card>
        <CardHeader
          avatar={<Skeleton variant="circular" width={60} height={60} />}
          title={<Skeleton variant="text" height={20} />}
          subheader={<Skeleton variant="text" height={20} />}
        />
        <CardActions>
          <Skeleton variant="rounded" width="100%" height={30} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SkeletonStoreCard;
