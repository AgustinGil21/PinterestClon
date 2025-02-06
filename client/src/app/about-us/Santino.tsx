import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const Santino = () => {
  const { t } = useAppsStore();

  return (
    <div className='flex flex-col items-center text-center'>
      <Image
        className='w-32 h-32 object-cover bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-semibold'
        src='/steckler.jpg'
        alt='lucas-santino-steckler'
        width={100}
        height={100}
      />

      <h3 className='text-[20px] font-semibold mt-4'>
        {t?.['about-us'].santino.title || 'Lucas Santino Steckler'}
      </h3>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        {t?.['about-us'].santino.subtitle || 'Frontend Developer'}
      </p>

      <div className='flex gap-4 mt-3'>
        <a
          href='https://github.com/SSantinoSteckler'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900'
        >
          <FaGithub size={24} />
        </a>
        <a
          href='https://www.linkedin.com/in/lucas-santino-steckler-1821ab282/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-800'
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <blockquote className='mt-4 text-gray-500 dark:text-gray-400 italic text-sm max-w-[450px] mx-auto'>
        &quot;
        {t?.['about-us'].santino.quot ||
          `Desarrollar el frontend de este proyecto fue un desafío
        increíble. Aprender a estructurar la UI con eficiencia, aplicar
        una nueva arquitectura y a optimizar la experiencia del usuario. Fue una
        gran oportunidad para reforzar mis conocimientos en React, Next.js y
        Tailwind CSS.`}
        &quot;
      </blockquote>
    </div>
  );
};

export default Santino;
