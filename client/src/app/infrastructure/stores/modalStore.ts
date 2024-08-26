import { StateCreator } from 'zustand';

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
  closeDeleteUserAccountModal: () => void;
}

export const createModalStore: StateCreator<ModalStateInterface> = (set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isGenderModalOpen: false,
  isNationalityModalOpen: false,
  isAvatarModalOpen: false,
  isDeleteUserAccountModalOpen: false,
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
    set({
      isDeleteUserAccountModalOpen: true,
    });
  },
  closeDeleteUserAccountModal: () => {
    set({
      isDeleteUserAccountModalOpen: false,
    });
  },
});
