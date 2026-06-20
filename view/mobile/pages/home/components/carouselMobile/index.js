// CSS
import classes from "./_CarouselMobile.module.scss";

//Next JS
import Image from "next/image";

//React Material UI Carousel
import Carousel from "react-material-ui-carousel";

//Images
import BannerCarouselMobile from "../../../../assets/images/landing-page/banner-carousel-mobile.svg";

const CarouselMobile = () => {
  const bannerImages = [
    { imageUrl: BannerCarouselMobile },
    { imageUrl: BannerCarouselMobile },
    { imageUrl: BannerCarouselMobile },
  ];

  return (
    <div className={classes.containerCarouselMobile}>
      <Carousel indicators={false} animation="slide">
        {bannerImages.map((image, key) => (
          <Image
            key={key}
            src={image.imageUrl}
            alt="carousel image"
            objectFit="cover"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselMobile;
