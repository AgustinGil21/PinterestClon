import { useEffect, useState } from 'react';
import { CategorySlideSkeleton } from '../skeletons/CategorySlideSkeleton';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

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
  const { t } = useAppsStore();
  const [loading, setLoading] = useState(!!elem?.poster);

  const handleOnLoad = () => setLoading(false);

  useEffect(() => {
    if (elem?.poster) setLoading(false);
  }, [elem?.poster]);

  return (
    <>
      {loading ? (
        <CategorySlideSkeleton />
      ) : (
        <div
          className='cursor-pointer bg-black  pr-3 flex flex-row gap-2 items-center rounded-[30px] h-[44px] hover:opacity-90 transition-opacity'
          style={{ backgroundColor: color }}
        >
          <img
            src={elem?.poster}
            alt={`${elem?.name} category`}
            className='rounded-l-full w-11 h-full object-cover'
            onLoad={handleOnLoad}
          />
          <span className='text-white text-[12px] text-balance text-ellipsis py-1.5'>
            {t?.categories[`${elem?.name}`] || elem?.name}
          </span>
        </div>
      )}
    </>
  );
};

export default CategorySlide;
