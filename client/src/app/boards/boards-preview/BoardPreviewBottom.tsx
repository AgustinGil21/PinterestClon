import SingularOrPlural from '@/app/components/Basic/SingularOrPlural';
import Counter from '../../components/Basic/Counter';
import RelativeTime from '../../components/Basic/RelativeTime';

interface Props {
  createdAt: string | Date;
  pins: number;
  name: string;
}

const BoardPreviewBottom = ({ createdAt, pins, name }: Props) => {
  return (
    <footer className='w-full flex flex-col gap-[0.3rem] overflow-hidden cursor-default mt-3'>
      <h2 className='break-words text-[16px] font-semibold'>{name}</h2>
      <section className='flex gap-[0.7rem] text-[0.7rem]'>
        <div className='flex gap-1'>
          <Counter value={pins} />
          <SingularOrPlural
            props={{
              lang: 'es',
              value: pins,
              type: 'pins',
            }}
          />
        </div>
        <RelativeTime
          props={{ className: 'text-[#8d8d8d]', date: createdAt, lang: 'es' }}
        />
      </section>
    </footer>
  );
};

export default BoardPreviewBottom;
