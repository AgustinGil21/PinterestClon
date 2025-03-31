import { Skeleton } from '../components/Basic/Skeleton';

export const CategoryCardSkeleton = () => {
  return (
    <Skeleton
      width={342}
      height={242}
      className='rounded-3xl'
      secondaryColor='#e2e8f0'
      color='#e5e7eb'
      animation='pulse'
      timingFunction='ease'
    />
  );
};
