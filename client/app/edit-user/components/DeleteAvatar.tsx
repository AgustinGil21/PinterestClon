import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import Tooltip from '../../interfaces/components/Basic/ToolTip';
import TrashIcon from '../../interfaces/components/icons/TrashIcon';
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
