'use client';
import React from 'react';
import { useAppsStore } from '../stores/useAppStore';

const PrivacyInfo = () => {
  const { isAuth } = useAppsStore();

  if (!isAuth) {
    return null;
  }
  return <div>Privacy</div>;
};

export default PrivacyInfo;
