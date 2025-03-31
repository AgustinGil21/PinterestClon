import React from 'react';
import { useState, useEffect } from 'react';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import useFormHook from '../../../interfaces/hooks/useFormHook';
import { EditAdminAccountSchema } from '../../../infrastructure/schemas/validation-form';

const useFormAdminUser = () => {
  const { putUserAccountManagement, userAccountManagment } = useAppsStore();
  const [initialState] = useState(userAccountManagment);

  const {
    watch,
    handleSubmit,
    getValues,
    register,
    errors,
    setValue,
    isValid,
  } = useFormHook({
    schema: EditAdminAccountSchema,
    event: 'onChange',
  });

  const prevCurrentValues = getValues();

  const [initialCurrentValue, setInitialCurrentValue] =
    useState(prevCurrentValues);

  useEffect(() => {
    setInitialCurrentValue(prevCurrentValues);
  }, []);

  const handleClick = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const currentValues = getValues();
    const hasValue = Object.values(currentValues).some(
      (value) => typeof value === 'string' && value.trim().length > 0
    );

    if (!isValid || !hasValue) return;

    if (
      userAccountManagment?.email_address === initialState?.email_address &&
      userAccountManagment?.birthdate === initialState?.birthdate &&
      currentValues.country === prevCurrentValues?.country &&
      currentValues?.radio === prevCurrentValues?.radio &&
      currentValues?.language === prevCurrentValues?.language
    )
      return;

    try {
      await putUserAccountManagement({
        gender: currentValues.radio,
        country: currentValues.country,
        emailAddress: currentValues.email,
        language: currentValues.language,
        birthdate: currentValues.date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleClick,
    register,
    getValues,
    setValue,
    watch,
    errors,
  };
};

export default useFormAdminUser;
