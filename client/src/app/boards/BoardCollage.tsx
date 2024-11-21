interface BoardCollageProps {
  className?: string;
  collage?: string[];
}

const BoardCollage = ({ className, collage = [] }: BoardCollageProps) => {
  return (
    <article
      className={`w-[247.6px] grid grid-cols-[164px_82px] grid-rows-[82px_82px] gap-[0.1rem] z-0 board-preview-collage hover:cursor-pointer ${className}`}
    >
      <div
        className={`w-full row-[span_2] col-[1] bg-[#e9e9e9] rounded-l-lg bg-[url(${collage[0]})] bg-center bg-cover bg-no-repeat`}
      ></div>
      <div
        className={`w-full row-[1] col-[2] bg-[#e9e9e9] rounded-tr-lg bg-[url(${collage[1]})] bg-center bg-cover bg-no-repeat`}
      ></div>
      <div
        className={`w-full row-[2] col-[2] bg-[#e9e9e9] rounded-br-lg bg-[url(${collage[2]})] bg-center bg-cover bg-no-repeat`}
      ></div>
    </article>
  );
};

export default BoardCollage;
