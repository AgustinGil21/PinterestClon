import { TToastNotification } from '@/app/global-interfaces/global-interfaces';
import { StateCreator } from 'zustand';

export interface INotificationsStore {
  toastNotificationContent: TToastNotification;
  setToastNotification: (value: TToastNotification) => void;
}

export const createNotificationsStore: StateCreator<INotificationsStore> = (
  set,
  get
) => ({
  toastNotificationContent: '',

  setToastNotification: (value: TToastNotification) =>
    set({ toastNotificationContent: value }),
});
