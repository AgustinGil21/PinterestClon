interface BoardCoverProps {
  className?: string;
  cover?: string;
}

const BoardCover = ({ className, cover = '' }: BoardCoverProps) => {
  return (
    <article
      className={`max-w-[247.6px] min-w-[190px] w-full h-[164px] bg-[#e9e9e9] bg-no-repeat bg-cover bg-center ${className} rounded-2xl z-0`}
      style={{ backgroundImage: `url(${cover})` }}
    ></article>
  );
};

export default BoardCover;
