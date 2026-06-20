//Next JS
import Image from "next/image";

//Material UI
import { Grid } from "@mui/material";

//Images
import tutor from "@public/assets/images/sample-tutor.jpg";
import astrounut from "@public/assets/images/astrounut-blue.svg";
import ellipseTopTutor from "@public/assets/images/ellipse-top-tutor.svg";

const TopTutorOrbit = () => {
  return (
    <Grid item xs={12} lg={5} className="animationGrid">
      <div className="animationContainer">
        <div className="orbit">
          <div className="centerImage">
            <Image
              src={tutor}
              alt="this is a tutor"
              style={{ borderRadius: "50%" }}
              layout="fixed"
              width="110px"
              height="110px"
            />
          </div>
          <ul>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="70px"
                height="70px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="50px"
                height="50px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="35px"
                height="35px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="65px"
                height="65px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="60px"
                height="60px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="45px"
                height="45px"
              />
            </li>
            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="55px"
                height="55px"
              />
            </li>

            <li>
              <Image
                src={tutor}
                alt="this is a tutor"
                style={{ borderRadius: "50%" }}
                layout="fixed"
                width="40px"
                height="40px"
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="astrounut">
        <Image
          src={astrounut}
          alt="astrounut"
          layout="fixed"
          width="153px"
          height="155px"
        ></Image>
      </div>
      <div className="ellipseTopTutor">
        <Image
          src={ellipseTopTutor}
          alt="astrounut"
          layout="fixed"
          width="164px"
          height="184px"
        ></Image>
      </div>
    </Grid>
  );
};

export default TopTutorOrbit;
