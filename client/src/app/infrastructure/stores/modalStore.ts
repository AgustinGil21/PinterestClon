import { StateCreator } from 'zustand';
import {
  activeScroll,
  bloqScroll,
} from '@/app/interfaces/helpers/BlockOrActiveScroll';
import { createRef } from 'react';

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

  dynamicModalIsOpen: boolean;
  btnRef: React.RefObject<HTMLButtonElement>;
  setDynamicModal: (ref: React.RefObject<HTMLButtonElement>) => void;
  closeDynamicModal: () => void;

  sharePinData?: string;
  dynamicSharePinModalIsOpen: boolean;
  sharePinBtnRef: React.RefObject<HTMLButtonElement>;
  setDynamicSharePinModalIsOpen: (
    ref: React.RefObject<HTMLButtonElement>,
    data?: string
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

  createBoardModalOpen: () => {
    set((state) => ({
      isCreateBoardModalOpen: !state.isCreateBoardModalOpen,
    }));
  },

  setDynamicModal: (ref: React.RefObject<HTMLButtonElement>) =>
    set((state) => ({
      btnRef: ref,
      dynamicModalIsOpen: true,
    })),

  closeDynamicModal: () =>
    set({
      dynamicModalIsOpen: false,
    }),

  setDynamicSharePinModalIsOpen: (
    ref: React.RefObject<HTMLButtonElement>,
    data?: string
  ) =>
    set((state) => ({
      sharePinBtnRef: ref,
      dynamicSharePinModalIsOpen: !state.dynamicSharePinModalIsOpen,
      sharePinData: data,
    })),

  closeDynamicSharePinModal: () =>
    set({
      dynamicSharePinModalIsOpen: false,
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
});
