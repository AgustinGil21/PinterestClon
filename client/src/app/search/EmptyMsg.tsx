interface Props {
  searchValue: string;
  type: 'pin' | 'board' | 'user';
}

export const EmptyMsg = ({ searchValue, type }: Props) => {
  return (
    <div
      className={`fixed top-[220px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4 max-w-[700px]`}
    >
      <p className='text-[15px] text-black text-center'>
        Lo sentimos, no encontramos ningún {`${type}`} relacionado con{' '}
        <strong className='font-semibold'>&quot;{searchValue}&quot;</strong>.
        Prueba con otra búsqueda.
      </p>
    </div>
  );
};
