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
    <div className='mt-5 category-groups overflow-hidden'>
      {userPublicData?.username && (
        <>
          <h3 className='text-sm font-semibold my-2 dark:text-white'>
            Ideas para ti
          </h3>
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(178px,_1fr))] gap-1 min-w-[770px] grid-auto-rows-[minmax(200px,_1fr)] overflow-hidden'>
            {categories.map((elem) => (
              <div
                key={elem.id}
                className='flex flex-wrap w-full p-1.5 cursor-pointer'
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
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(178px,_1fr))] gap-1 min-w-[770px] grid-auto-rows-[minmax(200px,_1fr)] overflow-hidden'>
        {categories2.map((elem) => (
          <div
            key={elem.id}
            className='flex flex-wrap w-full p-1.5 cursor-pointer'
          >
            <CardCategoryModal elem={elem} setModal={setModal} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroups;
