//React
import { useEffect, useState } from "react";

//Next JS
import { useRouter } from "next/router";

//Next Auth
import { useSession } from "next-auth/react";

//Components
import AuthLayout from "@layout/AuthLayout";
import EmailForm from "@layout/Register/EmailForm/EmailForm";
import ParentCentreLogo from "view/mobile/components/ParentCentreLogo";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { status } = useSession();
  const [_selected, setSelected] = useState(false);

  useEffect(() => {
    dispatch(isLayout({ isNavbar: false, isFooter: false }));
  }, []);

  useEffect(() => {
    if (status == "authenticated") router.replace("/");
  }, [status, router]);

  const selectHandler = (select) => {
    setSelected(select);
  };

  return (
    <AuthLayout>
      <EmailForm selectHandler={selectHandler} />
    </AuthLayout>
  );
};

export default Register;
