import ErrorInputIcon from '../icons/ErrorInputIcon';

interface ChildrenErrorInterface {
  children: React.ReactNode;
  classname?: string;
}

const ErrorStyled = ({ children, classname }: ChildrenErrorInterface) => {
  return (
    <div
      className={`flex flex-row items-center mt-1 gap-1  px-1 relative right-2 ${classname}`}
    >
      <ErrorInputIcon className='w-6 h-3 relative  ' />
      <p className='text-red-500 text-[10px] '>{children}</p>
    </div>
  );
};

export default ErrorStyled;
