import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import classes from "./MemberBadge.module.scss";

import { memberTiers } from "view/desktop/pages/membership/memberConstant";

const MemberBadge = () => {
  const membershipData = useSelector((store) => store.member);
  const activeMemberTier = memberTiers.find(
    (member) => member.title === membershipData?.memberType
  );

  return (
    <Link href="/membership/member-details">
      <div className={classes.memberBadgeHeader}>
        <Image
          src={activeMemberTier?.icon}
          alt="member badge"
          width={30}
          height={30}
        />
        <p className={classes[`memberHeading__${activeMemberTier?.title}`]}>
          {activeMemberTier?.title}
          <br />
          Member
        </p>
      </div>
    </Link>
  );
};

export default MemberBadge;
