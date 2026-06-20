import { useEffect } from "react";

/**
 * @typedef {{
 * number : number
 * title : string
 * image : any
 * content : JSX.Element
 * }} data
 */

/**
 *
 * @param {{
 *  data : data
 *  setIsImageLoad: () => void
 *  setImage: () => void
 * intervalDuration : number,
 * timeoutDuration : number,
 * }} props
 */

const useAnimateReturnRefund = ({
  data,
  setIsImageLoad,
  setImage,
  intervalDuration = 3000,
  timeoutDuration = 300,
}) => {
  useEffect(() => {
    const interval = setInterval(() => cycleArray(), intervalDuration);
    return () => clearInterval(interval);
  }, []);

  let count = 0;
  const cycleArray = () => {
    let image = data[count].image.src;
    setIsImageLoad((prevState) => !prevState);
    setImage(image);
    setTimeout(() => {
      setIsImageLoad((prevState) => !prevState);
    }, timeoutDuration);

    count++;

    if (count === data.length) count = 0;
  };
};

export default useAnimateReturnRefund;
