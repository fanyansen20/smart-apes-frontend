// Next
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";

// MUI
import CloseIcon from "@mui/icons-material/Close";
import { Fade, IconButton, Modal } from "@mui/material";

// Styles
import classes from "./ModalImageCarousel.module.scss";

const ModalImageCarousel = ({
  openModal,
  handleCloseModal,
  productImages,
  currentImageIdx,
}) => {
  const mainImageRef = useRef();
  const [previewImageIdx, setPreviewImageIdx] = useState(currentImageIdx);
  const [windowHeight, setWindowHeight] = useState(500);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [startPosition, setStartPosition] = useState({
    x: null,
    y: null,
    distance: null,
  });
  const [touchLength, setTouchLength] = useState(0);

  const distance = (event) => {
    return Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchLength(1);
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    }

    if (e.touches.length === 2) {
      e.preventDefault();
      setTouchLength(2);

      const start = {};
      start.x = (e.touches[0].pageX + e.touches[1].pageX) / 2;
      start.y = (e.touches[0].pageY + e.touches[1].pageY) / 2;
      start.distance = distance(e);
      setStartPosition(start);
    }
  };

  const onTouchMove = (e) => {
    const imageElement = document.getElementById("carouselImage");

    if (e.touches.length === 1) {
      setTouchLength(1);
      setTouchEnd(e.targetTouches[0].clientX);
    }

    if (e.touches.length === 2) {
      e.preventDefault();
      setTouchLength(2);

      let scale;

      if (e.scale) {
        scale = e.scale;
      } else {
        const deltaDistance = distance(e);
        scale = deltaDistance / startPosition.distance;
      }

      const _imageElementScale = Math.min(Math.max(1, scale), 4);
      const _deltaX =
        ((e.touches[0].pageX + e.touches[1].pageX) / 2 - startPosition.x) * 2;
      const _deltaY =
        ((e.touches[0].pageY + e.touches[1].pageY) / 2 - startPosition.y) * 2;

      const transform = `translate3d(${_deltaX}px, ${_deltaY}px, 0) scale(${_imageElementScale})`;
      imageElement.style.transform = transform;
      imageElement.style.WebkitTransform = transform;
      imageElement.style.zIndex = "9999";
    }
  };

  const onTouchEnd = () => {
    if (touchLength === 1) {
      const minSwipeDistance = 50;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      const firstIndex = 0;
      const lastIndex = productImages.length - 1;

      if (isRightSwipe)
        setPreviewImageIdx((current) =>
          current === firstIndex ? lastIndex : current - 1
        );
      if (isLeftSwipe)
        setPreviewImageIdx((current) =>
          current === lastIndex ? firstIndex : current + 1
        );
    }

    if (touchLength === 2) {
      const imageElement = document.getElementById("carouselImage");

      // Reset value for pinch zoom
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";
    }
  };

  const handleChangePreviewImage = (idx) => setPreviewImageIdx(idx);

  useLayoutEffect(() => {
    const updateWindowHeight = () => setWindowHeight(window?.innerHeight);

    window.addEventListener("resize", updateWindowHeight);
    updateWindowHeight();

    return () => window.removeEventListener("resize", updateWindowHeight);
  }, []);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      classes={{ backdrop: classes.backdrop }}
    >
      <Fade in={openModal}>
        <div
          className={classes.containerModalImageCarousel}
          style={{ height: windowHeight }}
        >
          <section className={classes.header}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </section>
          <section
            ref={mainImageRef}
            className={classes.mainImage}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            id="carouselImage"
          >
            <Carousel
              onChange={(targetIdx) => handleChangePreviewImage(targetIdx)}
              index={previewImageIdx}
              swipe={false}
              indicators={false}
              autoPlay={false}
              navButtonsAlwaysInvisible={true}
              height="400px"
            >
              {productImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  className={classes.bannerImg}
                  alt="product"
                  height="400px"
                  width="400px"
                  objectFit="contain"
                />
              ))}
            </Carousel>
          </section>
          <section>
            <p className={classes.imageNumber}>
              {previewImageIdx + 1}/{productImages?.length}
            </p>
            <div className={classes.productImages}>
              {productImages.map((image, index) => (
                <div
                  className={
                    previewImageIdx === index
                      ? classes.productImage__active
                      : classes.productImage
                  }
                  key={index}
                >
                  <Image
                    onClick={() => handleChangePreviewImage(index)}
                    src={image}
                    alt="preview product"
                    height="64px"
                    width="64px"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalImageCarousel;
