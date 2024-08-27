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
  const {
    putPublicUserData,
    getDataUserLogged,
    getDataUserAccountEdit,
    getPublicUserData,
    userPublicData,
  } = useAppsStore();
  const { register, isValid, errors, getValues, watch, setValue } = useFormHook(
    {
      schema: fullNameSchema,
      event: 'onChange',
    }
  );

  const handleClick = async (event: any) => {
    event.preventDefault();

    const currentValues = getValues();

    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );

    const hasValidFields = Object.keys(currentValues).every((field) => {
      const fieldError = errors[field];
      const fieldValue = currentValues[field];
      return (
        !fieldError ||
        (typeof fieldValue === 'string' && fieldValue.trim().length > 0)
      );
    });

    const hasNoErrors = Object.keys(errors).length === 0;

    if (!hasValue || !hasValidFields || !hasNoErrors) {
      console.log(
        'El formulario tiene errores o no tiene valores válidos para enviar.'
      );
      return;
    }

    try {
      await putPublicUserData({
        name: userPublicData?.name,
        surname: userPublicData?.surname,
        about: userPublicData?.about,
        website: userPublicData?.website,
        username: userPublicData?.username,
      });
      // window.location.reload();
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
        isValid={isValid}
        getValues={getValues}
        handleClick={handleClick}
        watch={watch}
      />
    </form>
  );
};

export default FormEditUser;
