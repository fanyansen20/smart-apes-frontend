export default async function getCategoriesSpecifications(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories/${id}/specifications`
    );

    const dataSpecificationsFilter = await response.json();

    return dataSpecificationsFilter;
  } catch (err) {
    return err.message;
  }
}
