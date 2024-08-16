import { useAppsStore } from '@/app/stores/useAppStore';
import ButtonStyled from '../../Basic/ButtonStyled';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import InputStyled from '../../Basic/InputStyled';

interface AvatarInterface {
  register: UseFormRegister<FieldValues>;
}

const AvatarEdit = ({ register }: AvatarInterface) => {
  const { user, postDataAvatarUser } = useAppsStore();

  return (
    <div className='mt-2 flex flex-row gap-3 items-center'>
      <div className='flex items-start  flex-col '>
        <label className='text-[10px] mb-1 '>Foto</label>
        <div
          className=' rounded-full w-[62px] h-[62px] flex items-center justify-center  relative overflow-hidden'
          style={{ backgroundColor: `${user.avatar_background}` }}
        >
          <span
            className='text-[20px]'
            style={{ color: user.avatar_letter_color }}
          >
            {user.avatar_letter}
          </span>
        </div>
      </div>
      <div className='mt-5'>
        <ButtonStyled
          disabled={false}
          className='bg-buttonGreyBg hover:bg-gray-200  items-center font-semibold w-fit relative cursor-pointer dark:text-black'
        >
          Cambiar
          <InputStyled
            register={register}
            infoName='avatar'
            type='file'
            classProps='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer '
          />
        </ButtonStyled>
      </div>
    </div>
  );
};

export default AvatarEdit;
