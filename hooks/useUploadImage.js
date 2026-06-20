import { useState } from "react";

// hooks
import useNotification from "./useNotification";

/**
 *
 * @param {{
 * maxFileSize : number
 * }} props
 * @returns
 */

const useUploadImage = ({ maxFileSize = 10485760 } = {}) => {
  const [_msg, sendNotification] = useNotification();

  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();

  const maxSizeInMb = Math.round(maxFileSize / 1048576);

  const handleUploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const sizeFile = e.target.files[0].size;

    if (sizeFile > maxFileSize) {
      sendNotification({
        msg: [`File size exceeds limit ${maxSizeInMb} mb`],
        variant: "error",
      });
      return false;
    }

    setProfileImage(selectedFile);
    const tempImgUrl = URL.createObjectURL(selectedFile);
    setProfileImagePreview(tempImgUrl);
  };

  const handleRemovePreview = () => {
    setProfileImagePreview("");
    setProfileImage();
  };

  return {
    profileImage,
    profileImagePreview,
    handleUploadImage,
    handleRemovePreview,
  };
};

export default useUploadImage;
