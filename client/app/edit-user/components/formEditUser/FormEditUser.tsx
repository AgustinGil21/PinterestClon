import BarButtons from '../../../interfaces/layout/settingsConfig/BarButtonsSettings';
import Avatar from '../AvatarEdit';
import NameLastnameEdit from '../nameLastnameEdit/NameLastnameEdit';
import TextareaEdit from '../textAreaEdit/TextareaEdit';
import UrlWebEdit from '../urlWebEdit/UrlWebEdit';
import UsernameEdit from '../usernameEdit/UsernameEdit';
import useFormEditUser from './useFormEditUser';

const FormEditUser = () => {
  const { register, errors, getValues, watch, setValue, handleClick } =
    useFormEditUser();

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
