import { StateCreator } from 'zustand';

export interface INotificationsStore {
  toastNotificationContent: string;
  setToastNotification: (value: string) => void;
}

export const createNotificationsStore: StateCreator<INotificationsStore> = (
  set,
  get
) => ({
  toastNotificationContent: '',

  setToastNotification: (value: string) =>
    set({ toastNotificationContent: value }),
});
