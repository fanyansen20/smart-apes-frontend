import View from "view";

// next and react js
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getChildren } from "store/reducer/profilingTest/getChildren";

// hooks
import useLoginCallback from "@hooks/useLoginCallback";

const AssignProfilingTest = ({ device }) => {
  const dispatch = useDispatch();

  // #region hooks
  const { data: session, status } = useSession();
  const handleLoginCallback = useLoginCallback();
  // #endregion

  // #region redux state
  const {
    status: statusGetChild,
    dataChildren,
    totalResult,
  } = useSelector((store) => store.getChildren);
  // #endregion

  // #region declaration
  const isUserNotLoggedIn = !session && status !== "authenticated";
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (status === "loading") return;

    if (!session && status !== "authenticated")
      return handleLoginCallback(`profiling-test/assign`);
  }, [status]);

  useEffect(() => {
    if (!isUserNotLoggedIn && statusGetChild === "idle") {
      dispatch(getChildren({ showPendingBasicTest: true }));
    }
  }, [session, status]);
  // #endregion

  return (
    <View
      device={device}
      path="assign-profiling-test"
      dataChildren={dataChildren}
      totalResult={totalResult}
    />
  );
};

export default AssignProfilingTest;
