import { useEffect, useState } from "react";

// Css
import classes from "./_LandingPageMobile.module.scss";

// Component
import ProductsContainerMobile from "../../components/ProductsList";
import CarouselMobile from "./components/carouselMobile";
import CategoriesMobile from "./components/categoriesMobile";
import FloatingButton from "./components/floatingButton";
import HeroBannerMobile from "./components/heroBannerMobile";

// lib || Hooks
import useGetBestSellerProduct from "@hooks/landing-page/useGetBestSellerProduct";
import { useInView } from "react-intersection-observer";

// api service
import getTopProduct from "../../../../pages/api/clientSide/dataProducts/getTopProducts";

// Image
import bannerBestSeller from "../../assets/images/landing-page/banner-best-seller.svg";

const HomePage = ({ dataCategories, idTopProductPromotions }) => {
  const [isGetData, setIsGetData] = useState({});

  const {
    ref: refEducationMaterials,
    inView: isViewProductEducationMaterials,
  } = useInView({
    margin: "-500px",
  });
  const { ref: refStationery, inView: isViewProductStationery } = useInView();

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
    <div className={classes.containerLandingPageMobile}>
      <HeroBannerMobile />
      <CategoriesMobile dataCategories={dataCategories} />
      <CarouselMobile />

      <div ref={refEducationMaterials}></div>
      <ProductsContainerMobile
        title="Best Seller in Education Material"
        bannerImage={bannerBestSeller}
        dataProduct={productTopEducationalMaterials}
        isLoading={loadingProductEducationalMaterials}
        onClickSeeAll={() => {}}
      />

      <div ref={refStationery}></div>
      <ProductsContainerMobile
        title="Best Seller in Stationery"
        bannerImage={bannerBestSeller}
        dataProduct={productTopStationery}
        isLoading={loadingProductStationery}
        onClickSeeAll={() => {}}
      />
      <FloatingButton />
    </div>
  );
};

export default HomePage;
