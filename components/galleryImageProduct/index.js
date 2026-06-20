// React
import { useEffect, useState } from "react";

// Material UI
import { Box, Grid, IconButton, Typography } from "@mui/material";

// Icon
import CloseIcon from "@mui/icons-material/Close";

// Carousel
import ImageGallery from "react-image-gallery";

const GalleryImageProduct = ({
  productName,
  closeModal,
  images,
  videoUrls,
}) => {
  const [galleryImages, setGalleryImages] = useState(false);

  useEffect(() => {
    const dataVideos = videoUrls.map((image) => {
      return {
        original: image.thumbnailImage,
        thumbnail: image.thumbnailImage,
        embedUrl: image.videoYoutube,
        renderItem: () => (
          <div className="video-wrapper">
            <iframe src={image.videoYoutube} allowFullScreen></iframe>
          </div>
        ),
      };
    });

    const dataImages = images.map((image) => {
      return {
        original: image,
        thumbnail: image,
      };
    });

    setGalleryImages([...dataVideos, ...dataImages]);
  }, []);

  return (
    <Box className="containerImageProductDetail">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={11}>
          <Typography className="productNameGalleryImage">
            {productName}
          </Typography>
        </Grid>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Grid>
      {galleryImages && (
        <ImageGallery
          autoPlay={false}
          infinite={false}
          items={galleryImages}
          showFullscreenButton={false}
          showPlayButton={false}
          thumbnailPosition="right"
        />
      )}
    </Box>
  );
};

export default GalleryImageProduct;
