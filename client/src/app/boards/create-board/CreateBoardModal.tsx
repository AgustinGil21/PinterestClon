import Modal from '@/app/components/Basic/Modal';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateBoardDataSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { CustomTextArea } from '@/app/components/Basic/CustomTextArea';
import { CustomInput } from '@/app/components/Basic/CustomInput';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { Required } from '@/app/interfaces/components/Basic/Required';
import { useLockScroll } from '@/app/hooks/useLockScroll';

interface IntefaceCreateBoardModal {
  setOpenModalCreate?: (state: boolean) => void;
  pinId?: string;
  pinBody?: string;
}

interface IHandleChange {
  key: string;
  value: string;
}

interface IOnSubmit {
  name: string;
  description?: string;
}

const CreateBoardModal = ({
  setOpenModalCreate,
  pinBody,
  pinId,
}: IntefaceCreateBoardModal) => {
  const {
    createBoard,
    dataOpenBoardModal,
    closeDynamicModal,
    setDynamicModal,
    createBoardModalOpen,
    isCreateBoardModalOpen,
    setToastNotification,
    t,
  } = useAppsStore();

  const { errors, register, handleSubmit, watch } = useFormHook({
    schema: CreateBoardDataSchema,
  });

  const onSubmit = (values: IOnSubmit) => {
    const dataToSubmit = {
      ...values,
      ...(pinId ? { pinId } : {}),
    };
    createBoard(dataToSubmit);
    createBoardModalOpen();
    window.location.reload();
    setToastNotification({
      status: 'success',
      action: 'create',
      type: 'board',
    });
  };

  useLockScroll();

  const handleChange = ({ key, value }: IHandleChange) => {};

  const handleCancel = () => {
    createBoardModalOpen();
  };

  return (
    <>
      {isCreateBoardModalOpen && (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-50 z-[70]' />
          <Modal
            props={{
              isModalOpen: isCreateBoardModalOpen,
              setModal: handleCancel,
              className: `fixed z-[71] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[550px]`,
            }}
          >
            <div
              className={`bg-white shadow-uniform flex flex-col p-4 gap-4 rounded-lg md:justify-center md:items-center sm:min-w-[300px] min-h-[400px] justify-between`}
            >
              <h2 className='text-md font-semibold text-center'>
                {t?.board.create.title || 'Crear tablero'}
              </h2>
              <section className='w-full flex flex-col sm:flex-row gap-3 h-auto'>
                {pinBody && (
                  <div className='w-full sm:w-1/2 md:max-h-[300px] min-h-[300px] overflow-hidden md:block hidden'>
                    <img
                      alt='pin-img'
                      src={pinBody}
                      className='rounded-lg w-full h-full object-cover'
                    />
                  </div>
                )}

                <form
                  className='flex flex-col justify-start gap-3 w-full'
                  onSubmit={handleSubmit(onSubmit)}
                  id='createBoardForm'
                >
                  <label className='text-xs hover:cursor-pointer flex flex-col gap-1'>
                    <div className='flex'>
                      <span className='text-xs font-semibold mr-[2px]'>
                        {t?.board.create.name.label || 'Nombre'}
                      </span>
                      <Required />
                    </div>
                    <CustomInput
                      type='text'
                      placeholder={
                        t?.board.create.name.placeholder || 'Nombre del tablero'
                      }
                      infoName='name'
                      register={register}
                      errors={errors.name}
                      className='p-2 border-solid border-[1.5px] border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-xs w-full outline-outline-search'
                      handleChange={handleChange}
                      watch={watch}
                    />
                  </label>
                  <label className='text-xs hover:cursor-pointer flex flex-col gap-1'>
                    <span className='text-xs font-semibold'>
                      {t?.board.create.description.label || 'Descripción'}
                    </span>
                    <CustomTextArea
                      className='resize-none w-full border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-xs min-h-[192px] md:min-h-[200px] h-full'
                      infoName='description'
                      placeholder={
                        t?.board.create.description.placeholder ||
                        'Descripción del tablero'
                      }
                      maxLength={500}
                      register={register}
                      errors={errors.description}
                      watch={watch}
                      handleChange={handleChange}
                    />
                  </label>
                </form>
              </section>
              <footer className=' w-full p-2 flex items-center justify-between'>
                <button
                  className='p-2 bg-[#e9e9e9] rounded-2xl text-black font-bold text-[0.7rem] hover:bg-gray-300 transition-colors min-w-[67px]'
                  onClick={handleCancel}
                >
                  {t?.board.create.buttons.cancel || 'Cancelar'}
                </button>
                <button
                  className='p-2 bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem] hover:bg-[#b60000] transition-colors min-w-[67px]'
                  type='submit'
                  form='createBoardForm'
                >
                  {t?.board.create.buttons.create || 'Crear'}
                </button>
              </footer>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default CreateBoardModal;
