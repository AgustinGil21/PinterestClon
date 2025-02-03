'use client';
import { usePathname } from 'next/navigation';
import LinkNavigate from '../components/Header/LinkNavigate';

const InfoClon = () => {
  const pathname = usePathname();

  return (
    <section className='flex flex-row w-full p-3'>
      <div className='w-full'>hola 2</div>
    </section>
  );
};

export default InfoClon;
