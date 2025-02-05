'use client';

import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect } from 'react';
import Agustin from './Agustin';
import Santino from './Santino';

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading) {
    return (
      <section className='w-full flex justify-center absolute right-[-10px] '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='flex flex-col w-full p-6 py-10 mb-8 dark:text-white'>
      <div className='max-w-[700px] w-full flex flex-col gap-4 lg:ml-[70px]'>
        <h2 className='text-[26px] font-semibold'>Sobre Nosotros</h2>
        <p className='text-sm max-w-[800px] mx-auto'>
          Somos un equipo de{' '}
          <strong>desarrolladores trainee en formación de 18 y 20 años</strong>,
          apasionados por la tecnología y comprometidos con ofrecer
          <strong> experiencias de usuario excepcionales</strong>. Para llevar a
          cabo este clon de Pinterest, combinamos nuestras habilidades y
          adquirimos nuevos conocimientos en diversas áreas, aplicando{' '}
          <strong> buenas prácticas de desarrollo </strong>.
        </p>

        <h3 className='text-[22px] font-semibold mt-6'>Nuestra Filosofía</h3>
        <p className='text-sm max-w-[700px] mx-auto'>
          Creemos en el poder del <strong>aprendizaje continuo</strong> y la
          colaboración para construir soluciones tecnológicas innovadoras.
          Buscamos mejorar nuestras habilidades cada día y aplicar las mejores
          prácticas en desarrollo, priorizando la calidad, la accesibilidad y la
          eficiencia en cada proyecto.
        </p>

        <div className='flex flex-col gap-10 mt-4 md:flex-row '>
          <Santino />
          <Agustin />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
