// Next
import Image from "next/image";
import { useRouter } from "next/router";

// Components
import ShareButtons from "@components/modal/ModalShareProduct/ShareButtons";
import DrawerPanel from "../DrawerPanel";

// Styles
import classes from "./DrawerShareProduct.module.scss";

const DrawerShareProduct = ({ open, onClose, product }) => {
  const { asPath } = useRouter();

  return (
    <DrawerPanel open={open} onClose={onClose} title="Share Product">
      <div className={classes.drawerShareProduct}>
        <section className={classes.product}>
          <Image
            src={product?.cover_image_url}
            width="70px"
            height="70px"
            alt="product"
          />
          <div>
            <h3>{product?.title}</h3>
            <h5>Smartapes.link</h5>
          </div>
        </section>
        <p className={classes.subHeading}>Share Product with</p>
        <section className={classes.shareButtons}>
          <ShareButtons linkShare={asPath} />
        </section>
      </div>
    </DrawerPanel>
  );
};

export default DrawerShareProduct;
