import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useEffect, useState } from 'react';
import useFormHook from '../interfaces/hooks/useFormHook';
import { UserVisibilityAccountSchema } from '../infrastructure/schemas/validation-service-api';

const usePagePrivacyInfo = () => {
  const {
    userPublicData,
    getProfileVisibility,
    patchProfilePrivateVisibility,
    updateCheckedPrivacyOrPublic,
    userProfileVisibility,
  } = useAppsStore();
  const { watch, getValues, register, setValue } = useFormHook({
    event: 'all',
    schema: UserVisibilityAccountSchema,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      await getProfileVisibility();
      setValue('switch', userProfileVisibility?.private_account);
    };

    loadUserData();
    setLoading(false);
  }, [userProfileVisibility?.private_account]);

  const handleClick = async () => {
    const formValues = getValues();
    const newPrivateAccountValue = formValues.switch;

    if (userProfileVisibility?.private_account === newPrivateAccountValue)
      return;

    try {
      await patchProfilePrivateVisibility({
        private_account: newPrivateAccountValue,
      });
      updateCheckedPrivacyOrPublic(newPrivateAccountValue);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return {
    userPublicData,
    loading,
    register,
    setValue,
    watch,
    getValues,
    handleClick,
  };
};

export default usePagePrivacyInfo;
