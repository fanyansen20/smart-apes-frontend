import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// MUI
import { Container } from "@mui/material";

// Components
import HeaderNavigation from "view/mobile/components/HeaderNavigation";
import AddChildren from "./components/AddChildren";
import ChildrenList from "./components/ChildrenList";

// Style
import classes from "./_Assign.module.scss";

const ProfilingAssignTest = ({ dataChildren, totalResult }) => {
  const router = useRouter();

  // #region useState
  const [selectedChild, setSelectedChild] = useState();
  // #endregion

  // #region function
  const onSelectChildren = (id) => {
    setSelectedChild(id);
  };

  const setShowAddChildren = () => {
    router.push({
      pathname: router.pathname,
      query: { "add-children": true },
    });
  };
  // #endregion

  // #region data
  const addChildren = router.query["add-children"];
  // #endregion

  return (
    <Container className={classes.container}>
      <HeaderNavigation pageTitle="Try Basic Package" />
      {totalResult > 0 && !addChildren && (
        <ChildrenList
          dataChildren={dataChildren}
          selectedChild={selectedChild}
          totalResult={totalResult}
          onSelectChildren={onSelectChildren}
          addChildren={setShowAddChildren}
        />
      )}
      {(totalResult === 0 || addChildren) && <AddChildren />}
    </Container>
  );
};

export default ProfilingAssignTest;
