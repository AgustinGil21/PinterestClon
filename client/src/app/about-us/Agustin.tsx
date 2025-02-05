import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Agustin = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Image
        className='w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full object-cover flex items-center justify-center text-lg font-semibold'
        src='/agustin-gil.jpg'
        alt='agustin-gil'
        width={100}
        height={100}
      />
      <h3 className='text-[20px] font-semibold mt-4'>Agustín Gil</h3>
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Backend/Frontend Developer
      </p>
      <div className='flex gap-4 mt-3'>
        <a
          href='https://github.com/AgustinGil21'
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-700 dark:text-gray-300 hover:text-gray-900'
        >
          <FaGithub size={24} />
        </a>
        <a
          href='https://www.linkedin.com/in/agustín-gil-470b44294'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-800'
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <blockquote className='mt-4 text-gray-500 dark:text-gray-400 italic text-sm max-w-[450px] mx-auto'>
        &quot;Este proyecto fue muy importante para mí porque gracias a él pude
        poner en práctica todo lo aprendido en Backend, Frontend y Figma. Siento
        que fué un paso arriesgado pero que todo el esfuerzo valió la pena ya
        que me ayudo a darme cuenta de lo que soy capaz. &quot;
      </blockquote>
    </div>
  );
};

export default Agustin;
