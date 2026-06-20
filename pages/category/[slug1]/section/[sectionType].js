// React
import React from "react";

// Services
import { getProductCategoryBySlug } from "services/productsCategory/getProductCategoryBySlug";
import { getProductsByCategoryOneSectionType } from "services/productsCategory/getProductsByCategoryOneSectionType";

// View
import View from "view";

const SectionPage = ({ device, ...otherProps }) => (
  <View {...otherProps} device={device} path="category-section" />
);

export async function getServerSideProps({ params }) {
  const { sectionType, slug1 } = params;
  const sectionTypes = ["sales", "promotions", "recommendations"];
  const categoryBySlug = await getProductCategoryBySlug({
    categorySlug: slug1,
  });
  const productsData = await getProductsByCategoryOneSectionType(
    categoryBySlug?.id,
    sectionType
  );

  if (!sectionTypes.includes(sectionType)) {
    return {
      redirect: {
        destination: `/category/${slug1}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      productsListData: sectionTypes.includes(sectionType) ? productsData : [],
    },
  };
}

export default SectionPage;
