//React
import { useState } from "react";

//Layout
import TermAndCondition from "../TermAndCondition/TermAndCondition";
import WaitingConfirmationEmail from "../WaitingConfirmationEmail/WaitingConfirmationEmail";
import UserForm from "./UserForm/UserForm";

const EmailForm = ({ selectHandler }) => {
  const [user, setUser] = useState();
  const [nextClicked, setNextClicked] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [termAndCondition, setTermAndCondition] = useState(false);

  const nextHandler = (user, click) => {
    setUser(user);
    setNextClicked(click);
  };

  return (
    <>
      {!nextClicked && !registerSuccess && !termAndCondition && (
        <UserForm
          user={user}
          nextHandler={nextHandler}
          selectHandler={selectHandler}
          setNextClicked={setNextClicked}
          setTermAndCondition={setTermAndCondition}
        />
      )}

      {termAndCondition && (
        <TermAndCondition
          user={user}
          nextHandler={nextHandler}
          setNextClicked={setNextClicked}
          setRegisterSuccess={setRegisterSuccess}
          setTermAndCondition={setTermAndCondition}
        />
      )}
      {registerSuccess && <WaitingConfirmationEmail />}
    </>
  );
};

export default EmailForm;
