import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { EditBoardDescriptionInput } from './EditBoardDescriptionInput';
import { EditBoardNameInput } from './EditBoardNameInput';
import { EditBoardSchema } from '@/app/infrastructure/schemas/validation-service-api';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface IOnSubmit {
  name: string;
  description?: string;
}

export const EditBoardForm = () => {
  const { errors, register, handleSubmit, watch } = useFormHook({
    schema: EditBoardSchema,
  });
  const { setToastNotification, setEditBoardModal, editBoardID } =
    useAppsStore();

  const onSubmit = (values: IOnSubmit) => {
    console.log(values);
    // createBoard(values);
    setEditBoardModal(editBoardID);
    console.log(values);
    // setToastNotification({
    //   status: 'success',
    //   action: 'edit',
    //   type: 'board',
    // });
  };

  return (
    <form
      className='flex flex-col justify-start gap-3 w-full'
      onSubmit={handleSubmit(onSubmit)}
      id='editBoardForm'
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
