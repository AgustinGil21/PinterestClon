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
    <>
      <div className='toast-notification fixed left-[50%] bottom-[2.5%] translate-x-[-50%] bg-[#111111] text-white rounded-3xl py-3 px-4 max-w-[450px] min-w-[200px] z-50 overflow-hidden font-semibold md:block hidden text-lg'>
        <span>{notification}</span>
      </div>
      <div className='toast-notification-mobile left-[50%] top-22 translate-x-[-50%] fixed md:hidden z-50 font-semibold py-3 px-4 text-white rounded-3xl max-w-[300px] flex items-center bg-[#111111] min-w-[150px] justify-center overflow-hidden'>
        <span>{notification}</span>
      </div>
    </>
  );
};

export default ToastNotification;
