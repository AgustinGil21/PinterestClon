import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import InputStyled from '@/app/interfaces/components/Basic/InputStyled';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DeleteAvatar from './DeleteAvatar';
import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';

interface AvatarInterface {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const AvatarEdit = ({ register, watch }: AvatarInterface) => {
  const { userPublicData, userSettingsEditProfile, t } = useAppsStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const avatarFile = watch('avatar');

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [avatarFile]);

  return (
    <div className='mt-2 flex flex-row gap-3 items-center'>
      <div className='flex items-start flex-col'>
        <label className='text-[10px] mb-1'>
          {t?.['edit-profile'].avatar.label || 'Foto'}
        </label>
        {imagePreview ? (
          <div className='relative w-16 h-16'>
            <Image
              src={imagePreview}
              alt='Preview'
              layout='fill'
              objectFit='cover'
              className='rounded-full'
            />
          </div>
        ) : (
          <AvatarUser
            classProps='w-[62px] h-[62px] text-[20px]'
            data={userPublicData}
            textSize=''
          />
        )}
      </div>
      <div className='mt-5 flex flex-row gap-2 '>
        <ButtonStyled
          className='bg-buttonGreyBg hover:bg-gray-200 items-center font-semibold w-fit relative cursor-pointer dark:text-black'
          aria-label='Cambiar Avatar'
        >
          {t?.['edit-profile'].avatar.change || 'Cambiar'}
          <InputStyled
            accept='.png, .jpg, .jpeg'
            register={register}
            infoName='avatar'
            type='file'
            classProps='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
          />
        </ButtonStyled>
        {userPublicData?.avatar && <DeleteAvatar />}
      </div>
    </div>
  );
};

export default AvatarEdit;
