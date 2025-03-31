import { IToastNotificationProps } from '../../global-interfaces/global-interfaces';
import { StateCreator } from 'zustand';

export interface INotificationsStore {
  toastNotificationContent?: IToastNotificationProps;
  setToastNotification: (value: IToastNotificationProps) => void;
}

export const createNotificationsStore: StateCreator<INotificationsStore> = (
  set,
  get
) => ({
  toastNotificationContent: undefined,

  setToastNotification: (value: IToastNotificationProps) => {
    set({ toastNotificationContent: value });

    setTimeout(() => {
      set({ toastNotificationContent: undefined });
    }, 2250);
  },
});
