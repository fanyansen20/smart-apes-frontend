// reason images
import laptopIcon from "public/assets/images/preAssessment/laptop-icon.svg";
import noteIcon from "public/assets/images/preAssessment/note-icon.svg";
import toysIcon from "public/assets/images/preAssessment/toys-icon.svg";

// Tutor images
import addChild from "@public/assets/images/preAssessment/add-child.svg";
import editCHild from "public/assets/images/preAssessment/edit-child.svg";
import parentDashboard from "public/assets/images/preAssessment/landing-page-smartapes.svg";
import signIn from "public/assets/images/preAssessment/login-page.svg";
import signInParent from "public/assets/images/preAssessment/sign-in-parent.svg";

const reasonData = [
  {
    title1: "Questions is Provided by the ",
    title2: "Professional Teacher",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    image: noteIcon,
  },
  {
    title1: "All of the Summary Result will ",
    title2: "be stored to System",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    image: laptopIcon,
  },
  {
    title1: "Recommendation Product for ",
    title2: "your Children",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    image: toysIcon,
  },
];

const testimonialData = [
  {
    title1: "Corem ipsum dolor sit amet, ",
    title2: "consectetur adipiscing elit.",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    imageProfile: "https://loremflickr.com/240/240/cat",
  },
  {
    title1: "Corem ipsum dolor sit amet, ",
    title2: "consectetur adipiscing elit.",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    imageProfile: "https://loremflickr.com/240/240/cat",
  },
  {
    title1: "Corem ipsum dolor sit amet, ",
    title2: "consectetur adipiscing elit.",
    content:
      "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra",
    imageProfile: "https://loremflickr.com/240/240/cat",
  },
];

const tutorialData = [
  {
    number: 1,
    title: "Sign In  As Parent",
    image: signIn,
    content: (
      <>
        The first thing you'll need to do to create a Children account is{" "}
        <b>log in as a Parent.</b> Visit the{" "}
        <a href="https://stage.smartapes.sg/">SmartApes Website</a> in your
        internet browser. Then in the upper-right click <b>Sign In</b> button
        <b> ></b> You will be directed to the <b>Login</b> page
      </>
    ),
  },
  {
    number: 2,
    title: "Go To Parent Dashboard",
    image: parentDashboard,
    content: (
      <>
        Once you have successfully log in as a parent, click the{" "}
        <b>Go to parent</b> dashboard button in the upper-right
      </>
    ),
  },
  {
    number: 3,
    title: "Add Child",
    image: addChild,
    content: (
      <>
        To create children account click <b>Add Child</b> button<b> ></b> After
        that, the data form will come out that must be filled in. If the
        children personal data is complete, click the Submit button.
      </>
    ),
  },
  {
    number: 4,
    title: "Edit Child Information Or Add More Child",
    image: editCHild,
    content: (
      <>
        If you want to add more children, you can click <b>Add Child</b> button
        on the top right corner of <b>My Children</b> page. If you want to view
        the children detailed information or change the information, click{" "}
        <b>View Detail</b> button.
      </>
    ),
  },
  {
    number: 5,
    title: "Free-Assessment Test",
    image: signInParent,
    content: (
      <>
        To get a free assessment test you can click{" "}
        <b>go to assessment central</b> on the parent dashboard. Then you will
        be redirected to the free assessment central. on this page click{" "}
        <b>take test</b> to get started
      </>
    ),
  },
];

export { reasonData, testimonialData, tutorialData };
