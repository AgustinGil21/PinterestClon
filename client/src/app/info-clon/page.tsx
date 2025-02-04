'use client';
import Loader from '../interfaces/components/Basic/Loader';
import { useEffect, useState } from 'react';
import PinterestLogo from '../interfaces/components/icons/PinterestLogo';
import FaQ from './FaQ';

const InfoClon = () => {
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
    <section className='flex flex-row w-full p-4 py-8 mb-[60px] md:mb-[30px] '>
      <div className='max-w-[500px] w-full lg:ml-[70px] flex flex-col gap-6 dark:text-white'>
        <div className='text-start flex justify-start items-start flex-col'>
          <div className='flex text-center flex-row-reverse gap-2'>
            <h2 className='text-[23px] font-semibold '>
              Información sobre el Clon
            </h2>
            <PinterestLogo classProps='w-8 h-8' />
          </div>
          <p className='text-sm max-w-[480px]'>
            Este clon de Pinterest fue desarrollado como proyecto de aprendizaje
            y estudio sin ningún fin económico redituable. Te permitirá
            descubrir, guardar y compartir imágenes inspiradoras. Explora una
            variedad de tableros creados por otros usuarios o sube tus propias
            ideas.
          </p>
        </div>

        <FaQ />
        <div>
          <h2 className='text-[22px] font-semibold text-black dark:text-white'>
            Características Principales
          </h2>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Descubrimiento y Búsqueda
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              Encuentra imágenes, tableros y usuarios mediante un sistema de
              búsqueda avanzado con opciones de filtrado.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                Búsqueda inteligente basada en palabras clave y categorías.
              </li>
              <li>
                Filtros avanzados para buscar por usuarios, tableros y pines.
              </li>
              <li>
                Exploración de perfiles para descubrir contenido personalizado.
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Pines y Tableros
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              Guarda imágenes en tableros personalizados y organízalos a tu
              manera.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                Creación de tableros con nombres y descripciones personalizadas.
              </li>
              <li>Guardar pines en tableros de manera sencilla.</li>
              <li>Edición y reubicación de pines dentro de tableros.</li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Creación y Personalización de Pines
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              Personaliza los pines con imágenes, descripciones y enlaces
              externos.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                Sube imágenes desde tu dispositivo o enlázalas desde la web.
              </li>
              <li>Agrega descripciones personalizadas a cada pin.</li>
              <li>Edita o elimina pines según tus necesidades.</li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Interacción y Social
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              Conéctate con la comunidad mediante comentarios, likes y
              compartiendo contenido.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>Dar me gusta a pines y comentarios de otros usuarios.</li>
              <li>
                Dejar comentarios en pines para interactuar con la comunidad.
              </li>
              <li>Compartir pines en redes sociales o mediante enlaces.</li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Seguridad y Privacidad
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              Protegemos tu información y garantizamos que puedas administrar la
              visibilidad de tus tableros y pines. Puedes hacerlos privados o
              públicos según tus preferencias.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>Configuración de privacidad en tableros y pines.</li>
              <li>Opción para ocultar tableros de otros usuarios.</li>
              <li>
                Control total sobre los permisos de edición y visibilidad.
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Sistema de Traducciones
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              La plataforma cuenta con soporte para múltiples idiomas, lo que
              permite a los usuarios navegar en su idioma preferido.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>Disponible en Español, Inglés y Portugués.</li>
              <li>Interfaz completamente traducida.</li>
              <li>
                Selección automática del idioma según la configuración del
                navegador.
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Diseño 100% Responsive
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              La aplicación ha sido diseñada para ofrecer una experiencia fluida
              y optimizada en cualquier dispositivo.
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                Adaptado para celulares, tablets y pantallas de escritorio.
              </li>
              <li>
                Interfaz flexible que se ajusta a distintos tamaños de pantalla.
              </li>
              <li>Experiencia de usuario optimizada para navegación móvil.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoClon;
