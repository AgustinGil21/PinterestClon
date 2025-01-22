import { Skeleton } from '../components/Basic/Skeleton';
import { adjustColorBrightness } from '../libs/adjustColorBrightness';

export const CategorySlideSkeleton = ({ color }: { color: string }) => {
  return (
    <Skeleton
      borderRadius='30px'
      height={40}
      width={107}
      color={color}
      animation='pulse'
      secondaryColor={adjustColorBrightness(color, 20)}
    />
  );
};
