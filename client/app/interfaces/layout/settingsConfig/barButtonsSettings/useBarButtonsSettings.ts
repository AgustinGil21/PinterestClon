import { useState } from 'react';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { UseFormGetValues, UseFormWatch } from 'react-hook-form';

interface useInterfaceBarButtons {
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  handleClick?: (data: any) => void;
}

const useBarButtonsSettings = ({
  getValues,
  watch,
}: useInterfaceBarButtons) => {
  const [initialValues, setInitialValues] = useState<FieldValues>({});
  const [hasAnyValue, setHasAnyValue] = useState(true);
  const {
    getUserSettingsEditProfile,
    getUserAccountManagement,
    getProfileVisibility,
  } = useAppsStore();

  useEffect(() => {
    setInitialValues(getValues());
  }, [getValues]);

  useEffect(() => {
    const checkValues = () => {
      const currentValues = getValues();
      const isModified = Object.keys(currentValues).some(
        (key) => currentValues[key] !== initialValues[key]
      );
      setHasAnyValue(isModified);
    };

    checkValues();

    const subscription = watch(() => {
      checkValues();
    });

    return () => subscription.unsubscribe();
  }, [getValues, watch, initialValues]);

  const handleReload = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!hasAnyValue) return;

    getProfileVisibility();
    getUserSettingsEditProfile();
    getUserAccountManagement();
  };
  return { handleReload, hasAnyValue };
};

export default useBarButtonsSettings;
