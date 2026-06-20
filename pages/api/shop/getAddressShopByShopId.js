export default async function getAddressShopByShopId({ shopId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/shops/${shopId}/addresses?populate=Shop,Country`
    );

    const dataShopAddress = await response.json();

    return dataShopAddress;
  } catch (err) {
    return err.massage;
  }
}
