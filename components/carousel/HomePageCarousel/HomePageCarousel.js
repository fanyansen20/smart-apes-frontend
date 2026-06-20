//Material UI
import { East as RightArrow } from "@mui/icons-material";
import { KeyboardBackspace as LeftArrow } from "@mui/icons-material";

//React Multi Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;
  return (
    <>
      {currentSlide !== 0 && (
        <button onClick={() => previous()} className="customLeftArrow">
          <LeftArrow />
        </button>
      )}
      {totalItems === 8 && currentSlide !== 4 && (
        <button
          className="customRightArrow"
          type="button"
          onClick={() => next()}
        >
          <RightArrow />
        </button>
      )}
    </>
  );
};

const BestSellerCarousel = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        containerClass="carouselContent"
        ssr={true}
        infinite={false}
        autoPlaySpeed={1000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {props.children}
      </Carousel>
    </div>
  );
};

export default BestSellerCarousel;
