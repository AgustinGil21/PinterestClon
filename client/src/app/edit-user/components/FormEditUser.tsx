import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { fullNameSchema } from '@/app/infrastructure/schemas/validation-form';
import BarButtons from '../../interfaces/layout/settingsConfig/BarButtonsSettings';
import Avatar from './AvatarEdit';
import NameLastnameEdit from './NameLastnameEdit';
import TextareaEdit from './TextareaEdit';
import UrlWebEdit from './UrlWebEdit';
import UsernameEdit from './UsernameEdit';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useEffect } from 'react';

const FormEditUser = () => {
  const { putPublicUserData, getDataUserLogged } = useAppsStore();
  const { register, isValid, errors, getValues, watch, setValue } = useFormHook(
    {
      schema: fullNameSchema,
      event: 'onChange',
    }
  );

  useEffect(() => {
    const x = async () => {
      const response = await getDataUserLogged();
      console.log(response);
    };

    x();
  }, []);

  const handleClick = async (event: any) => {
    event.preventDefault();
    const currentValues = getValues();
    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );
    if (!hasValue) return;

    try {
      putPublicUserData(currentValues);
    } catch (error) {
      console.log(error);
    }

    console.log(currentValues);
    console.log(event);
  };

  return (
    <form>
      <Avatar register={register} watch={watch} />

      <NameLastnameEdit
        register={register}
        errors={errors}
        getValues={getValues}
        watch={watch}
        setValue={setValue}
      />

      <div className='flex flex-col gap-2 mt-4'>
        <TextareaEdit
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
        />

        <UrlWebEdit
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          getValue={getValues}
        />

        <UsernameEdit
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          getValue={getValues}
        />
      </div>
      <BarButtons
        getValues={getValues}
        handleClick={handleClick}
        watch={watch}
      />
    </form>
  );
};

export default FormEditUser;
