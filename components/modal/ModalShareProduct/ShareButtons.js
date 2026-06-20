// Next
import useNotification from "@hooks/useNotification";
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Image
import CopyLinkIcon from "@public/assets/icons/copy-link.svg";

// Next-share
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

/**
 * @param {{
 * linkShare: string
 * }} props
 * @returns {JSX.Element}
 */
const ShareButtons = ({ linkShare }) => {
  const [_msg, sendNotification] = useNotification();
  const linkCopy = `${process.env.NEXT_PUBLIC_MARKET_PLACE_URL}${linkShare}`;

  const handlerCopyLink = () => {
    navigator.clipboard.writeText(linkCopy);
    sendNotification({ msg: ["link copy to clipboard"] });
  };

  // social media components
  const dataShare = [
    {
      title: "whatsApp",
      component: (props) => (
        <WhatsappShareButton {...props}>
          <Grid>
            <WhatsappIcon size="50px" round />
            <Typography className="title-social-media">WhatsApp</Typography>
          </Grid>
        </WhatsappShareButton>
      ),
    },
    {
      title: "line",
      component: (props) => (
        <LineShareButton {...props}>
          <Grid>
            <LineIcon size="50px" round />
            <Typography className="title-social-media">Line</Typography>
          </Grid>
        </LineShareButton>
      ),
    },
    {
      title: "facebook",
      component: (props) => (
        <FacebookShareButton {...props}>
          <Grid>
            <FacebookIcon size="50px" round />
            <Typography className="title-social-media">Facebook</Typography>
          </Grid>
        </FacebookShareButton>
      ),
    },
    {
      title: "telegram",
      component: (props) => (
        <TelegramShareButton {...props}>
          <Grid>
            <TelegramIcon size="50px" round />
            <Typography className="title-social-media">Telegram</Typography>
          </Grid>
        </TelegramShareButton>
      ),
    },
    {
      title: "twitter",
      component: (props) => (
        <TwitterShareButton {...props}>
          <Grid>
            <TwitterIcon size="50px" round />
            <Typography className="title-social-media">Twitter</Typography>
          </Grid>
        </TwitterShareButton>
      ),
    },
    {
      title: "copy link",
      component: (props) => (
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            onClick={handlerCopyLink}
            {...props}
            className="image-social-media"
          >
            <Image src={CopyLinkIcon} alt="icon copy link" />
          </Grid>
          <Typography className="title-social-media">Copy Link</Typography>
        </Grid>
      ),
    },
  ];

  return dataShare.map((data, key) => (
    <div key={key}>
      {data.component({
        url: linkCopy,
        blankTarget: true,
      })}
    </div>
  ));
};

export default ShareButtons;
