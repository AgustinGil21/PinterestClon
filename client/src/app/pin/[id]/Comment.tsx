import AvatarUser from '@/app/interfaces/layout/Header/Avatar/AvatarUser';
import RelativeTime from '@/app/components/Basic/RelativeTime';
import { CommentTextExtend } from './CommentTextExtend';
import Counter from '@/app/components/Basic/Counter';
import LikeIcon from '@/app/interfaces/components/icons/LikeIcon';
import { CommentInterface } from '@/app/domain/types/pins-structure';

interface CommentProps {
  elem: CommentInterface;
}

const Comment = ({ elem }: CommentProps) => {
  return (
    <div className='flex flex-row gap-2 mt-1 h-full'>
      <AvatarUser
        textSize='text-xs'
        data={elem}
        classProps='max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] w-full h-full object-cover rounded-full'
      />
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h5 className='text-nowrap font-semibold text-[13px] flex flex-row items-center gap-1.5'>
            {elem.username}
            <RelativeTime
              props={{
                date: elem.created_at,
                lang: 'es',
                className: 'text-[#b3b3b3] text-[11px]',
              }}
            />
          </h5>
          <CommentTextExtend text={elem.content} />
        </div>
        <div className='flex flex-row gap-2  items-center'>
          <span className='text-[#b3b3b3] text-[11px] font-semibold cursor-pointer'>
            Responder
          </span>
          <div className='flex flex-row-reverse gap-1 items-center'>
            {elem.likes_count !== '0' && (
              <Counter
                value={Number(elem.likes_count) || 0}
                className='text-black text-[12px]'
              />
            )}

            <LikeIcon classProps='w-[12px] h-[12px] cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
