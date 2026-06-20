import { getMembershipStatusModel } from "./getMembershipStatusService";

describe("Get membership status view model", () => {
  test("return model if data fetching is failed", () => {
    const membership = undefined;

    const data = getMembershipStatusModel(membership);

    expect(data).toEqual({
      membership: undefined,
    });
  });

  test("return model if data is available", () => {
    const membership = {
      status: "ACTIVE",
      total_paid_string: "S$15.00",
      id: "fe559095-daee-46b7-ae7f-ad1e0c590792",
      user_id: "cb33739b-9b07-4e77-8d20-dfe53ec09e21",
      start_date: "2023-08-17T13:05:41.000Z",
      end_date: "2024-05-08T13:30:38.000Z",
      tier: "Basic",
      number_of_purchase: 1,
      total_paid: 15,
    };

    const data = getMembershipStatusModel(membership);

    expect(data).toEqual({
      membership: {
        status: "ACTIVE",
        type: "Basic",
        startDate: "17 August 2023",
        endDate: "08 May 2024",
      },
    });
  });
});
