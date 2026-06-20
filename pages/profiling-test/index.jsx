import View from "view";

// react || next
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getChildren } from "store/reducer/profilingTest/getChildren";
import { getTestProduct } from "store/reducer/profilingTest/getTestProduct";

const ProfilingLandingPage = ({ device }) => {
  const { data: session, status } = useSession();
  const isUserNotLoggedIn = !session && status !== "authenticated";

  const dispatch = useDispatch();

  const data = useSelector((store) => store.getTestProduct);
  const memberShipData = useSelector((store) => store.member);
  const {
    status: statusGetChild,
    dataChildren,
    totalResult,
  } = useSelector((store) => store.getChildren);

  const isActiveMember = memberShipData.status === "ACTIVE";
  const isTakeBasicTest =
    !memberShipData.memberType ||
    memberShipData.memberType === "Basic" ||
    memberShipData.memberType === "none";

  useEffect(() => {
    if (!isUserNotLoggedIn && statusGetChild === "idle") {
      dispatch(getChildren({ showPendingBasicTest: true }));
    }
  }, [session, status]);

  useEffect(() => {
    if (data.status === "idle") {
      dispatch(getTestProduct());
    }
  }, [data.status]);

  return (
    <View
      device={device}
      path="profiling-test"
      data={data}
      isActiveMember={isActiveMember}
      isTakeBasicTest={isTakeBasicTest}
      dataChildren={dataChildren}
      isOpenModalAddChild={totalResult === 0}
    />
  );
};

ProfilingLandingPage.getLayout = (page) => <>{page}</>;

export default ProfilingLandingPage;
