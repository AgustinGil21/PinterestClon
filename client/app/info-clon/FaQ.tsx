import { useState } from 'react';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
const FaQ = () => {
  const { t } = useAppsStore();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question:
        t?.['info-clon'].faqs[0].question || '¿Es necesario registrarse?',
      answer:
        t?.['info-clon'].faqs[0].answer ||
        'Sí, para poder guardar imágenes y crear tableros, necesitas una cuenta gratuita.',
    },
    {
      question:
        t?.['info-clon'].faqs[1].question ||
        '¿Puedo subir mis propias imágenes?',
      answer:
        t?.['info-clon'].faqs[1].answer ||
        'Sí, puedes cargar imágenes y organizarlas en tableros según tus intereses.',
    },
    {
      question: t?.['info-clon'].faqs[2].question || '¿El uso es gratuito?',
      answer:
        t?.['info-clon'].faqs[2].answer ||
        'Sí, todas las funcionalidades del clon están disponibles de manera gratuita.',
    },
    {
      question: t?.['info-clon'].faqs[3].question || '¿Cómo edito mi perfil?',
      answer:
        t?.['info-clon'].faqs[3].answer ||
        'Puedes editar tu perfil desde la sección de ajustes, donde puedes cambiar tu foto, nombre y descripción.',
    },
    {
      question:
        t?.['info-clon'].faqs[4].question || '¿Se pueden descargar los pines?',
      answer:
        t?.['info-clon'].faqs[4].answer ||
        'Sí, cada pin tiene una opción para descargar la imagen a tu dispositivo.',
    },
    {
      question:
        t?.['info-clon'].faqs[5].question ||
        '¿Cómo reporto contenido inapropiado?',
      answer:
        t?.['info-clon'].faqs[5].answer ||
        'Puedes reportar cualquier pin o comentario presionando el botón de reporte dentro del mismo.',
    },
    {
      question:
        t?.['info-clon'].faqs[6].question || '¿Mis datos están seguros?',
      answer:
        t?.['info-clon'].faqs[6].answer ||
        'Si, tus datos fueron encriptados antes de ser almacenados en la base de datos.',
    },
  ];

  return (
    <div>
      <h2 className='text-[20px] font-semibold text-black dark:text-white'>
        {t?.['info-clon'].frequent || 'Preguntas Frecuentes'}
      </h2>
      <div className='mt-2 space-y-2'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='border-b border-gray-300 dark:border-gray-600'
          >
            <button
              className='w-full text-left flex justify-between items-center py-3 focus:outline-none'
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span className='text-sm font-medium'>{faq.question}</span>
              <span className='text-lg'>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className='text-sm text-gray-600 dark:text-gray-300 pb-3'>
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaQ;
