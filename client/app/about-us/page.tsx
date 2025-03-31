'use client';

import Loader from '../interfaces/components/Basic/Loader';
import { useState, useEffect } from 'react';
import Agustin from './Agustin';
import Santino from './Santino';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const AboutUs = () => {
  const { t } = useAppsStore();
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
        <h2 className='text-[26px] font-semibold'>
          {t?.['about-us'].title || 'Sobre Nosotros'}
        </h2>
        <p className='text-sm max-w-[800px] mx-auto'>
          {t?.['about-us'].description[0] || 'Somos un equipo de'}{' '}
          <strong>
            {t?.['about-us'].description[1] ||
              'desarrolladores trainee en formación de 18 y 20 años'}
          </strong>
          {t?.['about-us'].description[2] ||
            ', apasionados por la tecnología y comprometidos con ofrecer'}
          <strong>
            {t?.['about-us'].description[3] ||
              ' experiencias de usuario excepcionales'}
            .
          </strong>{' '}
          {t?.['about-us'].description[4] ||
            `Para llevar a cabo este clon de Pinterest, combinamos nuestras
          habilidades y adquirimos nuevos conocimientos en diversas áreas,
          aplicando `}
          <strong>
            {t?.['about-us'].description[5] ||
              ' buenas prácticas de desarrollo '}
          </strong>
          .
        </p>

        <h3 className='text-[22px] font-semibold mt-6'>
          {t?.['about-us']['our-philosophy'].title || 'Nuestra Filosofía'}
        </h3>
        <p className='text-sm max-w-[700px] mx-auto'>
          {t?.['about-us']['our-philosophy'].description[0] ||
            'Creemos en el poder del '}
          <strong>
            {t?.['about-us']['our-philosophy'].description[1] ||
              'aprendizaje continuo'}
          </strong>{' '}
          {t?.['about-us']['our-philosophy'].description[2] ||
            `y la colaboración para construir soluciones tecnológicas innovadoras.
          Buscamos mejorar nuestras habilidades cada día y aplicar las mejores
          prácticas en desarrollo, priorizando la calidad, la accesibilidad y la
          eficiencia en cada proyecto.`}
        </p>

        <div className='flex flex-col gap-10 mt-4 md:flex-row '>
          <Santino />
          <Agustin />
        </div>
        <h3 className='text-[22px] font-semibold mt-6'>
          {t?.['about-us']['whats-next'].title || '¿Que sigue?'}
        </h3>
        <p className='text-sm max-w-[700px] mx-auto'>
          {t?.['about-us']['whats-next'].description ||
            `Una etapa de nuestras vidas esta cerrada, por ende tenemos que seguir
          adelante con nuevos proyectos que nos pongan a prueba. Este clon será
          actualizado periódicamente con el objetivo de ir agregando
          funcionalidades que lo acerquen cada vez mas al producto original.
          Pero nuestro enfoque principal va a ser el desarrollo de nuestra
          primera App para mobiles y otros proyectos que vayan surgiendo, los
          cuales serán mas ambiciosos y únicos.`}
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
