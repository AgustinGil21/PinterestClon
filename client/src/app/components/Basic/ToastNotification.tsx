type Type = 'message' | 'pin' | 'board' | 'comment' | 'profile' | 'user';

type Action =
  | 'create'
  | 'update'
  | 'delete'
  | 'follow'
  | 'like'
  | 'save'
  | 'remove';

type Lang = 'es' | 'en' | 'pt';

interface Props {
  content?: `?${Type}:${Action}[${Lang}]`;
}

const ToastNotification = ({ content }: Props) => {
  let notification: string;

  notification = '';

  return (
    <div className='toast-notification fixed left-[50%] bottom-[2.5%] translate-x-[-50%] bg-[#111111] text-white rounded-[8px] p-[0.5rem_1rem] max-w-[450px] min-w-[200px] z-50 overflow-hidden font-semibold'>
      <span>{notification || 'Toast notification!'}</span>
    </div>
  );
};

export default ToastNotification;
