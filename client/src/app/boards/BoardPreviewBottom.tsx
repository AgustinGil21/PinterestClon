import Counter from '../components/Basic/Counter';
import RelativeTime from '../components/Basic/RelativeTime';

const BoardPreviewBottom = () => {
  let pins_count = 90898;
  let created_at = new Date();

  return (
    <footer className='w-[247.6] flex flex-col g-[0.3rem] overflow-hidden cursor-default mt-4'>
      <h2 className='break-words text-[1.4rem]'>
        Fútbol dnajndanda dada dadada dasda dadd
      </h2>
      <section className='flex g-[0.7rem]'>
        <Counter
          props={{ value: pins_count, type: 'pins', lang: 'es', className: '' }}
        />
        <RelativeTime
          props={{ className: 'text-[#8d8d8d]', date: created_at, lang: 'es' }}
        />
      </section>
    </footer>
  );
};
