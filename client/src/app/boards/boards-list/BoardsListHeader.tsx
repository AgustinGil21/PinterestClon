import SearchIcon from '@/app/components/icons/SearchIcon';
import CloseSearchIcon from '@/app/interfaces/components/icons/CloseSearchIcon';
import { useState } from 'react';

interface Props {
  lang?: 'en' | 'es' | 'pt';
  setValue: (value: string) => void;
}

type Translations = {
  title: Record<'en' | 'es' | 'pt', string>;
};

const BoardsListHeader = ({ lang = 'en', setValue }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // Para hacer aparecer el botón de la X
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setValue('');
    setInputValue('');
  };

  const translations: Translations = {
    title: {
      es: 'Guardar',
      en: 'Save',
      pt: 'Salvar',
    },
  };

  return (
    <header className='flex flex-col items-center w-full gap-6 px-4 py-2'>
      <h2 className='font-semibold text-lg'>{translations.title[lang]}</h2>
      <div className='w-full relative text-black group group-hover:fill-gray-500 '>
        <input
          type='text'
          className={`w-full p-2 ${
            isFocused ? 'px-4' : 'px-8 group-hover:border-gray-500'
          } text-sm rounded-3xl border-solid border-2 border-[#cdcdcd] focus:border-outline-search focus:ring-2 focus:outline-none font-sans py-3 `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChangeValue}
          value={inputValue}
        />
        {inputValue && (
          <button
            type='button'
            className='absolute top-1/2 right-0.5 transform -translate-y-1/2 cursor-pointer hover:bg-gray-300 px-3.5 py-[13.5px] rounded-full'
            onClick={handleClick}
          >
            <CloseSearchIcon />
          </button>
        )}

        {!isFocused && (
          <div className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500'>
            <SearchIcon
              pathClassName={'group-hover:fill-gray-500 fill-[#cdcdcd]'}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default BoardsListHeader;
