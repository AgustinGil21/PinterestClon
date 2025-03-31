'use client';
import ButtonStyled from '../../interfaces/components/Basic/ButtonStyled';
import { useState, useEffect, useRef } from 'react';
import { useAppsStore } from '../../infrastructure/stores/useAppStore';
import Masonry from '../../interfaces/components/Basic/Masonry';
import { CategoriesPin } from '../../domain/types/pins-structure';
import { Pin } from '../../home-page-components/Pin';
import { IExploreCategories } from '../../global-interfaces/translation-interface';
import useSearchCategory from '../../interfaces/hooks/useSearchCategory';
import { useRouter } from 'next/navigation';
import ArrowTwoLeftIcon from '../../interfaces/components/icons/ArrowTwoLeftIcon';
import DownloadIcon from '../../interfaces/components/icons/DownloadIcon';
import { CategoryShareModal } from './CategoryShareModal';
import useInfiniteScroll from '../../interfaces/hooks/useInfiniteScroll';

interface Props {
  params: { explore: string };
}

const ExploreSearch = ({ params }: Props) => {
  const router = useRouter();
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const shareBtnRef = useRef(null);
  const [categoryMain, setCategoryMain] = useState<CategoriesPin[]>();
  const {
    categoriesPin,
    categorySelect,
    categoryPinsData,
    t,
    value,
    getSearchPinForCategory,
  } = useAppsStore();
  const { handleScroll, lastScrollTop } = useInfiniteScroll();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const {} = useSearchCategory({
    getSearchPinForCategory: getSearchPinForCategory,
  });

  const handleOpenShareModal = () => setShareModalIsOpen(!shareModalIsOpen);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const response = categoriesPin.filter((elem) => elem.id === categorySelect);

    setCategoryMain(response);
  }, [categoriesPin, categorySelect]);

  return (
    <>
      {categoryMain && (
        <section className='flex flex-col justify-center items-center p-3 gap-7 w-full relative'>
          <div className='absolute top-0 left-0 m-4  md:inline-block hidden'>
            <ButtonStyled
              className='font-semibold text-sm lg:flex items-center flex-row gap-2 hover:bg-gray-200 '
              handleClick={handleGoBack}
            >
              <ArrowTwoLeftIcon />

              <span className='hidden xl:inline '>
                {t?.pin['for-you'] || 'Para ti'}
              </span>
            </ButtonStyled>
          </div>
          <div className='flex justify-center items-center flex-col gap-2 w-full'>
            <div className='min-w-[250px] min-h-[150px] max-w-[600px] max-h-[300px] relative shadow-uniform rounded-3xl w-full h-[150px] md:h-[300px]'>
              <h2 className='absolute text-white text-3xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-border text-center'>
                {categoryMain[0]?.name}
              </h2>

              <img
                src={categoryMain[0]?.poster}
                alt={categoryMain[0]?.name}
                className='w-full h-full object-cover rounded-3xl'
              />
              <button
                className={`p-2 rounded-full absolute bottom-2 right-2 group duration-300 transition-colors ${
                  shareModalIsOpen ? 'bg-black ' : 'bg-white hover:bg-gray-200'
                }`}
                ref={shareBtnRef}
                onClick={handleOpenShareModal}
              >
                <DownloadIcon
                  classProps='w-5 h-5'
                  isDownloadAccountOpen={shareModalIsOpen}
                />
              </button>
            </div>
            <p className='text-sm'>
              {t?.['explore-categories']?.[
                categoryMain[0]?.name as keyof IExploreCategories
              ] || categoryMain[0]?.name}
            </p>
            {shareModalIsOpen && (
              <CategoryShareModal
                setModal={handleOpenShareModal}
                modalIsOpen={shareModalIsOpen}
                btnRef={shareBtnRef}
                category={categoryMain[0]?.name || ''}
              />
            )}
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

export default ExploreSearch;
