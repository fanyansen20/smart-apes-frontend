//Next JS
import Image from "next/image";

//Material UI
import { Box, Button, Grid, Typography, Chip, Rating } from "@mui/material";

//Images
import tutor from "@public/assets/images/sample-tutor.jpg";
const TopTutorDetails = () => {
  return (
    <Grid item xs={12} lg={7}>
      <Grid container>
        <Grid item xs={6} className="tutorImageDiv">
          <Image
            src={tutor}
            alt="this is a tutor"
            style={{ borderRadius: "20px" }}
            layout="responsive"
            width="250px"
            height="250px"
          />
        </Grid>
        <Grid item xs={6} className="tutorDetailsDiv">
          <Typography className="tutorDetailsName">Mantou Lou</Typography>
          <Typography className="tutorDetailsDescription">
            Lou is an expert tutor, one of the founding faculty members and has
            previously worked at GWA Dubai as he understands Math and Biology
          </Typography>
          <div className="tutorDetailsTag">
            <Chip label="Math" className="tag" />
            <Chip label="Physics" className="tag" />
            <Chip label="Biology" className="tag" />
          </div>
          <div className="tutorDetailsRatingDiv">
            <Rating name="read-only" value={4.8} precision={0.5} readOnly />{" "}
            <Typography className="rating">4.8 Star Ratings (4,3k)</Typography>
          </div>
          <Box>
            <Button variant="outlined" className="detailsButton">
              Details
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopTutorDetails;
