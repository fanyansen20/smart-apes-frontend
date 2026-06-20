import React from "react";

// Mui material
import { Box, Modal, Stack } from "@mui/material";

// icons
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// style
import classes from "./_ModalAssignChiild.module.scss";

// helper
import handleRedirectParent from "@helper/handleRedirectParent";
import takeTestRedirect from "@helper/redirectUrl/takeTestRedirect";

// components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import Image from "next/image";

/**
 *
 * @typedef {{
 * name : string
 * provider_name : string
 * url : string
 * status : string
 * }} PendingBasicDataType
 *
 * @param {{
 * dataChildren: []
 * isOpen: boolean
 * selectedChild: {
 * childId : string
 * pendingBasicData : PendingBasicDataType
 * pendingBasicData :
 * }
 * handlerSelectChild : () => ()
 * openModalAddChild : () => ()
 * closeModal : () => ()
 * }} props
 * @returns
 */

const ModalAssignChild = ({
  dataChildren = [],
  selectedChild = "",
  handlerSelectChild,
  openModalAddChild,
  closeModal,
  isOpen,
}) => {
  const disabledButton = !selectedChild?.pendingBasicData;

  /**
   * @param {string} childId
   * @param {boolean} isPendingBasic
   */
  const childrenCardStyle = (childId, isPendingBasic) => {
    if (!isPendingBasic) return classes.disabledCardChild;

    if (childId === selectedChild.childId) return classes.activeCardChild;

    return classes.cardChild;
  };

  /**
   * @param {string} url
   */

  const handlerRedirectToTest = (url) => {
    takeTestRedirect(url);
    handleRedirectParent({ notRedirect: true });
  };

  return (
    <Modal onClose={closeModal} open={isOpen}>
      <Box className={classes.containerModalAssignChild}>
        <Stack direction="column" alignItems="flex-start" gap={1}>
          <>
            <h2>Assign the Children ({dataChildren.length ?? 0}/5)</h2>
            <p>Please select one of your children</p>
          </>

          <div className={classes.childrenSection}>
            {dataChildren.map(
              ({
                profileImage,
                childrenName,
                educationType,
                childId,
                pending_basic_profiling_test,
              }) => (
                <div
                  key={childId}
                  className={childrenCardStyle(
                    childId,
                    Boolean(pending_basic_profiling_test)
                  )}
                  onClick={() =>
                    handlerSelectChild(childId, pending_basic_profiling_test)
                  }
                >
                  <div className={classes.profileChild}>
                    <Image
                      src={profileImage}
                      layout="fill"
                      alt="image"
                      objectFit="contain"
                    />
                  </div>
                  <Stack direction="column" gap={0.2}>
                    <h5>{childrenName}</h5>
                    <p>{educationType}</p>
                  </Stack>
                </div>
              )
            )}
          </div>

          {dataChildren.length < 5 && (
            <>
              <div className={classes.dividerSection}>
                <div className={classes.divider} />
                <p>Or</p>
                <div className={classes.divider} />
              </div>

              <SecondaryButton
                fullWidth
                startIcon={
                  <PersonAddAltIcon sx={{ fontSize: "1.2rem !important" }} />
                }
                onClick={openModalAddChild}
              >
                Add New Children
              </SecondaryButton>
            </>
          )}

          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={1}
            sx={{ width: "100%" }}
          >
            <TextButton onClick={closeModal}>Cancel</TextButton>
            <PrimaryButton
              onClick={() =>
                handlerRedirectToTest(selectedChild?.pendingBasicData?.url)
              }
              disabled={disabledButton}
            >
              Take Test
            </PrimaryButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAssignChild;
