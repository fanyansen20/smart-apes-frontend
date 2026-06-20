const getCategoryBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?slug=${slug}`
    );

    const dataCategorybySlug = await response.json();

    return dataCategorybySlug;
  } catch (err) {
    return err.message;
  }
};

export default getCategoryBySlug;
