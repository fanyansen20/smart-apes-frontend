// Next
import { useSession } from "next-auth/react";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import { Chip, Container, Grid } from "@mui/material";

// Utils
import moment from "moment";
import { getMembershipData } from "store/reducer/membership/membershipSlice";

// Components
import Navbar from "@components/Navigation/Navbar";
import DateRangePickerComp from "@components/dateRangePickerComp";

// Assets
import BgHeader from "public/assets/images/bg-member-details.svg";

const MemberDetailsPage = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (session?.accessToken && status === "authenticated") {
      dispatch(
        getMembershipData({ userId, accessToken: session?.accessToken })
      );
    }
  }, [session]);

  const membershipData = useSelector((store) => store.member);

  return (
    <div className="containerMemberDetails">
      <Navbar />
      <section
        className="memberDetailsHeader"
        style={{
          backgroundImage: `url(${BgHeader.src})`,
          backgroundSize: "100vw 22rem",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <Container maxWidth="lg">
          <h1>Your Member Details</h1>
          <Grid container spacing={3}>
            <Grid item md={5.5} xs={12}>
              <div className="memberPlan">
                <h5>Your Member Plan</h5>
                <h6>Check your member details</h6>
                <hr />
                <div className="memberPlanItem">
                  <p className="memberItemTitle">Membership Status</p>
                  <Chip
                    className={
                      membershipData?.status === "ACTIVE"
                        ? "chip__ACTIVE"
                        : "chip_INACTIVE"
                    }
                    label={membershipData?.status}
                  />
                </div>
                <div className="memberPlanItem">
                  <p className="memberItemTitle">Membership Type</p>
                  <p className="memberItemContent">
                    {membershipData?.memberType}
                  </p>
                </div>
                <div className="memberPlanItem">
                  <p className="memberItemTitle">Start Date</p>
                  <p className="memberItemContent">
                    {membershipData?.startDate
                      ? moment(membershipData?.startDate).format(
                          "DD/MM/YY HH:mm"
                        )
                      : "-"}
                  </p>
                </div>
                <div className="memberPlanItem">
                  <p className="memberItemTitle">Expiry Date</p>
                  <p className="memberItemContent">
                    {membershipData?.endDate
                      ? moment(membershipData?.endDate).format("DD/MM/YY HH:mm")
                      : "-"}
                  </p>
                </div>
                <div className="memberPlanItem">
                  <p className="memberItemTitle">Remaining Profiling Test</p>
                  <p className="memberItemContent"></p>
                </div>
              </div>
            </Grid>
            <Grid item md={6.5} xs={12}>
              <div className="memberActivity">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h5>Recent Activity</h5>
                    <h6>Your recent activity in SMART APES</h6>
                  </div>
                  <DateRangePickerComp />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }} className="memberItemTitle">
                        Date
                      </th>
                      <th
                        style={{ width: "80%" }}
                        className="memberItemContent"
                      >
                        Item Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="memberItemTitle">dd/mm/yy</td>
                      <td className="memberItemContent">
                        Purchase an item No. Invoice{" "}
                        <span className="activityInvoice">#SA312345123</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="memberItemTitle">dd/mm/yy</td>
                      <td className="memberItemContent">
                        Purchase an item No. Invoice{" "}
                        <span className="activityInvoice">#SA3123497873</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="memberItemTitle">dd/mm/yy</td>
                      <td className="memberItemContent">
                        Purchase an item No. Invoice{" "}
                        <span className="activityInvoice">#SA3123458776</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="memberItemTitle">dd/mm/yy</td>
                      <td className="memberItemContent">
                        Purchase an item No. Invoice{" "}
                        <span className="activityInvoice">#SA3126767123</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="memberItemTitle">dd/mm/yy</td>
                      <td className="memberItemContent">
                        Purchase an item No. Invoice{" "}
                        <span className="activityInvoice">#SA336453654</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default memo(MemberDetailsPage);
