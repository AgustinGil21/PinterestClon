import { UseFormTrigger } from 'react-hook-form';

const useValidateSequentially = (trigger: UseFormTrigger<any>) => {
  const validateSequentially = async () => {
    const usernameValid = await trigger('username');
    if (!usernameValid) return false;

    const emailValid = await trigger('email');
    if (!emailValid) return false;

    const passwordValid = await trigger('password');
    if (!passwordValid) return false;

    const dateValid = await trigger('date');
    if (!dateValid) return false;

    return true;
  };

  return {
    validateSequentially,
  };
};

export default useValidateSequentially;
