'use client';
import { useState, useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { useMemo } from 'react';
import CheckIcon from '../interfaces/components/icons/CheckIcon';
import ButtonStyled from '../interfaces/components/Basic/ButtonStyled';
import Link from 'next/link';
import CardCategory from './CardCategory';
import { FullDate } from '../components/Basic/FullDate';
import Masonry from '../interfaces/components/Basic/Masonry';
import { Pin } from '../home-page-components/Pin';
import { CategoriesPin } from '../domain/types/pins-structure';

export default function Explore() {
  const [loading, setLoading] = useState(true);

  const {
    categoriesPin,
    getCategoriesPin,
    page,
    updateDataSearch,
    t,
    categoryPinsData,
    userLang,
    categorySelect,
  } = useAppsStore();
  const limit = 25;

  const categories = useMemo(
    () => categoriesPin.sort(() => Math.random() - 0.5).slice(0, 7),
    [categoriesPin]
  );

  useEffect(() => {
    updateDataSearch('page', 1);
    getCategoriesPin();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <>
      <section className='w-full flex justify-center p-3'>
        <div className='flex justify-center w-full flex-col max-w-[1400px] '>
          <div className='my-8 flex items-center flex-col'>
            <h3 className='text-1xl font-semibold'>
              <FullDate lang={userLang || 'es'} />
            </h3>
            <h2 className='font-bold text-4xl'>
              {t?.explore.title || 'Sigue inspirándote'}
            </h2>
          </div>

          <div className='flex justify-center flex-wrap gap-4'>
            {categories.map((elem) => (
              <CardCategory
                key={elem.id}
                elem={elem}
                page={page}
                limit={limit}
              />
            ))}
          </div>

          <div className='flex justify-center items-center mb-[80px] mt-[120px] flex-col'>
            <div className='text-center flex justify-center items-center flex-col gap-2'>
              <CheckIcon />
              <span>{t?.explore.footer.title || '¡Es todo por hoy!'}</span>
              <p className='font-semibold text-1xl'>
                {t?.explore.footer.subtitle ||
                  'Vuelve mañana para encontrar más inspiración'}
              </p>
              <Link href={'/'} className='flex justify-center w-full'>
                <ButtonStyled className='bg-buttonGreyBg font-semibold mt-8 p-2 hover:bg-gray-300'>
                  {t?.explore.footer.button || 'Ir al feed de inicio'}
                </ButtonStyled>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
