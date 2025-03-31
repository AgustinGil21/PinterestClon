interface ButtonInverseInterface {
  openModal: () => void;
  children: React.ReactNode;
}

const ButtonInverse = ({ openModal, children }: ButtonInverseInterface) => {
  return (
    <button
      className='text-black text-[12px] cursor-pointer dark:text-white'
      onClick={openModal}
    >
      {children}
    </button>
  );
};

export default ButtonInverse;
