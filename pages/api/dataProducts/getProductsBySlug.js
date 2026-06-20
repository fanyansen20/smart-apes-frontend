const getProductsBySlug = async (idCategory, limit) => {
  const newLimit = limit ? limit : 12;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products?category_tree=${idCategory}&limit=${newLimit}`
    );

    const dataProductByCategoryTree = await response.json();

    if (!dataProductByCategoryTree.code) {
      return dataProductByCategoryTree;
    }

    if (dataProductByCategoryTree.code) {
      const notData = {
        results: [],
        total_pages: 0,
        total_results: 0,
        categories: [],
        spec_and_values: [],
        message: dataProductByCategoryTree.massage,
      };
      return notData;
    }
  } catch (err) {
    return err;
  }
};

export default getProductsBySlug;
