import { CustomDate } from '../../domain/types/boards-interface';
import RelativeTime from '../../components/Basic/RelativeTime';
import InteractionSummary from '../../components/Basic/InteractionSummary';

interface Props {
  createdAt: CustomDate;
  pins: number | string;
  name: string;
}

const BoardPreviewBottom = ({ createdAt, pins, name }: Props) => {
  return (
    <footer className='w-full flex flex-col gap-[0.1rem] overflow-hidden cursor-default mt-1'>
      <h2 className='break-words text-[16px] font-semibold'>{name}</h2>
      <section className='flex gap-[0.7rem] text-[0.7rem]'>
        <InteractionSummary
          value={pins}
          type='pins'
          numberFirst
          sentenceCase
          className='flex gap-1 text-[#8d8d8d]'
        />
        <RelativeTime
          props={{ className: 'text-[#8d8d8d]', date: createdAt }}
        />
      </section>
    </footer>
  );
};

export default BoardPreviewBottom;
