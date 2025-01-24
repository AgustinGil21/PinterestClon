import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Tooltip from '@/app/interfaces/components/Basic/ToolTip';
import TrashIcon from '@/app/interfaces/components/icons/TrashIcon';
import React from 'react';

const DeleteAvatar = () => {
  const { deleteAvatar, t } = useAppsStore();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault;
    deleteAvatar();
    window.location.reload();
  };

  return (
    <Tooltip
      tooltipText={
        t?.['edit-profile'].avatar['delete-tooltip'] || 'Eliminar avatar'
      }
    >
      <button onClick={handleClick}>
        <TrashIcon />
      </button>
    </Tooltip>
  );
};

export default DeleteAvatar;
