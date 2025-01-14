interface Props {
  typing?: boolean;
}

export const BoardsListEmpty = ({ typing = false }: Props) => {
  return (
    <>
      <span className='self-center justify-self-center mt-10 text-xl font-semibold text-[#b3b3b3]'>
        {typing ? 'Crea un tablero primero' : 'Sin tableros'}
      </span>
    </>
  );
};
