import { StateCreator } from 'zustand';
import {
  activeScroll,
  bloqScroll,
} from '@/app/interfaces/helpers/BlockOrActiveScroll';
import { createRef } from 'react';
import { TReportType } from '@/app/global-interfaces/translation-interface';

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
  reportType: TReportType;
  openReportModal: (type?: TReportType) => void;
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
  isOpenReportModal: false,
  isOpenFiltersModal: JSON.parse(
    localStorage.getItem('isOpenFilterModal') || 'false'
  ),
  isPinMoreOptionModalOpen: false,
  pinMoreOptionsBtnRef: createRef(),
  pinMoreOptionsBody: '',
  reportType: 'pin',
  activePin: '',

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

  openReportModal: (type?: TReportType) => {
    set((state) => ({
      isOpenReportModal: !state.isOpenReportModal,
      reportType: type,
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
});
