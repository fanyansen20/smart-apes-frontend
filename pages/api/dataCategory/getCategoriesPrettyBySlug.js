const getCategoriesPrettyBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?pretty=true&slug=${slug}`
    );

    const getCategoriesPrettyBySlug = await response.json();

    return getCategoriesPrettyBySlug;
  } catch (err) {
    return err.message;
  }
};

export default getCategoriesPrettyBySlug;
