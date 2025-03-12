import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { EditBoardDescriptionInput } from './EditBoardDescriptionInput';
import { EditBoardNameInput } from './EditBoardNameInput';
import { EditBoardSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { IEditBoard } from '@/app/domain/types/boards-interface';
import { useEffect } from 'react';

export const EditBoardForm = () => {
  const { errors, register, handleSubmit, watch } = useFormHook({
    schema: EditBoardSchema,
  });
  const {
    setToastNotification,
    setEditBoardModal,
    editBoardID,
    newBoardCover,
    editBoard,
    setNewBoardCover,
  } = useAppsStore();

  const onSubmit = (values: IEditBoard) => {
    const data = { ...values, cover: newBoardCover, id: editBoardID };
    console.log(data);
    // editBoard(values);
    setEditBoardModal();
    // setToastNotification({
    //   status: 'success',
    //   action: 'edit',
    //   type: 'board',
    // });
  };

  useEffect(() => {
    setNewBoardCover('');
    console.log(editBoardID);
  }, [editBoardID]);

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
