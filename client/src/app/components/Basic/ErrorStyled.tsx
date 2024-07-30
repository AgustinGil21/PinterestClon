import ErrorInputIcon from '../icons/ErrorInputIcon';

interface ChildrenErrorInterface {
  children: React.ReactNode;
}

const ErrorStyled = ({ children }: ChildrenErrorInterface) => {
  return (
    <div className='flex flex-row items-center mt-1  '>
      <ErrorInputIcon className='w-6 h-3 relative left-0.5' />
      <p className='text-red-500 text-[10px] px-1 '>{children}</p>
    </div>
  );
};

export default ErrorStyled;
