// React
import { interpolateString } from "@helper/interpolateString";
import useLoginCallback from "@hooks/useLoginCallback";
import CheckIcon from "@mui/icons-material/Check";
import { Container, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMembershipTiers } from "services/membership/useCases/getMembershipTiers/useGetMembershipTiers";
import { isLayout } from "store/reducer/layout/layoutSlice";
import { setCheckoutTier } from "store/reducer/membership/membershipSlice";

// Components
import Navbar from "@components/Navigation/Navbar";
import Footer from "@components/footer/Footer";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// Assets
import AstronautMember from "@public/assets/images/astronaut-member.svg";
import AstronautVoucher from "@public/assets/images/astronaut-voucher.svg";
import HalfMoon from "@public/assets/images/half-moon-gray.svg";
import AvatarMale from "@public/assets/images/male-avatar.svg";
import Planet from "@public/assets/images/planet-2.png";
import PlanetOrange from "@public/assets/images/planet-jup-orange.svg";
import WalletCircle from "@public/assets/images/wallet-circle.svg";

// Constant
import { memberBenefit } from "./memberConstant";

const Membership = () => {
  const dispatch = useDispatch();
  const handleLoginCallback = useLoginCallback();
  const router = useRouter();
  const { data: session, status } = useSession();
  const membershipData = useSelector((store) => store.member);
  const { memberTiers, getMemberTiers } = useGetMembershipTiers();

  const isBoughtMembership = membershipData?.memberType !== "none";

  useEffect(() => {
    getMemberTiers();
    dispatch(isLayout({ isFooter: false }));
  }, []);

  const handleChooseTier = (tier) => {
    if (!session && status !== "authenticated") return handleLoginCallback();

    tier.userId = session?.user?.id;
    dispatch(setCheckoutTier(tier));
    router.push("/membership/checkout");
  };

  return (
    <div className="membershipLanding">
      <Navbar />
      <section className="memberHeading">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6.5} xs={12}>
              <h1>
                Be part of something
                <br /> great – Upgrade your
                <br /> <span>Member</span> today!
              </h1>
              <h3>
                One place for all your digital publishing needs with End-to-end
                Digital Transformation Solutions. Find out more now!
              </h3>
            </Grid>
            <Grid item md={5.5} xs={12}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src={AstronautMember}
                  style={{ zIndex: "2" }}
                  alt="astronaut member"
                />
              </div>
            </Grid>
          </Grid>
          <div className="planet">
            <Image src={Planet} alt="planet" width={500} height={500} />
          </div>
        </Container>
      </section>
      <section className="memberStep">
        <div className="memberStepContainer">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item md={5} className="stepHeading">
                <h3>
                  Easy step to <br /> Become A Member
                </h3>
              </Grid>
              <Grid
                item
                md={3.5}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <div className="contentItem">
                  <Image
                    src={AvatarMale}
                    alt="user icon"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="contentTitle">Register an account</p>
                    <p className="contentSubtitle">
                      You need to Sign Up to have SMART APES account
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                md={3.5}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <div className="contentItem">
                  <Image
                    src={WalletCircle}
                    alt="user icon"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="contentTitle">Purchase your plan</p>
                    <p className="contentSubtitle">
                      purchase member plan that suits your need and enjoy all
                      benefits
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container maxWidth="lg">
          <div className="moonGray">
            <Image src={HalfMoon} alt="moon-gray" />
          </div>
        </Container>
      </section>
      <section className="memberOptions">
        <Container maxWidth="lg">
          <Grid container columnSpacing={2}>
            <Grid item md={5} xs={12}>
              <div className="leftOption">
                <Image src={AstronautVoucher} alt="astronaut member" />
              </div>
            </Grid>
            <Grid item md={7} xs={12}>
              <div className="rightOption">
                <h5>FULL OF BENEFIT</h5>
                <h3>
                  Upgrade member with all benefit you can get, all in one place
                </h3>
                {memberBenefit.map((benefit, index) => (
                  <div key={index} className="memberBenefit">
                    <div className="memberBenefitIcon">
                      <Image
                        src={benefit.image}
                        width={70}
                        height={70}
                        alt="member discount"
                      />
                    </div>
                    <p>{benefit.text}</p>
                  </div>
                ))}
                <div className="planetOrange">
                  <Image src={PlanetOrange} alt="Planet orange" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <div className="planetLeftBot">
          <Image src={Planet} alt="planet" width={500} height={500} />
        </div>
      </section>
      <section className="memberOptions memberOptionsPricing">
        <Container maxWidth="lg">
          <div>
            <h5>PRICING</h5>
            <h3>Flexible Pricing for each Membership Tiers</h3>
          </div>
          <div className="memberTierCardContainer">
            {memberTiers?.map((tier, idxTier) => (
              <section
                key={idxTier}
                className={
                  tier.isMostPopular
                    ? "memberTierCardPopular"
                    : "memberTierCard"
                }
              >
                <div className="tierHighlight">Most Popular</div>
                <div className="tierContent">
                  <div className="memberBadge">
                    <Image src={tier.icon} alt="member badge" />
                  </div>
                  <h4>
                    {tier?.priceString}
                    <span>/yearly</span>
                    <PrimaryButton
                      onClick={() => handleChooseTier(tier)}
                      disabled={session && isBoughtMembership}
                      fullWidth
                    >
                      Purchase Plan
                    </PrimaryButton>
                  </h4>
                  <p>What you will get:</p>
                  {tier?.perks?.map((perks, idxPerks) => (
                    <div key={idxPerks} className="tierPerks">
                      <CheckIcon />
                      <p>{interpolateString(perks, tier.perksRef)}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
      <Container maxWidth="lg">
        <Footer />
      </Container>
    </div>
  );
};

export default memo(Membership);
