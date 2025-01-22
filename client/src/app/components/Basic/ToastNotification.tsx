import {
  IToastNotification,
  IToastNotificationProps,
  TAction,
  TStatus,
  TType,
} from '@/app/global-interfaces/global-interfaces';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { getToastNotification } from '@/app/libs/getToastNotification';

interface Props {
  content: IToastNotificationProps;
}

const ToastNotification = ({ content }: Props) => {
  const { userLang } = useAppsStore();

  const toastContent: IToastNotification = {
    ...content,
    lang: userLang,
  };

  const notification = getToastNotification(toastContent);

  return (
    <div className='toast-notification fixed left-[50%] bottom-[2.5%] translate-x-[-50%] bg-[#111111] text-white rounded-[8px] p-[0.5rem_1rem] max-w-[450px] min-w-[200px] z-50 overflow-hidden font-semibold'>
      <span>{notification}</span>
    </div>
  );
};

export default ToastNotification;
