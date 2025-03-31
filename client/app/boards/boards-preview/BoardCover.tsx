interface BoardCoverProps {
  className?: string;
  cover?: string;
  boardName: string;
}

const BoardCover = ({ className, cover = '', boardName }: BoardCoverProps) => {
  return (
    <article
      className={`${className} max-w-[247.6px] min-w-[190px] w-full h-[164px] bg-[#e9e9e9] rounded-2xl z-0 overflow-hidden flex justify-center items-center`}
    >
      <img
        src={cover}
        className='object-cover rounded-2xl min-w-[247.6px]'
        alt={boardName}
      />
    </article>
  );
};

export default BoardCover;
