import CreateBoardModal from '../boards/create-board/CreateBoardModal';
import ToastNotification from '../components/Basic/ToastNotification';

export default function Test() {
  // return <CreateBoardModal />;
  return (
    <div className='w-full h-full overflow-hidden'>
      <ToastNotification content='No se pudo crear el pin. Por favor vuelva a intentarlo' />
    </div>
  );
}
