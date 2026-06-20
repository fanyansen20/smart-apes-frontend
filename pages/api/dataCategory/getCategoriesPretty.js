const getCategoriesPretty = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?pretty=true`
    );

    const dataCategoriesPrerry = await response.json();

    return dataCategoriesPrerry;
  } catch (err) {
    return err.message;
  }
};

export default getCategoriesPretty;
