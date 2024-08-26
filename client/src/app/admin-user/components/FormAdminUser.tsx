import BarButtons from '@/app/interfaces/layout/settingsConfig/BarButtonsSettings';
import useFormHook from '@/app/interfaces/hooks/useFormHook';
import { EditAdminAccountSchema } from '@/app/infrastructure/schemas/validation-form';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import EmailAdmin from './EmailAdmin';
import PasswordAdmin from './PasswordAdmin';
import TypeAcountAdmin from './TypeAcountAdmin';
import BirthdateAdmin from './BirthdateAdmin';
import GendersAdmin from './GendersAdmin';
import CountriesAdmin from './CountriesAdmin';
import LanguagesAdmin from './LanguagesAdmin';
import DeactiveAccount from './DeactiveAccount';
import DeleteAccount from './DeleteAccount';

const FormAdminUser = () => {
  const { getDataUserAccountEdit } = useAppsStore();

  const { watch, handleSubmit, getValues, register, errors, setValue } =
    useFormHook({
      schema: EditAdminAccountSchema,
      event: 'onChange',
    });

  const handleClick = (event: any) => {
    event.preventDefault();
    const currentValues = getValues();
    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );
    if (!hasValue) return;

    console.log(currentValues);
  };

  return (
    <form>
      <div className='mt-2 flex flex-col gap-1'>
        <EmailAdmin
          register={register}
          errors={errors}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />
        <PasswordAdmin />

        <TypeAcountAdmin />
        <BirthdateAdmin
          register={register}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />

        <GendersAdmin
          register={register}
          setValue={setValue}
          getValues={getValues}
        />

        <CountriesAdmin
          setValue={setValue}
          register={register}
          getValues={getValues}
          watch={watch}
        />

        <LanguagesAdmin register={register} setValue={setValue} />

        <div className='mt-4 '>
          <span className='font-semibold'>Desactivación y eliminación</span>
          <DeactiveAccount />
          <DeleteAccount />
        </div>
      </div>

      <BarButtons
        watch={watch}
        handleClick={handleClick}
        getValues={getValues}
      />
    </form>
  );
};

export default FormAdminUser;
