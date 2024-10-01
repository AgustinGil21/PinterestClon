type ShortDate = {
  value: number;
  type: DateType;
};

const enum DateType {
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  MONTHS,
  YEARS,
}

const translations = {
  [DateType.SECONDS]: {
    es: 'segundo',
    pt: 'segundo',
    en: 'second',
  },
  [DateType.MINUTES]: {
    es: 'minuto',
    pt: 'minuto',
    en: 'minute',
  },
  [DateType.HOURS]: {
    es: 'hora',
    pt: 'hora',
    en: 'hour',
  },
  [DateType.DAYS]: {
    es: 'día',
    pt: 'dia',
    en: 'day',
  },
  [DateType.MONTHS]: {
    es: 'mes',
    pt: 'mês',
    en: 'month',
  },
  [DateType.YEARS]: {
    es: 'año',
    pt: 'ano',
    en: 'year',
  },
};

const shortDateObject = (date: Date): ShortDate | -1 => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return -1;

  const getMillisecondsUserDate = date.getTime();
  const getMillisecondsNow = new Date().getTime();
  const getMilliseconds = getMillisecondsNow - getMillisecondsUserDate;

  const getSeconds = Math.floor(getMilliseconds / 1000);
  const getMinutes = Math.floor(getSeconds / 60);
  const getHours = Math.floor(getMinutes / 60);
  const getDays = Math.floor(getHours / 24);
  const getMonths = Math.floor(getDays / 30);
  const getYears = Math.floor(getMonths / 12);

  if (getYears > 0) {
    return { value: getYears, type: DateType.YEARS };
  } else if (getMonths > 0) {
    return { value: getMonths, type: DateType.MONTHS };
  } else if (getDays > 0) {
    return { value: getDays, type: DateType.DAYS };
  } else if (getHours > 0) {
    return { value: getHours, type: DateType.HOURS };
  } else if (getMinutes > 0) {
    return { value: getMinutes, type: DateType.MINUTES };
  } else {
    return { value: getSeconds, type: DateType.SECONDS };
  }
};

const shortDate = (date: Date, lang: 'es' | 'pt' | 'en' = 'en'): string => {
  const dateObject = shortDateObject(date);

  if (dateObject === -1) {
    throw new Error('Invalid date!');
  }

  const translation = translations[dateObject.type][lang];
  const value = dateObject.value;

  // Determinar si usar singular o plural,
  // solamente válido para algunas palabras
  let finalTranslation = value === 1 ? translation : `${translation}s`;

  // Ajuste para las palabras en español
  // y portugués de los meses
  if (dateObject.type === DateType.MONTHS && lang === 'es') {
    finalTranslation = value === 1 ? 'mes' : 'meses';
  }
  if (dateObject.type === DateType.MONTHS && lang === 'pt') {
    finalTranslation = value === 1 ? 'mês' : 'meses';
  }

  return `${value} ${finalTranslation}`;
};
