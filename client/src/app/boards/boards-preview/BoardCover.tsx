interface BoardCoverProps {
  className?: string;
  cover?: string;
}

const BoardCover = ({ className, cover = '' }: BoardCoverProps) => {
  return (
    <article
      className={`w-[247.6px] h-[164px] bg-[#e9e9e9] bg-no-repeat bg-cover bg-center ${className} rounded-lg z-0`}
      style={{ backgroundImage: `url(${cover})` }}
    ></article>
  );
};

export default BoardCover;
