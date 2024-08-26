import { UserPublicData } from '@/app/domain/types';
import Image from 'next/image';

interface AvatarImageInterface {
  user: UserPublicData;
}

const AvatarImageLogIn = ({ user }: AvatarImageInterface) => {
  return (
    user.avatar && (
      <div className=' rounded-full w-[24px] h-[24px]  '>
        <Image
          src={user?.avatar}
          alt='avatar'
          className='h-full w-full object-cover rounded-full'
          width={100}
          height={100}
        />
      </div>
    )
  );
};

export default AvatarImageLogIn;
