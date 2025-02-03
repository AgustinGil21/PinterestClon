import { useState } from 'react';
const FaQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: '¿Es necesario registrarse?',
      answer:
        'Sí, para poder guardar imágenes y crear tableros, necesitas una cuenta gratuita.',
    },
    {
      question: '¿Puedo subir mis propias imágenes?',
      answer:
        'Sí, puedes cargar imágenes y organizarlas en tableros según tus intereses.',
    },
    {
      question: '¿El uso es gratuito?',
      answer:
        'Sí, todas las funcionalidades del clon están disponibles de manera gratuita.',
    },
    {
      question: '¿Cómo edito mi perfil?',
      answer:
        'Puedes editar tu perfil desde la sección de ajustes, donde puedes cambiar tu foto, nombre y descripción.',
    },
    {
      question: '¿Se pueden descargar los pines?',
      answer:
        'Sí, cada pin tiene una opción para descargar la imagen a tu dispositivo.',
    },
    {
      question: '¿Cómo reporto contenido inapropiado?',
      answer:
        'Puedes reportar cualquier pin o comentario presionando el botón de reporte dentro del mismo.',
    },
  ];

  return (
    <div>
      <h2 className='text-[20px] font-semibold text-black dark:text-white'>
        Preguntas Frecuentes
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
