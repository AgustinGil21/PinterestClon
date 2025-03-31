import React from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import InputStyled from '../interfaces/components/Basic/InputStyled';

interface FilterInterface {
  value: string;
  selectedFilter: string;
  handleFilterClick: (filter: string) => void;
  labelFilter: string;
}

const Filter = ({
  value,
  selectedFilter,
  handleFilterClick,
  labelFilter,
}: FilterInterface) => {
  const { t } = useAppsStore();

  return (
    <div className='flex items-center justify-between text-sm'>
      <span>{labelFilter || t?.filters.pins}</span>
      <InputStyled
        infoName={value}
        type='radio'
        value={value}
        classProps='form-radio h-3 w-3 text-black focus:ring-blue-500 custom-radio'
        onClick={() => handleFilterClick(value)}
        checked={selectedFilter === value}
      />
    </div>
  );
};

export default Filter;
