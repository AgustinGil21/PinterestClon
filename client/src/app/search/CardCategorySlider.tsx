import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import CategorySlide from './CategorySlide';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { useState, useEffect } from 'react';

const CardCategorySlider = () => {
  const { categoriesPin } = useAppsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const generateDarkColor = (index: number) => {
    const darkColors = ['#1A202C', '#2C3E50', '#2A2A72', '#3E2C41', '#4B5563'];
    return darkColors[index % darkColors.length];
  };

  return (
    <div className='flex gap-2 items-center w-full overflow-hidden'>
      <button
        id='swiper-btn-prev'
        className='rounded-full transition-colorsjustify-center items-center disabled:opacity-25 p-2.5 enabled:hover:bg-slate-200 hidden md:flex'
      >
        <ArrowLeftIcon />
      </button>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView='auto'
        grabCursor={true}
        autoplay
        navigation={{
          prevEl: '#swiper-btn-prev',
          nextEl: '#swiper-btn-next',
          enabled: true,
        }}
      >
        {isLoading
          ? Array.from({ length: 18 }).map((_, index) => (
              <SwiperSlide key={index} className='!w-auto'>
                <div className='animate-pulse bg-gray-300 rounded-[30px] w-[80px] h-[40px]'></div>
              </SwiperSlide>
            ))
          : categoriesPin.map((elem, index) => (
              <SwiperSlide key={elem.id} className='!w-auto'>
                <CategorySlide
                  elem={elem}
                  key={elem.id}
                  color={generateDarkColor(index)}
                />
              </SwiperSlide>
            ))}
      </Swiper>

      <button
        id='swiper-btn-next'
        className='rounded-full transition-colors justify-center items-center disabled:opacity-25 p-2.5 enabled:hover:bg-slate-200 hidden md:flex'
      >
        <ArrowLeftIcon classProps='rotate-180' />
      </button>
    </div>
  );
};

export default CardCategorySlider;
