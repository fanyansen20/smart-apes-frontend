export default async function getCategories(
  { orderLevel, slug, limit, page, pretty } = ""
) {
  const isOrderLevel = orderLevel ? `&order_level=${orderLevel}` : "";
  const isSlug = slug ? `&slug=${slug}` : "";
  const isLimit = `&limit=${limit ?? 10}`;
  const isPage = `&page=${page ?? 1}`;
  const isPretty = pretty ? "&pretty=true" : "";

  try {
    const resCategories = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?${isOrderLevel}${isSlug}${isPretty}${isPage}${isLimit}`
    );

    const dataCategories = await resCategories.json();

    return dataCategories;
  } catch (error) {
    return error.message;
  }
}
