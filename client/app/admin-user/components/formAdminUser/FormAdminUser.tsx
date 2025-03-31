import BarButtons from '../../../interfaces/layout/settingsConfig/BarButtonsSettings';
import EmailAdmin from '../emailAdmin/EmailAdmin';
import PasswordAdmin from '../PasswordAdmin';
import TypeAcountAdmin from '../TypeAcountAdmin';
import BirthdateAdmin from '../birthdateAdmin/BirthdateAdmin';
import GendersAdmin from '../gendersAdmin/GendersAdmin';
import CountriesAdmin from '../countriesAdmin/CountriesAdmin';
import LanguagesAdmin from '../languagesAdmin/LanguagesAdmin';
import DeleteAccount from '../DeleteAccount';
import useFormAdminUser from './useFormAdminUser';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';

const FormAdminUser = () => {
  const { register, errors, getValues, watch, setValue, handleClick } =
    useFormAdminUser();
  const { t } = useAppsStore();

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
          <span className='font-semibold'>
            {t?.['account-management']['eliminate-account'].title ||
              'Desactivación y eliminación'}
          </span>
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
