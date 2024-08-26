import Image from 'next/image';
import { UserPublicData } from '@/app/domain/types';

interface AvatarImageEditInterface {
  user: UserPublicData;
}

const AvatarImageEdit = ({ user }: AvatarImageEditInterface) => {
  return (
    <div className='rounded-full w-[62px] h-[62px] flex items-center justify-center relative overflow-hidden'>
      {user.avatar && (
        <Image
          src={user.avatar}
          alt='avatar'
          className='object-cover h-full w-full'
          fill
        />
      )}
    </div>
  );
};

export default AvatarImageEdit;
