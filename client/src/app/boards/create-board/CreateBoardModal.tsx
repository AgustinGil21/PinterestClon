'use client';

import Modal from '@/app/components/Basic/Modal';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { CreateBoardDataSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { CustomTextArea } from '@/app/components/Basic/CustomTextArea';
import { CustomInput } from '@/app/components/Basic/CustomInput';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

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
  };

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
              className={`bg-white shadow-uniform flex flex-col p-4 gap-4 rounded-lg justify-center items-center sm:min-w-[300px] min-h-[400px]`}
            >
              <h2 className='text-md font-semibold text-center'>
                Crear tablero
              </h2>
              <section className='w-full flex flex-col sm:flex-row gap-3 h-auto'>
                {pinBody && (
                  <div className='w-full sm:w-1/2 max-h-[300px] overflow-hidden'>
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
                  <label className='text-xs hover:cursor-pointer flex flex-col'>
                    <div className='flex'>
                      <span className='text-[0.6rem] font-medium mr-[2px]'>
                        Nombre
                      </span>
                      <span
                        className='text-[#e60023] font-bold text-[0.6rem]'
                        title='Obligatorio'
                      >
                        *
                      </span>
                    </div>
                    <CustomInput
                      type='text'
                      placeholder='Nombre del tablero'
                      infoName='name'
                      register={register}
                      errors={errors.name}
                      className='p-2 border-solid border-[1.5px] border-[#ebebeb] rounded-lg hover:border-[#cdcdcd] transition-colors text-[0.6rem] w-full outline-outline-search'
                      handleChange={handleChange}
                      watch={watch}
                    />
                  </label>
                  <label className='text-xs hover:cursor-pointer'>
                    <span className='text-[0.6rem] font-medium'>
                      Descripción
                    </span>
                    <CustomTextArea
                      className='resize-none w-full border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-[0.6rem] sm:min-h-[150px]'
                      infoName='description'
                      placeholder='Descripción del tablero'
                      maxLength={500}
                      register={register}
                      errors={errors.description}
                      watch={watch}
                      handleChange={handleChange}
                    />
                  </label>
                </form>
              </section>
              <footer className='border-solid border-t border-[#cdcdcd] w-full p-2 flex items-center justify-between'>
                <button
                  className='p-2 bg-[#e9e9e9] rounded-2xl text-black font-bold text-[0.7rem] hover:bg-gray-300 transition-colors min-w-[67px]'
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className='p-2 bg-[#e60023] rounded-2xl text-white font-bold text-[0.7rem] hover:bg-[#b60000] transition-colors min-w-[67px]'
                  type='submit'
                  form='createBoardForm'
                >
                  Crear
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
