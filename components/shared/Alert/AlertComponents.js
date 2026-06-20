//Material-UI
import { Typography } from "@mui/material";

const AlertComponent = ({ title, subTitles }) => {
  return (
    <div>
      <Typography className="AlertTittle">{title}</Typography>
      {subTitles.map((subTitle, key) => (
        <>
          {key ? <br /> : ""}
          <Typography className="AlertSubTittle">{subTitle}</Typography>
        </>
      ))}
    </div>
  );
};

export default AlertComponent;
