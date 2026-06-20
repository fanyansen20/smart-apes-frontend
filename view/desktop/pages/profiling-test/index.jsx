// next js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Mui Material
import { Container, Grid } from "@mui/material";

// style
import Image from "next/image";
import classes from "./_ProfilingTest.module.scss";

// assets
import Planet from "@public/assets/images/planet-2.png";
import illustrationColabSAGrip from "@public/assets/images/profiling-test/illustration-colab-SA-Grip.svg";
import illustrationGripDescription from "@public/assets/images/profiling-test/illustration-grip-description.svg";
import illustrationProfilingTest from "@public/assets/images/profiling-test/illustration-profiling-test.svg";

// components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import ModalLogin from "@components/shared/Modal/ModalLogin";
import CardContent from "./components/CardContent";
import CardPrice from "./components/CardPrice";
import ModalAssignChild from "./components/modal/ModalAssignChild";

// constant
import FaqContent from "./components/FaqContent";
import {
  dataCollaboration,
  reasonTakeTest,
  stepsTakeTest,
} from "./profilingConstant";

// hooks
import ModalAddChild from "./components/modal/ModalAddChild";
import useHandlerModalCHild from "./hooks/useHandlerModalChild";
import useOpenModalLogin from "./hooks/useOpenModalLogin";

// helper
import { roundUpDiscountLessThanOne } from "@helper/checkValue";

const ProfilingTest = ({
  data,
  dataChildren,
  isActiveMember,
  isTakeBasicTest,
  isOpenModalAddChild,
}) => {
  const { data: session, status } = useSession();

  // params
  const router = useRouter();

  const isUserNotLoggedIn = !session && status !== "authenticated";
  const { "is-modal-login": isModalLogin, callback: encodedCallbackUrl } =
    router?.query;
  const callbackUrl = decodeURIComponent(encodedCallbackUrl) ?? "";

  const handlerOpenModalLogin = useOpenModalLogin({
    isModalLogin,
    replaceUrl: router.replace,
  });

  const {
    isModalAssign,
    isModalAddChild,
    childSelected,
    handlerOpenModalAssignChild,
    handlerCloseModalAssignChild,
    handlerOpenModalAddChild,
    handlerCloseModalAddChild,
    handlerSelectChild,
  } = useHandlerModalCHild({ isOpenModalAddChild });

  function handleTakeBasicTest() {
    if (isUserNotLoggedIn) {
      handlerOpenModalLogin({
        callback: "profiling-test",
        selectedContent: "member-purchase-plan",
      });
      return;
    }

    if (isOpenModalAddChild) {
      handlerOpenModalAddChild();
      return;
    }
    handlerOpenModalAssignChild();
  }

  function handlerRedirectToCheckout(slug, itemId) {
    const urlToCheckout = `/profiling-test/checkout?type=${slug}&item_id=${itemId}`;

    if (isUserNotLoggedIn) {
      handlerOpenModalLogin({
        callback: urlToCheckout,
        selectedContent: "pricing-member-plan",
      });
      return;
    }

    window.scrollTo(0, 0);
    router.push(urlToCheckout);
  }

  return (
    <div className={classes.profilingTestLandingPage}>
      <section className={classes.headingContent}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid container gap={4} item md={6.3}>
              <h1>
                {`Know your children's personality Better with`}
                <span className={classes.primaryText}> Profiling Test</span>
              </h1>
              <p>
                Understand how your child learns and discover strategies to
                maximize their learning potential, abilities, and effectiveness,
                achieving true mastery in learning.
              </p>
            </Grid>
            <Grid item md={5.7}>
              <Image
                src={illustrationProfilingTest}
                alt="illustration profiling test"
              />
            </Grid>
          </Grid>
        </Container>
      </section>

      <section>
        <Container maxWidth="lg">
          <Grid container direction="column" gap={10}>
            <Grid container direction="row" className={classes.contentSection}>
              <Grid item md={5.5}>
                <Image
                  src={illustrationColabSAGrip}
                  alt="illustration colab SA Grip"
                />
              </Grid>
              <Grid item md={6.5} container gap={2}>
                <h2>SMART APES x GRIP LEARNING</h2>
                <h1>
                  Purchase and enhance your {`children's`} learning, all-in-one
                  place
                </h1>

                {dataCollaboration.map((item, key) => (
                  <Grid key={key} container gap={2}>
                    <Image
                      src={item.image}
                      alt="illustration explore icon"
                      width={70}
                      height={70}
                    />
                    <Grid item md={10} container alignItems="center">
                      <p>{item.title}</p>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              className={classes.contentSection}
              gap={2}
            >
              <Grid item md={6.4} container justifyContent="space-between">
                <h2>WHAT IS GRIP LEARNING</h2>
                <h1>
                  The GRIP Learning Profile™ helps children find their preferred
                  learning styles.
                </h1>
                <p>
                  Helps children find their preferred learning styles. Learning
                  styles are how children like to learn, process information,
                  and respond to different ways of teaching. The profile is
                  created through extensive research on the factors that affect
                  how we think and behave when learning.
                </p>
              </Grid>
              <Grid item md={5.4}>
                <Image
                  src={illustrationGripDescription}
                  alt="illustration-grip-description"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.containerThreeContent}>
        <Container maxWidth="lg">
          <Grid container direction="column" gap={10}>
            <Grid
              container
              direction="column"
              gap={4}
              className={classes.threeContentSection}
            >
              <div>
                <h2>{reasonTakeTest.heading}</h2>
                <h1>{reasonTakeTest.subHeading}</h1>
              </div>

              <Grid container justifyContent="space-around">
                {reasonTakeTest.data.map((item, key) => (
                  <Grid
                    item
                    md={3}
                    key={key}
                    container
                    direction="column"
                    gap={2}
                  >
                    <Image src={item.image} alt={item.title} />
                    <div>
                      {item.title.map((text, key) => (
                        <h4 key={key}>{text}</h4>
                      ))}
                    </div>

                    <p>{item.textContent}</p>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              gap={4}
              className={classes.threeContentSection}
            >
              <div>
                <h2>{stepsTakeTest.heading}</h2>
                <h1>{stepsTakeTest.subHeading}</h1>
              </div>

              <Grid container justifyContent="space-around">
                {stepsTakeTest.data.map((item, key) => (
                  <Grid item md={3.8} key={key} container direction="column">
                    <CardContent {...item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <div className={classes.backgroundPlanetRight}>
          <Image src={Planet} alt="planet illustration" />
        </div>

        <div className={classes.backgroundPlanetLeft}>
          <Image src={Planet} alt="planet illustration" />
        </div>
      </section>

      <section className={classes.pricingSection}>
        <Container>
          <Grid container direction="column" gap={4}>
            <Grid id="pricing-member-plan">
              <h2>Pricing</h2>
              <h1>Transparent and Simple Pricing</h1>
            </Grid>
            <Grid container justifyContent="center" gap={4}>
              {data.dataProduct.map((item, key) => (
                <CardPrice
                  key={key}
                  title={item?.title}
                  onClick={() =>
                    handlerRedirectToCheckout(item?.slug, item?.id)
                  }
                  realPrice={item?.main_variant?.base_price}
                  totalPrice={item?.main_variant?.price}
                  discountPercentage={roundUpDiscountLessThanOne(
                    item?.main_variant?.discount?.percent
                  )}
                  benefitData={item?.desc}
                />
              ))}
            </Grid>

            {!isActiveMember && (
              <div
                id="member-purchase-plan"
                className={classes.purchasePlanContainer}
              >
                <h4>Upgrade membership to get free Premium Test</h4>
                <p>
                  You will get more benefit by purchase and upgrade your
                  membership
                </p>
                <SecondaryButton
                  onClick={() => router.push("/membership")}
                  text="Purchase Plan"
                />
              </div>
            )}

            {isTakeBasicTest && (
              <div className={classes.basicPackageContainer}>
                <h4>Try our Basic Package and discover more!</h4>
                <p>
                  Get to know our package better and get our Free Basic test now
                </p>
                <SecondaryButton
                  onClick={handleTakeBasicTest}
                  text="Try Basic Test"
                />
              </div>
            )}
          </Grid>
        </Container>
      </section>

      <section className={classes.faqSection}>
        <Container>
          <Grid container gap={4} direction="column" justifyContent="center">
            <Grid>
              <h2>FAQ</h2>
              <h1>Need Help?</h1>
            </Grid>
            <FaqContent />
          </Grid>
        </Container>
      </section>

      <ModalLogin
        isOpen={isModalLogin === "true"}
        closeModal={handlerOpenModalLogin}
        path={callbackUrl}
      />

      <ModalAddChild
        isOpen={isModalAddChild}
        closeModal={handlerCloseModalAddChild}
      />

      <ModalAssignChild
        isOpen={isModalAssign}
        closeModal={handlerCloseModalAssignChild}
        dataChildren={dataChildren}
        selectedChild={childSelected}
        openModalAddChild={handlerOpenModalAddChild}
        handlerSelectChild={handlerSelectChild}
      />
    </div>
  );
};

export default ProfilingTest;
