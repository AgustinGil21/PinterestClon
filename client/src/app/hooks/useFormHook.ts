import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodSchema } from 'zod';

interface UseFormHookInterface {
  schema: ZodSchema<any>;
  event?: 'onChange' | 'onBlur' | 'onSubmit' | 'all';
}

const useFormHook = ({ schema, event }: UseFormHookInterface) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: event,
  });

  return {
    register,
    handleSubmit,
    watch,
    trigger,
    errors,
    isValid,
    getValues,
  };
};

export default useFormHook;
