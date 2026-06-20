// Next
import { useState } from "react";
import Image from "next/image";
import { get } from "helper/network";

// MUI
import {
  Container,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Pagination,
  Grid,
  Skeleton,
} from "@mui/material";
import { StarRounded } from "@mui/icons-material";

// Assets
import bigPlanet from "public/assets/images/planet.png";
import planetOrange from "public/assets/images/planet-jup-orange.svg";
import ufoOrange from "public/assets/images/ufo-orange.svg";

const ShopRating = ({ shopId, shopRatings }) => {
  const [ratingsData, setRatingsData] = useState(shopRatings);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [isLoadingRating, setIsLoadingRating] = useState(false);

  // Sort handler
  const sortChangeHandler = (event) => {
    setSort(event.target.value);
  };

  // Change page handler
  const pageChangeHandler = (event, value) => {
    setPage(value);
    getProductRatings(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Refetch product ratings
  const getProductRatings = async (newPage) => {
    try {
      setIsLoadingRating(true);
      const res = await get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/shops/${shopId}/reviews?page=${newPage}`
      );

      if (res.ok) {
        setRatingsData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingRating(false);
    }
  };

  return (
    <div className="shopRatingContainer">
      <Container maxWidth="lg">
        <section className="sortSection">
          {ratingsData?.results?.length > 0 && (
            <p className="productsCount">Selected Ratings</p>
          )}

          {ratingsData?.results?.length > 0 && (
            <div className="sortDiv">
              <p className="sortText">Sort by</p>
              <FormControl fullWidth>
                <Select
                  size="small"
                  displayEmpty={true}
                  value={sort}
                  onChange={sortChangeHandler}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value="newest">
                    <Typography>Newest</Typography>
                  </MenuItem>
                  <MenuItem value="oldest">
                    <Typography>Oldest</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </section>
        <section className="ratingSection">
          {isLoadingRating ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1em" }}
            >
              <Skeleton variant="rounded" height={130} />
              <Skeleton variant="rounded" height={130} />
              <Skeleton variant="rounded" height={130} />
            </div>
          ) : ratingsData?.results?.length ? (
            ratingsData?.results?.map((item, index) => (
              <Grid container key={index} className="ratingCard">
                <Grid item md={1} xs={4}>
                  <div className="imageContainer">
                    <Image
                      width="100px"
                      height="100px"
                      src={item.cover_image_url}
                      alt={item.product_name}
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                </Grid>
                <Grid item md={11} xs={8}>
                  <div
                    style={{
                      paddingLeft: "2em",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <p className="productName">{item.title}</p>
                    <div className="ratingItem">
                      <p>{item.User.full_name}</p>
                      <p style={{ fontWeight: "200" }}>|</p>
                      <div>
                        {new Array(item.rating).fill("x").map((item, index) => (
                          <StarRounded key={index} />
                        ))}
                      </div>
                    </div>
                    <p className="productComment">{item.review_detail}</p>
                  </div>
                </Grid>
              </Grid>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No ratings yet</p>
          )}

          {ratingsData?.results?.length > 0 && (
            <div className="pagination">
              <Pagination
                count={ratingsData.total_pages}
                page={page}
                onChange={pageChangeHandler}
              />
            </div>
          )}
          {ratingsData?.results?.length > 3 && (
            <>
              <div className="bigPlanet">
                <Image
                  src={bigPlanet}
                  width="400px"
                  height="400px"
                  alt="big planet"
                />
              </div>
              <div className="orangePlanet">
                <Image
                  src={planetOrange}
                  width="162px"
                  height="95px"
                  alt="orange planet"
                />
              </div>
              <div className="ufoOrange">
                <Image
                  src={ufoOrange}
                  width="128px"
                  height="80px"
                  alt="orange ufo"
                />
              </div>
            </>
          )}
        </section>
      </Container>
    </div>
  );
};

export default ShopRating;
