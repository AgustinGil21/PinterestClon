import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import CardCategory from './CardCategory';
import { useMemo } from 'react';

const CategoryGroups = () => {
  const { userPublicData, categoriesPin } = useAppsStore();
  const categories = useMemo(
    () => categoriesPin.sort(() => Math.random() - 0.5).slice(0, 8),
    [categoriesPin]
  );

  const categories2 = useMemo(
    () => categoriesPin.sort(() => Math.random() - 0.5).slice(9, 17),
    [categoriesPin]
  );

  return (
    <div className=' mt-5'>
      {userPublicData?.username && (
        <>
          <h3 className='text-sm font-semibold my-2'>Ideas para ti</h3>
          <div className='flex  flex-wrap  gap-2 '>
            {categories.map((elem) => (
              <div key={elem.id} className='flex-wrap w-[calc(20%-0.5rem)] p-1'>
                <CardCategory elem={elem} />
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className='text-sm font-semibold my-3 mt-6'>
        Populares en Pinterest
      </h3>
      <div className='flex flex-wrap gap-2'>
        {categories2.map((elem) => (
          <div key={elem.id} className='flex-wrap w-[calc(20%-0.5rem)] p-1'>
            <CardCategory elem={elem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroups;
