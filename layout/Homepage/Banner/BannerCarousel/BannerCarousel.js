//Next JS
import Image from "next/image";

//React Material UI Carousel
import Carousel from "react-material-ui-carousel";

//Images
import bannerAds from "@public/assets/images/banner-carousel.svg";
import squares from "public/assets/icons/Squares.svg";

const BannerCarousel = () => {
  return (
    <div className="bannerCarouselDiv">
      <div className="leftSquare">
        <Image src={squares} alt="square" />
      </div>
      <div className="bannerCarouselContainer">
        <div className="bannerCarousel">
          <Carousel indicators={false} animation="slide">
            <Image src={bannerAds} alt="carouselimage" />
            <Image src={bannerAds} alt="carouselimage" />
            <Image src={bannerAds} alt="carouselimage" />
            <Image src={bannerAds} alt="carouselimage" />
          </Carousel>
        </div>
      </div>
      <div className="rightSquare">
        <Image src={squares} alt="square" />
      </div>
    </div>
  );
};

export default BannerCarousel;
