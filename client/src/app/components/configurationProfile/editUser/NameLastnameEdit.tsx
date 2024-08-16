import InputRegLog from '../../Header/SignOut/BothModals/InputRegLog';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface NameLastnameInterface {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const NameLastnameEdit = ({ register, errors }: NameLastnameInterface) => {
  return (
    <div className='flex flex-row gap-3'>
      <InputRegLog
        textLabel='Nombre(s)'
        infoName='name'
        type='text'
        register={register}
        errors={errors.name}
      />
      <InputRegLog
        textLabel='Apellidos'
        infoName='lastname'
        type='text'
        register={register}
        errors={errors.lastname}
      />
    </div>
  );
};

export default NameLastnameEdit;
