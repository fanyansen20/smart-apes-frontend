import useErrorHandler from "@hooks/useErrorHandler";
import { useState } from "react";
import { getMembershipTiers } from "./getMembershipTiers";
import { getMembershipTiersModel } from "./getMembershipTiersService";

export const useGetMembershipTiers = () => {
  const [memberTiers, setMemberTiers] = useState([]);
  const { handleClientError } = useErrorHandler();

  const getMemberTiers = async () => {
    await getMembershipTiers()
      .then((membershipTiers) => setMemberTiers(membershipTiers))
      .catch((err) => handleClientError(err));
  };

  return {
    memberTiers: getMembershipTiersModel(memberTiers),
    getMemberTiers,
  };
};
