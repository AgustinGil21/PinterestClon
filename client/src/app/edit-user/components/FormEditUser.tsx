import useFormHook from '@/app/interfaces/hooks/useFormHook';
import BarButtons from '../../interfaces/layout/settingsConfig/BarButtonsSettings';
import Avatar from './AvatarEdit';
import NameLastnameEdit from './NameLastnameEdit';
import TextareaEdit from './TextareaEdit';
import UrlWebEdit from './UrlWebEdit';
import UsernameEdit from './UsernameEdit';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { UserSettingsEditProfileValidationSchema } from '@/app/infrastructure/schemas/validation-form';

const FormEditUser = () => {
  const {
    putUserSettingsEditProfile,
    userSettingsEditProfile,
    userPublicData,
    patchAvatar,
  } = useAppsStore();
  const { register, errors, getValues, watch, setValue } = useFormHook({
    schema: UserSettingsEditProfileValidationSchema,
    event: 'onChange',
  });

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

    if (currentValues.avatar[0]) {
      try {
        patchAvatar({
          avatar: currentValues.avatar[0],
        });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await putUserSettingsEditProfile({
        username: currentValues?.username,
        name: userSettingsEditProfile?.name,
        surname: userSettingsEditProfile?.surname,
        about_you: currentValues?.about_you,
        website: currentValues.website,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
