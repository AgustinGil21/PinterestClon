import React from 'react';
interface CreatesOrSavesLinkInterfdace {
  savesOrCreates: null | boolean;
  setSavesOrCreates: (value: boolean) => void;
}

const CreatesOrSavesLink = ({
  savesOrCreates,
  setSavesOrCreates,
}: CreatesOrSavesLinkInterfdace) => {
  return (
    <div className='flex flex-row gap-3 mt-9 font-semibold text-sm'>
      <p
        className={`hover:bg-gray-200 rounded-md p-2 cursor-pointer  dark:text-white dark:hover:bg-black ${
          savesOrCreates &&
          'underline decoration-[3px] underline-offset-8  dark:text-white'
        }`}
        onClick={() => setSavesOrCreates(true)}
      >
        Creados
      </p>
      <p
        className={`hover:bg-gray-200 rounded-md p-2 cursor-pointer  dark:text-white dark:hover:bg-black ${
          !savesOrCreates &&
          'underline decoration-[3px] underline-offset-8  dark:text-white'
        } `}
        onClick={() => setSavesOrCreates(false)}
      >
        Guardados
      </p>
    </div>
  );
};

export default CreatesOrSavesLink;
