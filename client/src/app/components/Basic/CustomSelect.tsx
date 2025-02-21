import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
  id: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
  children: React.ReactNode;
}

export const CustomSelect = ({ id, register, className, children }: Props) => {
  return (
    <div className='relative w-full'>
      <select
        id={id}
        className='w-full p-2.5 pl-4 pr-7 border-gray-300 border-[1px] rounded-xl text-sm mt-1 outline-outline-search text-black bg-white hover:cursor-pointer appearance-none'
        {...register(id)}
      >
        {children}
      </select>
      <div className='absolute bottom-0 right-3 flex items-center pointer-events-none justify-center ml-2 h-[41.6px]'>
        <FaChevronDown size={13} />
      </div>
    </div>
  );
};
