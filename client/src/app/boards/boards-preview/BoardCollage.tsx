interface BoardCollageProps {
  className?: string;
  collage?: (string | undefined)[];
}

const BoardCollage = ({ className, collage = [] }: BoardCollageProps) => {
  return (
    <article
      className={`w-[247.6px] grid grid-cols-[164px_82px] grid-rows-[82px_82px] gap-[0.1rem] z-0 ${className}`}
    >
      <div
        className={`w-full row-[span_2] col-[1] bg-[#e9e9e9] rounded-l-2xl  bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${collage[0] || ''}) ` }}
      ></div>
      <div
        className={`w-full row-[1] col-[2] bg-[#e9e9e9] rounded-tr-2xl bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${collage[1] || ''})` }}
      ></div>
      <div
        className={`w-full row-[2] col-[2] bg-[#e9e9e9] rounded-br-2xl bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url('${collage[2] || ''}') ` }}
      ></div>
    </article>
  );
};

export default BoardCollage;
