// Services
import { getMembershipTiers } from "services/membership/useCases/getMembershipTiers/getMembershipTiers";
import { getMembershipTiersModel } from "services/membership/useCases/getMembershipTiers/getMembershipTiersService";

// View
import View from "view";

const Membership = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="membership" />;
};

export default Membership;

export async function getServerSideProps() {
  const memberTiers = await getMembershipTiers();

  return {
    props: {
      membershipTiersList: getMembershipTiersModel(memberTiers),
    },
  };
}
