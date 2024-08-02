import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodSchema } from 'zod';

const useFormHook = (schema: ZodSchema<any>) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return {
    register,
    handleSubmit,
    watch,
    trigger,
    errors,
    isValid,
  };
};

export default useFormHook;
