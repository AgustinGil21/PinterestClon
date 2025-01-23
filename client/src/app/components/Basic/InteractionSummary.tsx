import { TInteraction, TLang } from '@/app/global-interfaces/global-interfaces';
import { numberFormatter } from '@/app/libs/NumberFormatter';
import SingularOrPlural from './SingularOrPlural';

interface Props {
  value: number | string;
  type: TInteraction;
  lang?: TLang;
  className?: string;
  numberFirst?: boolean;
}

const InteractionSummary = ({
  value,
  type,
  lang = 'en',
  className,
  numberFirst,
}: Props) => {
  const formattedNumber = numberFormatter(value);

  return (
    <span className={className}>
      {numberFirst ? (
        <>
          <span>{formattedNumber}</span>
          <SingularOrPlural props={{ type, value }} />
        </>
      ) : (
        <>
          <SingularOrPlural props={{ type, value }} />
          <span>{formattedNumber}</span>
        </>
      )}
    </span>
  );
};

export default InteractionSummary;
