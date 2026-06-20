export default async function getPaymentMethods() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/payment-methods?country_id=sg&code=paypal&code=hitpay`
    );

    if (response.status === 200) {
      const dataPaymentMethod = await response.json();
      return dataPaymentMethod;
    } else {
      const noData = {
        results: [],
        total_pages: 0,
        total_results: 0,
      };
      return noData;
    }
  } catch (err) {
    return err.message;
  }
}
