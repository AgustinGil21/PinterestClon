import { StateCreator } from 'zustand';
import {
  activeScroll,
  bloqScroll,
} from '@/app/interfaces/helpers/BlockOrActiveScroll';

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
  isShareAccountOpen: boolean;
  openShareAccountModal: () => void;
  isDownloadAccountOpen: boolean;
  openDownloadAccountModal: () => void;
  isThreePointsAccountOpen: boolean;
  openThreePointsAcountModal: () => void;
  openFollowersModal: () => void;
  isFollowerModalOpen: boolean;
  isFollowingsModalOpen: boolean;
  openFollowingsModal: () => void;
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
  openShareAccountModal: () =>
    set((state) => ({
      isShareAccountOpen: !state.isShareAccountOpen,
    })),

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
});
