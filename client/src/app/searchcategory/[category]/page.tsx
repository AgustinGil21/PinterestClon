'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import Masonry from '@/app/interfaces/components/Basic/Masonry';
import { CategoriesPin } from '@/app/domain/types/pins-structure';
import { Pin } from '@/app/home-page-components/Pin';
interface Props {
  params: { explore: string };
}

const exploreSearch = ({ params }: Props) => {
  const [categoryMain, setCategoryMain] = useState<CategoriesPin[]>();
  const { categoriesPin, categorySelect, categoryPinsData } = useAppsStore();
  const { explore }: { explore: string } = params;

  useEffect(() => {
    const response = categoriesPin.filter((elem) => elem.id === categorySelect);
    console.log(response);

    setCategoryMain(response);
  }, [categorySelect]);

  return (
    <>
      {categoryMain && (
        <section className='flex flex-col justify-center items-center p-3 gap-7'>
          <div className='flex justify-center items-center'>
            <div className='w-[500px] h-[300px] relative shadow-uniform rounded-3xl'>
              <h2 className='absolute text-white text-3xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-border text-center'>
                {categoryMain[0].name}
              </h2>

              <img
                src={categoryMain[0].poster}
                alt={categoryMain[0].name}
                className='w-full h-full object-cover rounded-3xl'
              />
            </div>
          </div>
          <Masonry>
            {categoryPinsData.map((elem) => (
              <Pin elem={elem} key={elem.pin_id} />
            ))}
          </Masonry>
        </section>
      )}
    </>
  );
};

export default exploreSearch;
