// React
import View from "view";

const VerifyEmail = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="verify-email" />;
};

export default VerifyEmail;

export async function getServerSideProps({ query }) {
  const { token = null } = query;

  return {
    props: {
      token,
    },
  };
}
