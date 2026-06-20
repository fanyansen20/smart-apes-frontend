import { formatDate } from "@helper/formatDate";

export const getMembershipStatusModel = (membership) => {
  if (!membership) return { membership: undefined };

  const startDate = membership?.start_date
    ? formatDate(membership?.start_date, "dd MMMM yyyy")
    : "";
  const endDate = membership?.end_date
    ? formatDate(membership?.end_date, "dd MMMM yyyy")
    : "";

  return {
    membership: {
      status: membership?.status,
      type: membership?.tier,
      startDate,
      endDate,
    },
  };
};
