import PinterestLogo from '../../../icons/PinterestLogo';

interface TextLogoInterface {
  children: React.ReactNode;
}

const TextLogo = ({ children }: TextLogoInterface) => {
  return (
    <div className='flex flex-col items-center mb-4'>
      <PinterestLogo classProps='w-[35px] h-[35px]' />
      <h3 className='text-black dark:text-white text-2xl font-semibold text-center mt-2 max-w-[300px]'>
        {children}
      </h3>
    </div>
  );
};

export default TextLogo;
