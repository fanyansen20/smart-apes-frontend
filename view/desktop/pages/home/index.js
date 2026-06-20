//React
import { memo, useEffect, useState } from "react";

// lib || Hooks
import useGetBestSellerProduct from "@hooks/landing-page/useGetBestSellerProduct";
import { useInView } from "react-intersection-observer";

//Material UI
import { Container } from "@mui/material";

// Layouts Import
import BestSellerProduct from "@components/layout/BestSellerProduct/BestSellerProduct";
import BannerCarousel from "@layout/Homepage/Banner/BannerCarousel/BannerCarousel";
import HeroBanner from "@layout/Homepage/Banner/HeroBanner/HeroBanner";
import Categories from "@layout/Homepage/Categories/Categories";
import FeaturedBrand from "@layout/Homepage/FeaturedBrand/FeaturedBrand";
import FeaturedOn from "@layout/Homepage/FeaturedOn/FeaturedOn";

// Image
// import bigPlanetRight from "public/assets/images/planet.png";
import bigPlanetLeft from "../../../../public/assets/images/planet-2.png";
import planetOrange from "../../../../public/assets/images/planet-jup-orange.svg";
import ufoOrange from "../../../../public/assets/images/ufo-orange.svg";

// API
import getTopProduct from "../../../../pages/api/clientSide/dataProducts/getTopProducts";

// components
import FloatingButton from "./components/FloatingButton/";

const Homepage = ({ dataCategories, idTopProductPromotions }) => {
  const {
    ref: refEducationMaterials,
    inView: isViewProductEducationMaterials,
  } = useInView({
    margin: "-500px",
  });
  const { ref: refStationery, inView: isViewProductStationery } = useInView();

  const [isGetData, setIsGetData] = useState({});

  const {
    dataProduct: productTopEducationalMaterials,
    isLoading: loadingProductEducationalMaterials,
    getDataProduct: getDataProductEducationalMaterials,
  } = useGetBestSellerProduct({
    getTopProduct,
  });

  const {
    dataProduct: productTopStationery,
    isLoading: loadingProductStationery,
    getDataProduct: getDataProductStationery,
  } = useGetBestSellerProduct({
    getTopProduct,
  });

  useEffect(() => {
    if (
      productTopEducationalMaterials?.length <= 0 &&
      isViewProductEducationMaterials &&
      !isGetData[idTopProductPromotions[0]?.idCategory]
    ) {
      getDataProductEducationalMaterials(
        idTopProductPromotions[0]?.idCategory,
        8
      );
      setIsGetData((prev) => ({
        ...prev,
        [idTopProductPromotions[0]?.idCategory]: true,
      }));
    }
    if (
      productTopStationery?.length <= 0 &&
      isViewProductStationery &&
      !isGetData[idTopProductPromotions[1]?.idCategory]
    ) {
      getDataProductStationery(idTopProductPromotions[1]?.idCategory, 8);
      setIsGetData((prev) => ({
        ...prev,
        [idTopProductPromotions[1]?.idCategory]: true,
      }));
    }
  }, [isViewProductEducationMaterials, isViewProductStationery]);

  return (
    <>
      <div className="marquee">
        <div className="track">
          Discount 50% for every Books you buy! | SMART APES Career starts here,
          come join now! 🏢 | Become a seller is the best way to get side
          income, join now 🚀 | Become a seller is the best way to get side
          income, join now ;🚀 Discount 50% for every Books you buy! | SMART
          APES Career starts here, come join now! 🏢 | Become a seller is the
          best way to get side income, join now 🚀 | Become a seller is the best
          way to get side income, join now ;🚀
        </div>
      </div>

      <div className="homePage">
        <FloatingButton />

        <Container maxWidth="lg">
          <HeroBanner />
          <Categories dataCategoryLevelOne={dataCategories} />
          <BannerCarousel />

          <div ref={refEducationMaterials}></div>
          <BestSellerProduct
            isLoadProduct={loadingProductEducationalMaterials}
            normalTitle="Best Seller in Education Materials"
            colorTitleLink="See all"
            linkGoToPage={`category/${idTopProductPromotions[0]?.slugCategory}`}
            dataProduct={productTopEducationalMaterials}
            imagePlanetRight={bigPlanetLeft}
            imagePlanetOrange={planetOrange}
            imageUfoOrange={ufoOrange}
          />

          <div ref={refStationery}></div>
          <BestSellerProduct
            isLoadProduct={loadingProductStationery}
            normalTitle="Best Seller in Stationery"
            colorTitleLink="See all"
            linkGoToPage={`category/${idTopProductPromotions[1]?.slugCategory}`}
            dataProduct={productTopStationery}
            imagePlanetLeft={bigPlanetLeft}
          />

          {/* <Benefits /> */}
          {/* <TopTutor /> */}
          {/* <TopVideoCourses /> */}
          <FeaturedBrand />
          <FeaturedOn />
        </Container>
      </div>
    </>
  );
};

export default memo(Homepage);
