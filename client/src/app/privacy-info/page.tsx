'use client';
import React from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const PrivacyInfo = () => {
  const { isAuth, user } = useAppsStore();

  if (!user?.id) {
    return null;
  }
  return <div>Privacy</div>;
};

export default PrivacyInfo;
