interface PropsElemCategory {
  poster?: string;
  name?: string;
  id: string;
}
interface CategorySlideInterface {
  elem?: PropsElemCategory;
  color: string;
}

const CategorySlide = ({ elem, color }: CategorySlideInterface) => {
  return (
    <div
      className='cursor-pointer bg-black py-1.5 px-3 flex flex-row gap-2 items-center rounded-[30px]'
      style={{ backgroundColor: color }}
    >
      <img
        src={elem?.poster}
        alt={elem?.id}
        className='rounded-full w-7 h-7 object-cover'
      />
      <span className='text-white text-[12px] text-balance text-ellipsis'>
        {elem?.name}
      </span>
    </div>
  );
};

export default CategorySlide;
