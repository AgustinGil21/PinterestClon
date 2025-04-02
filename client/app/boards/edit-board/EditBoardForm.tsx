import { useEffect } from 'react';
import useFormHook from '../../interfaces/hooks/useFormHook';
import { EditBoardDescriptionInput } from './EditBoardDescriptionInput';
import { EditBoardNameInput } from './EditBoardNameInput';
import { EditBoardFormSchema } from '../../infrastructure/schemas/validation-service-api';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import {
  IEditBoard,
  IEditBoardForm,
} from '../../domain/types/boards-interface';

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

  let defaultCover = editBoardPrevData.cover ? editBoardPrevData.cover : '';

  const onSubmit = (values: IEditBoardForm) => {
    const data = { ...values, cover: newBoardCover, id: editBoardID };

    editBoard(data);
    window.location.reload();
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
      onSubmit={handleSubmit(onSubmit as any)}
      id='editBoardModalForm'
    >
      <EditBoardNameInput
        errors={errors}
        register={register}
        watch={watch}
        setValue={setValue}
      />
      <EditBoardDescriptionInput
        errors={errors}
        register={register}
        watch={watch}
      />
    </form>
  );
};
