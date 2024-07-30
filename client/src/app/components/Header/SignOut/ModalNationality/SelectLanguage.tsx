import React from 'react';
import { languages } from './db';

const SelectLanguage = () => {
  return (
    <select
      name='countries'
      id='countries'
      className='w-full p-3 px-4 border-gray-200 border-2 rounded-xl text-sm mt-2 text-black'
    >
      {languages.map((elem) => (
        <option key={elem.key} value={elem.key}>
          {elem.langugage}
        </option>
      ))}
    </select>
  );
};

export default SelectLanguage;
