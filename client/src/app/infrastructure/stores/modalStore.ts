import { StateCreator } from 'zustand';
import {
  activeScroll,
  bloqScroll,
} from '@/app/interfaces/helpers/BlockOrActiveScroll';
import { createRef } from 'react';
import { TReportType } from '@/app/global-interfaces/translation-interface';
import {
  IMobileControllerButtonsTranslate,
  IPosition,
} from '@/app/global-interfaces/global-interfaces';
import { MobileSavePinButtonsController } from '@/app/home-page-components/MobileSavePinButtonsController';

interface PinSaved {
  pinID: string;
  profile?: boolean;
  board?: {
    id: string;
    name: string;
  };
}

export interface ModalStateInterface {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isGenderModalOpen: boolean;
  isNationalityModalOpen: boolean;
  isAvatarModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeBothModal: () => void;
  openGenderModal: () => void;
  closeGenderModal: () => void;
  reverseNationalityForGender: () => void;
  openAvatarModal: () => void;
  closeAvatarModal: () => void;
  isDeleteUserAccountModalOpen: boolean;
  openDeleteUserAccountModal: () => void;
  // closeDeleteUserAccountModal: () => void;
  isChangePasswordModalOpen: boolean;
  openChangePasswordModalOpen: () => void;
  closeChangePasswordModal: () => void;
  isDeletePinModal: boolean;
  openDeletePinModal: () => void;
  closeDeletePinModal: () => void;
  openMenuAsideSettingsResponsive: () => void;
  isOpenMenuAsideSettingsResponsive: boolean;
  isShareAccountOpen: boolean;

  activePin: string;

  dynamicModalIsOpen: boolean;
  btnRef: React.RefObject<HTMLButtonElement>;
  setDynamicModal: (
    ref: React.RefObject<HTMLButtonElement>,
    pinID: string
  ) => void;
  closeDynamicModal: () => void;

  sharePinData?: string;
  dynamicSharePinModalIsOpen: boolean;
  sharePinBtnRef: React.RefObject<HTMLButtonElement>;
  setDynamicSharePinModalIsOpen: (
    ref: React.RefObject<HTMLButtonElement>,
    data: string
  ) => void;
  closeDynamicSharePinModal: () => void;
  isDownloadAccountOpen: boolean;
  openDownloadAccountModal: () => void;
  isThreePointsAccountOpen: boolean;
  openThreePointsAcountModal: () => void;
  openFollowersModal: () => void;
  isFollowerModalOpen: boolean;
  isFollowingsModalOpen: boolean;
  openFollowingsModal: () => void;
  isCreateBoardModalOpen: boolean;
  createBoardModalOpen: () => void;
  isOpenReportModal: boolean;
  reportModalPinBody?: string;
  reportType: TReportType;
  openReportModal: (body?: string) => void;
  closeReportModal: () => void;
  openFiltersModal: () => void;
  isOpenFiltersModal: boolean;

  isPinMoreOptionModalOpen: boolean;
  setPinMoreOptionsModal: (
    ref: React.RefObject<HTMLButtonElement>,
    body: string,
    pinID: string
  ) => void;
  closePinMoreOptionsModal: () => void;
  pinMoreOptionsBtnRef: React.RefObject<HTMLButtonElement>;
  pinMoreOptionsBody: string;

  shareBoardID: string;
  shareBoardBtnRef: React.RefObject<HTMLButtonElement>;
  shareBoardModalIsOpen: boolean;
  setShareBoardModal: (
    ref: React.RefObject<HTMLButtonElement>,
    id: string
  ) => void;
  closeShareBoardModal: () => void;

  boardMoreOptionsBoardID: string;
  boardMoreOptionsUserID: string;
  boardMoreOptionsBtnRef: React.RefObject<HTMLButtonElement>;
  boardMoreOptionsModalIsOpen: boolean;
  boardItsYours: boolean;
  setBoardMoreOptionsModal: (
    ref: React.RefObject<HTMLButtonElement>,
    userID: string,
    boardID: string,
    its_yours: boolean
  ) => void;
  closeBoardMoreOptionsModal: () => void;
  isOpenMenuAsideInfoClonResponsive: boolean;
  deleteBoardModalIsOpen: boolean;
  setDeleteBoardModal: () => void;

  openMenuAsideInfoClon: () => void;

  pinSaved?: PinSaved;
  setPinSaved: (data: PinSaved) => void;

  adultContentModalIsOpen: boolean;
  adultContentPinID?: string;
  setAdultContentModal: (pinID?: string) => void;
  isModalSearchHeaderOpen: boolean;
  boardCoversModalIsOpen: boolean;
  modalSearchHeaderOpen: () => void;
  setBoardCoversModalIsOpen: () => void;

  mobileSavePinControllerIsActive: boolean;
  mobileControllerPinID: string;
  mobileSavePinControllerPosition: IPosition;
  mobilePinControllerRotation: number;
  mobilePinControllerButtonsTranslate: IMobileControllerButtonsTranslate;
  mobileControllerBtnCenterIsHovered: boolean;
  mobileControllerUserIsHolding: boolean;
  setMobileSavePinController: (
    position: IPosition,
    rotation: number,
    pinID: string
  ) => void;
  closeMobilePinController: () => void;
  setMobilePinControllerRotation: (rotation: number) => void;
  setPinControllerButtonsTranslate: (
    translate: IMobileControllerButtonsTranslate
  ) => void;
  setMobileControllerBtnCenterIsHovered: (isHovered: boolean) => void;
  setMobileControllerUserIsHolding: (isHolding: boolean) => void;

  mobileControllerSharePinModal: boolean;
  setMobileControllerSharePinModal: () => void;

  mobileControllerBoardsListModalIsOpen: boolean;
  mobileControllerBoardsListModalPinID: string;
  setMobileControllerBoardsListModalIsOpen: (pinID?: string) => void;

  masonryMobileStopScrolling: boolean;
  setMasonryMobileStopScrolling: (isScrolling: boolean) => void;
}

export const createModalStore: StateCreator<ModalStateInterface> = (
  set,
  get
) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isGenderModalOpen: false,
  isNationalityModalOpen: false,
  isAvatarModalOpen: false,
  isDeleteUserAccountModalOpen: false,
  isChangePasswordModalOpen: false,
  isDeletePinModal: false,
  isShareAccountOpen: false,
  isDownloadAccountOpen: false,
  isThreePointsAccountOpen: false,
  isFollowerModalOpen: false,
  isFollowingsModalOpen: false,
  dynamicModalIsOpen: false,
  btnRef: createRef(),
  sharePinBtnRef: createRef(),
  dynamicSharePinModalIsOpen: false,
  isCreateBoardModalOpen: false,
  sharePinData: '',
  isOpenMenuAsideSettingsResponsive: false,
  isOpenMenuAsideInfoClonResponsive: false,
  isOpenReportModal: false,
  isOpenFiltersModal:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('isOpenFilterModal') ?? 'false')
      : false,

  isPinMoreOptionModalOpen: false,
  pinMoreOptionsBtnRef: createRef(),
  pinMoreOptionsBody: '',
  reportType: 'pin',
  activePin: '',

  shareBoardID: '',
  shareBoardBtnRef: createRef(),
  shareBoardModalIsOpen: false,

  boardMoreOptionsUserID: '',
  boardMoreOptionsBoardID: '',
  boardMoreOptionsBtnRef: createRef(),
  boardMoreOptionsModalIsOpen: false,
  boardItsYours: false,

  deleteBoardModalIsOpen: false,

  adultContentModalIsOpen: false,
  isModalSearchHeaderOpen: false,

  boardCoversModalIsOpen: false,

  mobileSavePinControllerIsActive: false,
  mobileControllerPinID: '',
  mobileSavePinControllerPosition: {
    x: 0,
    y: 0,
  },
  mobilePinControllerRotation: 0,
  mobilePinControllerButtonsTranslate: {
    like: {
      x: -7,
      y: 0,
    },
    save: {
      x: -3,
      y: -7,
    },
    share: {
      x: 3,
      y: -7,
    },
    shareWsp: {
      x: 7,
      y: 0,
    },
  },
  mobileControllerBtnCenterIsHovered: false,
  mobileControllerUserIsHolding: false,

  mobileControllerSharePinModal: false,
  mobileControllerBoardsListModalIsOpen: false,
  mobileControllerBoardsListModalPinID: '',

  masonryMobileStopScrolling: true,

  createBoardModalOpen: () => {
    set((state) => ({
      isCreateBoardModalOpen: !state.isCreateBoardModalOpen,
    }));
  },

  setDynamicModal: (ref: React.RefObject<HTMLButtonElement>, pinID: string) =>
    set((state) => ({
      btnRef: ref,
      dynamicModalIsOpen: !state.dynamicModalIsOpen,
      activePin: !state.dynamicModalIsOpen ? pinID : '',
    })),

  closeDynamicModal: () =>
    set({
      dynamicModalIsOpen: false,
      activePin: '',
    }),

  setDynamicSharePinModalIsOpen: (
    ref: React.RefObject<HTMLButtonElement>,
    data: string
  ) =>
    set((state) => ({
      sharePinBtnRef: ref,
      dynamicSharePinModalIsOpen: !state.dynamicSharePinModalIsOpen,
      sharePinData: data,
      activePin: !state.dynamicSharePinModalIsOpen ? data : '',
    })),

  closeDynamicSharePinModal: () =>
    set({
      dynamicSharePinModalIsOpen: false,
      activePin: '',
    }),

  openLoginModal: () =>
    set({
      isLoginModalOpen: true,
      isRegisterModalOpen: false,
    }),
  closeLoginModal: () =>
    set({
      isLoginModalOpen: false,
    }),
  openRegisterModal: () =>
    set({
      isLoginModalOpen: false,
      isRegisterModalOpen: true,
    }),
  closeBothModal: () =>
    set({
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
    }),
  openGenderModal: () => {
    set({
      isRegisterModalOpen: false,
      isGenderModalOpen: true,
    });
  },
  closeGenderModal: () =>
    set({
      isGenderModalOpen: false,
      isNationalityModalOpen: true,
    }),
  reverseNationalityForGender: () => {
    set({
      isNationalityModalOpen: false,
      isGenderModalOpen: true,
    });
  },
  openAvatarModal: () => {
    set({
      isAvatarModalOpen: true,
      isNationalityModalOpen: false,
    });
  },
  closeAvatarModal: () => {
    set({
      isAvatarModalOpen: false,
    });
  },
  openDeleteUserAccountModal: () => {
    set((state) => ({
      isDeleteUserAccountModalOpen: !state.isDeleteUserAccountModalOpen,
    }));
  },
  openChangePasswordModalOpen: () => {
    set({
      isChangePasswordModalOpen: true,
    });
  },
  closeChangePasswordModal: () => {
    set({
      isChangePasswordModalOpen: false,
    });
  },
  openDeletePinModal: () => {
    set({
      isDeletePinModal: true,
    });
  },
  closeDeletePinModal: () => {
    set({
      isDeletePinModal: false,
    });
  },

  openDownloadAccountModal: () => {
    set((state) => ({
      isDownloadAccountOpen: !state.isDownloadAccountOpen,
      isThreePointsAccountOpen: false,
    }));
  },

  openThreePointsAcountModal: () => {
    set((state) => ({
      isThreePointsAccountOpen: !state.isThreePointsAccountOpen,
      isDownloadAccountOpen: false,
    }));
  },
  openFollowersModal: () => {
    if (get().isFollowerModalOpen) bloqScroll();
    if (!get().isFollowerModalOpen) activeScroll();
    set((state) => ({
      isFollowerModalOpen: !state.isFollowerModalOpen,
    }));
  },
  openFollowingsModal: () => {
    if (get().isFollowingsModalOpen) bloqScroll();
    if (!get().isFollowingsModalOpen) activeScroll();
    set((state) => ({
      isFollowingsModalOpen: !state.isFollowingsModalOpen,
    }));
  },

  openMenuAsideSettingsResponsive: () => {
    set((state) => ({
      isOpenMenuAsideSettingsResponsive:
        !state.isOpenMenuAsideSettingsResponsive,
    }));
  },

  openReportModal: (body?: string) => {
    set((state) => ({
      isOpenReportModal: !state.isOpenReportModal,
      reportModalPinBody: body,
    }));
  },
  closeReportModal: () => {
    set({
      isOpenReportModal: false,
    });
  },
  openFiltersModal: () => {
    set((state) => ({
      isOpenFiltersModal: !state.isOpenFiltersModal,
    }));
    localStorage.setItem(
      'isOpenFilterModal',
      JSON.stringify(get().isOpenFiltersModal)
    );
  },
  setPinMoreOptionsModal: (
    ref: React.RefObject<HTMLButtonElement>,
    body: string,
    pinID: string
  ) => {
    set((state) => ({
      isPinMoreOptionModalOpen: !state.isPinMoreOptionModalOpen,
      pinMoreOptionsBtnRef: ref,
      pinMoreOptionsBody: body,
      activePin: !state.isPinMoreOptionModalOpen ? pinID : '',
    }));
  },
  closePinMoreOptionsModal: () => {
    set({
      isPinMoreOptionModalOpen: false,
      activePin: '',
    });
  },

  setShareBoardModal: (ref: React.RefObject<HTMLButtonElement>, id: string) => {
    set((state) => ({
      shareBoardID: id,
      shareBoardModalIsOpen: !state.shareBoardModalIsOpen,
      shareBoardBtnRef: ref,
    }));
  },
  closeShareBoardModal: () => {
    set({
      shareBoardModalIsOpen: false,
    });
  },

  setBoardMoreOptionsModal: (
    ref: React.RefObject<HTMLButtonElement>,
    userID: string,
    boardID: string,
    its_yours: boolean
  ) => {
    set((state) => ({
      boardMoreOptionsBtnRef: ref,
      boardMoreOptionsUserID: userID,
      boardMoreOptionsBoardID: boardID,
      boardMoreOptionsModalIsOpen: !state.boardMoreOptionsModalIsOpen,
      boardItsYours: its_yours,
    }));
  },
  closeBoardMoreOptionsModal: () => {
    set({
      boardMoreOptionsModalIsOpen: false,
    });
  },

  setDeleteBoardModal: () => {
    set((state) => ({
      deleteBoardModalIsOpen: !state.deleteBoardModalIsOpen,
    }));
  },

  openMenuAsideInfoClon: () => {
    set((state) => ({
      isOpenMenuAsideInfoClonResponsive:
        !state.isOpenMenuAsideInfoClonResponsive,
    }));
  },

  setPinSaved: (data: PinSaved) => {
    set({
      pinSaved: data,
    });
  },

  setAdultContentModal: (pinID?: string) => {
    set((state) => ({
      adultContentModalIsOpen: !state.adultContentModalIsOpen,
      adultContentPinID: pinID,
    }));
  },
  modalSearchHeaderOpen: () => {
    set((state) => ({
      isModalSearchHeaderOpen: !state.isModalSearchHeaderOpen,
    }));
  },

  setBoardCoversModalIsOpen: () => {
    set((state) => ({
      boardCoversModalIsOpen: !state.boardCoversModalIsOpen,
    }));
  },

  setMobileSavePinController: (
    position: IPosition,
    rotation: number,
    pinID: string
  ) => {
    set((state) => ({
      mobileSavePinControllerIsActive: !state.mobileSavePinControllerIsActive,
      mobileSavePinControllerPosition: position,
      mobilePinControllerRotation: rotation,
      mobileControllerPinID: pinID,
    }));
  },

  closeMobilePinController: () => {
    set({
      mobileSavePinControllerIsActive: false,
      mobileControllerPinID: '',
      mobileSavePinControllerPosition: {
        x: 0,
        y: 0,
      },
      mobilePinControllerRotation: 0,
    });
  },

  setMobilePinControllerRotation: (rotation: number) => {
    set({
      mobilePinControllerRotation: rotation,
    });
  },

  setPinControllerButtonsTranslate: (
    translate: IMobileControllerButtonsTranslate
  ) => {
    set({
      mobilePinControllerButtonsTranslate: translate,
    });
  },

  setMobileControllerBtnCenterIsHovered: (isHovered: boolean) => {
    set({
      mobileControllerBtnCenterIsHovered: isHovered,
    });
  },

  setMobileControllerUserIsHolding: (isHolding: boolean) => {
    set({
      mobileControllerUserIsHolding: isHolding,
    });
  },

  setMobileControllerSharePinModal: () => {
    set((state) => ({
      mobileControllerSharePinModal: !state.mobileControllerSharePinModal,
    }));
  },

  setMobileControllerBoardsListModalIsOpen: (pinID?: string) => {
    set((state) => ({
      mobileControllerBoardsListModalIsOpen:
        !state.mobileControllerBoardsListModalIsOpen,
      mobileControllerBoardsListModalPinID: pinID,
    }));
  },

  setMasonryMobileStopScrolling: (isScrolling: boolean) => {
    set({
      masonryMobileStopScrolling: isScrolling,
    });
  },
});
