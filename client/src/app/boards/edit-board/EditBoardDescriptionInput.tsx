import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { IFormHook, IHandleChange } from '../boards-client-interface';
import { CustomTextArea } from '@/app/components/Basic/CustomTextArea';

export const EditBoardDescriptionInput = ({
  errors,
  register,
  watch,
}: IFormHook) => {
  const { t } = useAppsStore();

  const handleChange = ({ key, value }: IHandleChange) => {};

  return (
    <label className='text-xs hover:cursor-pointer flex flex-col gap-1'>
      <span className='text-xs font-semibold'>
        {t?.board.create.description.label || 'Descripción'}
      </span>
      <CustomTextArea
        className='resize-none w-full border-solid rounded-lg border-2 border-[#ebebeb] hover:border-[#cdcdcd] outline-outline-search p-2 text-xs min-h-[150px]'
        infoName='description'
        placeholder={
          t?.board.create.description.placeholder || 'Descripción del tablero'
        }
        maxLength={500}
        register={register}
        errors={errors.description}
        watch={watch}
        handleChange={handleChange}
      />
    </label>
  );
};
