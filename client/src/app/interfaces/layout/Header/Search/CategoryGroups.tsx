import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import CardCategoryModal from './CardCategoryModal';
import { useMemo } from 'react';

interface CategoryGroupsInterface {
  setModal: (value: boolean) => void;
}

const CategoryGroups = ({ setModal }: CategoryGroupsInterface) => {
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
          <h3 className='text-sm font-semibold my-2 dark:text-white'>
            Ideas para ti
          </h3>
          <div className='flex  flex-wrap  gap-2 '>
            {categories.map((elem) => (
              <div
                key={elem.id}
                className='flex-wrap w-[calc(20%-0.5rem)] p-1 cursor-pointer'
              >
                <CardCategoryModal elem={elem} setModal={setModal} />
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className='text-sm font-semibold my-3 mt-6 dark:text-white'>
        Populares en Pinterest
      </h3>
      <div className='flex flex-wrap gap-2'>
        {categories2.map((elem) => (
          <div
            key={elem.id}
            className='flex-wrap w-[calc(20%-0.5rem)] p-1 cursor-pointer'
          >
            <CardCategoryModal elem={elem} setModal={setModal} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroups;
