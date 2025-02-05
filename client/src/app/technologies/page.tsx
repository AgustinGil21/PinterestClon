'use client';
import { useState } from 'react';
import Image from 'next/image';
import ImagesTecnologies from './ImagesTechnologies';
import SelectedImage from './SelectedImage';
import ImageNotion from './ImageNotion';

const TechProcess = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className='flex flex-row w-full p-4 py-8 mb-[50px]'>
      <div className='max-w-[500px] w-full lg:ml-[70px] flex flex-col gap-6 dark:text-white'>
        <div>
          <h2 className='text-[23px] font-semibold'>
            Tecnologías y Proceso de Desarrollo
          </h2>
          <p className='text-sm max-w-[480px]'>
            Desarrollamos el proyecto con un enfoque en las buenas prácticas de
            desarrollo, priorizando, modularidad. Se implementaron diferentes
            patrones y principios de diseño tanto en el frontend como en el
            backend para buscar garantizar un código limpio y estructurado.
          </p>
        </div>
        <ImagesTecnologies setSelectedImage={setSelectedImage} />

        <div>
          <h2 className='text-[22px] font-semibold text-black dark:text-white'>
            Gestión del Código y Colaboración
          </h2>
          <p className='text-sm max-w-[480px] mt-2'>
            Para asegurar un flujo de trabajo eficiente y estructurado,
            utilizamos herramientas de control de versiones y gestión de
            repositorios.
          </p>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Tecnologías Utilizadas
            </h3>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>
                Git para el control de versiones, facilitando el trabajo
                colaborativo y el manejo de cambios en el código.
              </li>
              <li>
                GitHub como plataforma de alojamiento del repositorio,
                permitiendo la gestión de ramas para el desarrollo del clon y el
                seguimiento del progreso del proyecto.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className='text-[22px] font-semibold text-black dark:text-white'>
            Frontend
          </h2>
          <p className='text-sm max-w-[480px] mt-2'>
            Para la construcción de la interfaz de usuario, se utilizaron
            tecnologías modernas enfocadas en la eficiencia y el rendimiento. Se
            aplicaron principios de programación funcional y una arquitectura
            escalable en capas.
          </p>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Tecnologías Utilizadas
            </h3>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>TypeScript para tipado estático y robustez del código.</li>
              <li>
                React.js como biblioteca principal para la construcción de
                componentes reutilizables.
              </li>
              <li>
                Next.js para la optimización del rendimiento con Server-Side
                Rendering (SSR) y Static Site Generation (SSG).
              </li>
              <li>
                Tailwind CSS para estilización rápida y diseño responsive.
              </li>
              <li>Zustand para una gestión de estado ligera y eficiente.</li>
              <li>Zod para validaciones de datos con enfoque tipado.</li>
              <li>
                React Hook Form para la gestión optimizada de formularios.
              </li>
              <li>Axios para el consumo eficiente de APIs.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className='text-[22px] font-semibold text-black dark:text-white'>
            Backend
          </h2>
          <p className='text-sm max-w-[480px] mt-2'>
            Para la lógica del servidor y la persistencia de datos, se optó por
            tecnologías confiables con un enfoque estructurado en la
            arquitectura MVC.
          </p>

          <div className='mt-4'>
            <h3 className='text-[18px] font-semibold text-black dark:text-white'>
              Tecnologías Utilizadas
            </h3>
            <ul className='text-sm list-disc pl-5 mt-2'>
              <li>JavaScript como lenguaje principal del backend.</li>
              <li>
                Express.js como framework ligero y rápido para la creación de
                API REST.
              </li>
              <li>
                PostgreSQL como base de datos relacional para almacenamiento
                estructurado y eficiente.
              </li>
            </ul>
          </div>
        </div>
        <ImageNotion setSelectedImage={setSelectedImage} />
      </div>

      {selectedImage && (
        <SelectedImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </section>
  );
};

export default TechProcess;
