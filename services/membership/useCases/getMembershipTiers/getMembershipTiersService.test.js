import { memberTiers } from "view/desktop/pages/membership/memberConstant";
import { getMembershipTiersModel } from "./getMembershipTiersService";

describe("Get membership tiers view model", () => {
  test("return model if data fetching is failed", () => {
    const tiersRes = undefined;

    const data = getMembershipTiersModel(tiersRes);

    expect(data).toEqual([]);
  });

  test("return model if data is available", () => {
    const tiersRes = [
      {
        membership_price: 20,
        membership_fee: 0,
        total_paid: 20,
        number_of_purchase: 1,
        duration_in_year: 1,
        tier: "Basic",
        membership_price_string: "S$20.00",
        membership_fee_string: "S$0.00",
        total_paid_string: "S$20.00",
      },
      {
        membership_price: 40,
        membership_fee: 0,
        total_paid: 40,
        number_of_purchase: 1,
        duration_in_year: 1,
        tier: "Premium",
        membership_price_string: "S$40.00",
        membership_fee_string: "S$0.00",
        total_paid_string: "S$40.00",
      },
      {
        membership_price: 60,
        membership_fee: 0,
        total_paid: 60,
        number_of_purchase: 1,
        duration_in_year: 1,
        tier: "Elite",
        membership_price_string: "S$60.00",
        membership_fee_string: "S$0.00",
        total_paid_string: "S$60.00",
      },
    ];

    const data = getMembershipTiersModel(tiersRes);

    expect(data.length).toEqual(memberTiers.length);

    expect(data[0]).toEqual({
      ...memberTiers[0],
      price: 20,
      priceString: "S$20.00",
      totalPaid: 20,
      totalPaidString: "S$20.00",
    });

    expect(data[1]).toEqual({
      ...memberTiers[1],
      price: 40,
      priceString: "S$40.00",
      totalPaid: 40,
      totalPaidString: "S$40.00",
    });

    expect(data[2]).toEqual({
      ...memberTiers[2],
      price: 60,
      priceString: "S$60.00",
      totalPaid: 60,
      totalPaidString: "S$60.00",
    });
  });
});
