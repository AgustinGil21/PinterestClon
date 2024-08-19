import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { fullNameSchema } from '@/app/infrastructure/schemas/validation-form';
import BarButtons from '../../interfaces/layout/settingsConfig/BarButtonsSettings';
import Avatar from './AvatarEdit';
import NameLastnameEdit from './NameLastnameEdit';
import TextareaEdit from './TextareaEdit';
import UrlWebEdit from './UrlWebEdit';
import UsernameEdit from './UsernameEdit';

const FormEditUser = () => {
  const { register, isValid, errors, getValues, watch } = useFormHook({
    schema: fullNameSchema,
    event: 'onChange',
  });

  const handleClick = async (event: any) => {
    event.preventDefault();
    const currentValues = getValues();
    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );
    if (!hasValue) return;

    console.log(currentValues);
    console.log(event);

    // const formData = new FormData();

    // formData.append('avatar', currentValues.avatar[0]);

    // const response = await postDataAvatarUser(formData);
    // console.log(response);
  };

  return (
    <form>
      <Avatar register={register} />

      <NameLastnameEdit register={register} errors={errors} />

      <div className='flex flex-col gap-2 mt-4'>
        <TextareaEdit register={register} errors={errors} />

        <UrlWebEdit register={register} errors={errors} />

        <UsernameEdit register={register} errors={errors} />
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
