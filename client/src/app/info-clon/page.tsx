'use client';
import Loader from '../interfaces/components/Basic/Loader';
import { useEffect, useState } from 'react';
import PinterestLogo from '../interfaces/components/icons/PinterestLogo';
import FaQ from './FaQ';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

const InfoClon = () => {
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
    <section className='flex flex-row w-full p-4 py-8 mb-[60px] md:mb-[30px] justify-center md:justify-start'>
      <div className='max-w-[500px] w-full lg:ml-[70px] flex flex-col gap-6 dark:text-white'>
        <div className='text-start flex justify-start items-start flex-col'>
          <div className='flex text-center flex-row-reverse gap-2'>
            <h2 className='text-[23px] font-semibold mb-2'>
              {t?.['info-clon'].title || 'Información sobre el Clon'}
            </h2>
            <PinterestLogo classProps='w-8 h-8' />
          </div>
          <p className='text-sm max-w-[480px]'>
            {t?.['info-clon'].description ||
              `Este clon de Pinterest fue desarrollado como proyecto de aprendizaje
            y estudio sin ningún fin económico redituable. Te permitirá
            descubrir, guardar y compartir imágenes inspiradoras. Explora una
            variedad de tableros creados por otros usuarios o sube tus propias
            ideas.`}
          </p>
        </div>

        <FaQ />
        <div>
          <h2 className='text-[22px] font-semibold text-black dark:text-white'>
            {t?.['info-clon']['main-features'].title ||
              'Características Principales'}
          </h2>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features'].search.title ||
                'Descubrimiento y Búsqueda'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features'].search.description ||
                `Encuentra imágenes, tableros y usuarios mediante un sistema de
              búsqueda avanzado con opciones de filtrado.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features'].search.list[0] ||
                  'Búsqueda inteligente basada en palabras clave y categorías.'}
              </li>
              <li>
                {t?.['info-clon']['main-features'].search.list[1] ||
                  'Filtros avanzados para buscar por usuarios, tableros y pines.'}
              </li>
              <li>
                {t?.['info-clon']['main-features'].search.list[2] ||
                  'Exploración de perfiles para descubrir contenido personalizado.'}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features']['boards-&-pins'].title ||
                'Pines y Tableros'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features']['boards-&-pins'].description ||
                `Guarda imágenes en tableros personalizados y organízalos a tu
              manera.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features']['boards-&-pins'].list[0] ||
                  'Creación de tableros con nombres y descripciones personalizadas.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['boards-&-pins'].list[1] ||
                  'Guardar pines en tableros de manera sencilla.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['boards-&-pins'].list[2] ||
                  'Edición y reubicación de pines dentro de tableros.'}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features']['creation-&-customization']
                .title || 'Creación y Personalización de Pines'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features']['creation-&-customization']
                .description ||
                `Personaliza los pines con imágenes, descripciones y enlaces
              externos.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features']['creation-&-customization']
                  .list[0] ||
                  'Sube imágenes desde tu dispositivo o enlázalas desde la web.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['creation-&-customization']
                  .list[1] || 'Agrega descripciones personalizadas a cada pin.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['creation-&-customization']
                  .list[2] || 'Edita o elimina pines según tus necesidades.'}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features']['social-interaction'].title ||
                'Interacción y Social'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features']['social-interaction']
                .description ||
                `Conéctate con la comunidad mediante comentarios, likes y
              compartiendo contenido.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features']['social-interaction']
                  .list[0] ||
                  'Dar me gusta a pines y comentarios de otros usuarios.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['social-interaction']
                  .list[1] ||
                  'Dejar comentarios en pines para interactuar con la comunidad.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['social-interaction']
                  .list[2] ||
                  'Compartir pines en redes sociales o mediante enlaces.'}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features']['privacy-&-safety'].title ||
                'Seguridad y Privacidad'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features']['privacy-&-safety']
                .description ||
                `Protegemos tu información y garantizamos que puedas administrar la
              visibilidad de tus tableros y pines. Puedes hacerlos privados o
              públicos según tus preferencias.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features']['privacy-&-safety']
                  .list[0] ||
                  'Configuración de privacidad en tableros y pines.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['privacy-&-safety']
                  .list[1] || 'Opción para ocultar tableros de otros usuarios.'}
              </li>
              <li>
                {t?.['info-clon']['main-features']['privacy-&-safety']
                  .list[2] ||
                  'Control total sobre los permisos de edición y visibilidad.'}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features']['translation-system'].title ||
                'Sistema de Traducciones'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features']['translation-system']
                .description ||
                `La plataforma cuenta con soporte para múltiples idiomas, lo que
              permite a los usuarios navegar en su idioma preferido.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features']['translation-system']
                  .list[0] || `Disponible en Español, Inglés y Portugués.`}
              </li>
              <li>
                {t?.['info-clon']['main-features']['translation-system']
                  .list[1] || `Interfaz completamente traducida.`}
              </li>
              <li>
                {t?.['info-clon']['main-features']['translation-system']
                  .list[2] ||
                  `Selección automática del idioma según la configuración del
                navegador.`}
              </li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              {t?.['info-clon']['main-features'].responsive.title ||
                'Diseño 100% Responsive'}
            </h3>
            <p className='text-sm max-w-[480px] mt-2'>
              {t?.['info-clon']['main-features'].responsive.description ||
                `La aplicación ha sido diseñada para ofrecer una experiencia fluida
              y optimizada en cualquier dispositivo.`}
            </p>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                {t?.['info-clon']['main-features'].responsive.list[0] ||
                  'Adaptado para celulares, tablets y pantallas de escritorio.'}
              </li>
              <li>
                {t?.['info-clon']['main-features'].responsive.list[1] ||
                  'Interfaz flexible que se ajusta a distintos tamaños de pantalla.'}
              </li>
              <li>
                {t?.['info-clon']['main-features'].responsive.list[2] ||
                  'Experiencia de usuario optimizada para navegación móvil.'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoClon;
