import { SuggestionsInterface } from '../../../../domain/types/pins-structure';
import SearchIcon from '../../../components/icons/SearchIcon';

interface SearchTitleInterface {
  elem: SuggestionsInterface;
  index: number;
  handleClick: (elem: string) => Promise<void>;
}

const SearchTitle = ({ elem, index, handleClick }: SearchTitleInterface) => {
  const text = elem.pin_title || elem.pin_alt_text;

  return (
    <div
      onClick={() => {
        if (text) {
          handleClick(text);
        }
      }}
      key={index}
      className='p-2 text-sm flex flex-row items-center gap-4 hover:bg-gray-200 dark:hover:bg-slate-800 w-full px-7 cursor-pointer'
    >
      <SearchIcon
        classname='text-black dark:text-white'
        width={9.5}
        height={9.5}
      />
      {elem.pin_title ? (
        <span>{elem.pin_title}</span>
      ) : (
        <span>{elem.pin_alt_text} </span>
      )}
    </div>
  );
};

export default SearchTitle;
