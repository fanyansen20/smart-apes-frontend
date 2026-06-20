import { useEffect } from "react";

/**
 * @typedef {{
 * number : number
 * title : string
 * image : any
 * content : JSX.Element
 * }} TutorialData
 */

/**
 *
 * @param {{
 *  tutorialData : TutorialData
 *  setIsImageLoad: () => void
 *  setImageHowTo: () => void
 * intervalDuration : number,
 * timeoutDuration : number,
 * }} props
 */

const useAnimateAssessmentImage = ({
  tutorialData,
  setIsImageLoad,
  setImageHowTo,
  intervalDuration = 3000,
  timeoutDuration = 300,
}) => {
  useEffect(() => {
    const interval = setInterval(() => cycleArray(), intervalDuration);
    return () => clearInterval(interval);
  }, []);

  let count = 0;
  const cycleArray = () => {
    let image = tutorialData[count].image.src;
    setIsImageLoad((prevState) => !prevState);
    setImageHowTo(image);
    setTimeout(() => {
      setIsImageLoad((prevState) => !prevState);
    }, timeoutDuration);

    count++;

    if (count === tutorialData.length) count = 0;
  };
};

export default useAnimateAssessmentImage;
