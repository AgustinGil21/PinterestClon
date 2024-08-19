'use client';
import React from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const SecurityProfile = () => {
  const { user } = useAppsStore();

  if (!user?.id) return null;

  return (
    <>
      <div>Security profile</div>
    </>
  );
};

export default SecurityProfile;
