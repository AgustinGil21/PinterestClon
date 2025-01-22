import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import CategorySlide from './CategorySlide';

const CardCategorySlider = () => {
  const { categoriesPin } = useAppsStore();
  const generateDarkColor = (index: number) => {
    const darkColors = ['#1A202C', '#2C3E50', '#2A2A72', '#3E2C41', '#4B5563'];
    return darkColors[index % darkColors.length];
  };
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView='auto'
      grabCursor={true}
    >
      {categoriesPin.map((elem, index) => (
        <SwiperSlide key={elem.id} className='!w-auto'>
          <CategorySlide
            elem={elem}
            key={elem.id}
            color={generateDarkColor(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardCategorySlider;
