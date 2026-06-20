import { useState } from "react";
import { getMembershipStatus } from "./getMembershipStatus";
import { getMembershipStatusModel } from "./getMembershipStatusService";

export const useGetMembershipStatus = () => {
  const [memberStatus, setMemberStatus] = useState();

  const getMemberStatus = async () => {
    const membership = await getMembershipStatus();
    setMemberStatus(membership);
  };

  return {
    ...getMembershipStatusModel(memberStatus),
    getMemberStatus,
  };
};
