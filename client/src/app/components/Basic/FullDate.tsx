import { TLang } from '@/app/global-interfaces/global-interfaces';
import React from 'react';

interface FormattedDateProps {
  lang: TLang;
}

export const FullDate: React.FC<FormattedDateProps> = ({ lang }) => {
  const dayNow = new Date();

  const dayNumber = dayNow.getDate();
  const monthNumber = dayNow.getMonth();
  const yearNumber = dayNow.getFullYear();

  const monthNames = {
    es: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    pt: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
  };

  const monthName = monthNames[lang][monthNumber];

  const formatDate = () => {
    switch (lang) {
      case 'es':
        return `${dayNumber} de ${monthName} de ${yearNumber}`;
      case 'en':
        return `${monthName} ${dayNumber}, ${yearNumber}`;
      case 'pt':
        return `${dayNumber} de ${monthName} de ${yearNumber}`;
      default:
        return '';
    }
  };

  return <span>{formatDate()}</span>;
};
