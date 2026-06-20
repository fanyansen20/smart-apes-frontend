//Material UI
import animation from "public/assets/animations/smartapes-animation.svg";

const HeroBanner = () => {
  return (
    <div className="containerHeroBanner">
      {process.env.NODE_ENV !== "development" && (
        <object type="image/svg+xml" data={animation.src}></object>
      )}
    </div>
  );
};

export default HeroBanner;
