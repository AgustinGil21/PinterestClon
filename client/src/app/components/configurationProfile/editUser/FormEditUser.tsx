import useFormHook from '@/app/hooks/useFormHook';
import { fullNameSchema } from '@/app/schemas/validation-form';
import BarButtons from '../BarButtons';
import Avatar from './AvatarEdit';
import NameLastname from './NameLastnameEdit';
import Textarea from './TextareaEdit';
import UrlWeb from './UrlWebEdit';
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

      <NameLastname register={register} errors={errors} />

      <div className='flex flex-col gap-2 mt-4'>
        <Textarea register={register} errors={errors} />

        <UrlWeb register={register} errors={errors} />

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
