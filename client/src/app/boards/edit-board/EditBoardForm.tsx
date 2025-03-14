import { useEffect } from 'react';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { EditBoardDescriptionInput } from './EditBoardDescriptionInput';
import { EditBoardNameInput } from './EditBoardNameInput';
import { EditBoardFormSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import {
  IEditBoard,
  IEditBoardForm,
} from '@/app/domain/types/boards-interface';

export const EditBoardForm = () => {
  const { errors, register, handleSubmit, watch, setValue } = useFormHook({
    schema: EditBoardFormSchema,
  });
  const {
    setToastNotification,
    setEditBoardModal,
    editBoardID,
    newBoardCover,
    editBoard,
    setNewBoardCover,
    getEditBoardPrevData,
    editBoardPrevData,
  } = useAppsStore();

  const onSubmit = (values: IEditBoardForm) => {
    const data = { ...values, cover: newBoardCover, id: editBoardID };

    editBoard(data);
    setEditBoardModal();
  };

  useEffect(() => {
    getEditBoardPrevData(editBoardID);

    setNewBoardCover('');
  }, [editBoardID]);

  useEffect(() => {
    setValue('name', editBoardPrevData.name);
    setValue('description', editBoardPrevData.description);
  }, [editBoardPrevData]);

  return (
    <form
      className='flex flex-col justify-start gap-3 w-full'
      onSubmit={handleSubmit(onSubmit)}
      id='editBoardModalForm'
    >
      <EditBoardNameInput errors={errors} register={register} watch={watch} />
      <EditBoardDescriptionInput
        errors={errors}
        register={register}
        watch={watch}
      />
    </form>
  );
};
