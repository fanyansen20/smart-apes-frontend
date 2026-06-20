export const getProductsByCategoryOneSectionType = async (
  categoryOneId,
  sectionType
) => {
  const getDataProduct = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products/top/${categoryOneId}/${sectionType}`
  );
  const { results } = await getDataProduct.json();
  return results;
};
