interface Props {
  className?: string;
  date: Date | string;
  lang?: 'es' | 'en' | 'pt';
}

interface RelativeTimeProps {
  props: Props;
}

const RelativeTime = ({ props }: RelativeTimeProps) => {
  const { date, className, lang = 'en' } = props;

  const now = new Date();

  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.round(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  if (isNaN(targetDate.getTime())) {
    return <span className={className}>Invalid date</span>;
  }

  let value: number;
  let unit: 'y' | 'mo' | 'w' | 'd' | 'h' | 'm' | 's';

  if (Math.abs(diffInSeconds) < 60) {
    value = diffInSeconds;
    unit = 's';
  } else if (Math.abs(diffInSeconds) < 3600) {
    value = Math.floor(diffInSeconds / 60);
    unit = 'm';
  } else if (Math.abs(diffInSeconds) < 86400) {
    value = Math.floor(diffInSeconds / 3600);
    unit = 'h';
  } else if (Math.abs(diffInSeconds) < 604800) {
    value = Math.floor(diffInSeconds / 86400);
    unit = 'd';
  } else if (Math.abs(diffInSeconds) < 2592000) {
    value = Math.floor(diffInSeconds / 604800);
    unit = 'w';
  } else if (Math.abs(diffInSeconds) < 31536000) {
    value = Math.floor(diffInSeconds / 2592000);
    unit = 'mo';
  } else {
    value = Math.floor(diffInSeconds / 31536000);
    unit = 'y';
  }

  const translations = {
    y: { en: `${value}y`, es: `${value} a`, pt: `${value} a` },
    mo: {
      en: `${value}mo`,
      es: `${value} ${value === 1 ? 'mes' : 'meses'}`,
      pt: `${value} ${value === 1 ? 'mês' : 'meses'}`,
    },
    w: { en: `${value}w`, es: `${value} sem.`, pt: `${value} sem` },
    d: { en: `${value}d`, es: `${value} d`, pt: `${value} d` },
    h: { en: `${value}h`, es: `${value} h`, pt: `${value} h` },
    m: { en: `${value}m`, es: `${value} min`, pt: `${value} min` },
    s: { en: 'Just now', es: `Ahora mismo`, pt: 'Agora mesmo' },
  };

  const formattedTime = translations[unit][lang];

  return <span className={className}>{formattedTime}</span>;
};

export default RelativeTime;
