import { Paper, styled } from "@mui/material";
import React from "react";
// import SubHeaderTitleImg from "@public/assets/images/FlowTop.png";
import SubHeaderTitleImg from "@public/assets/images/SubHeaderTitle.svg";

const SubHeader = styled(Paper)(() => ({
  padding: "19px",
  paddingLeft: "34px",
  justifyContent: "space-evenly",
  backgroundImage: `url(${SubHeaderTitleImg.src})`,
  backgroundSize: "cover",
  color: "#FFFFFF",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "24px",
  minHeight: "62px",
}));

function SubHeaderCard(props) {
  const { children } = props;
  return <SubHeader elevation={0}>{children}</SubHeader>;
}

export default SubHeaderCard;
