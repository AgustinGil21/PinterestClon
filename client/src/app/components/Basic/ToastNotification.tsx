interface Props {
  content?: string;
}

const ToastNotification = ({ content }: Props) => {
  return (
    <div className='toast-notification fixed left-[50%] bottom-[2.5%] translate-x-[-50%] bg-[#111111] text-white rounded-[8px] p-[0.5rem_1rem] max-w-[450px] min-w-[200px] z-30 overflow-hidden font-semibold'>
      <span>{content || 'Toast notification!'}</span>
    </div>
  );
};

export default ToastNotification;
