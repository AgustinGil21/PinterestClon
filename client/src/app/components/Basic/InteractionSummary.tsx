import { TInteraction, TLang } from '@/app/global-interfaces/global-interfaces';
import { numberFormatter } from '@/app/libs/NumberFormatter';
import SingularOrPlural from './SingularOrPlural';

interface Props {
  value: number | string;
  type: TInteraction;
  className?: string;
  numberFirst?: boolean;
  numberClassName?: string;
  textClassName?: string;
}

const InteractionSummary = ({
  value,
  type,
  className,
  numberFirst,
  numberClassName,
  textClassName,
}: Props) => {
  const formattedNumber = numberFormatter(value);

  return (
    <span className={className}>
      {numberFirst ? (
        <>
          <span className={numberClassName}>{formattedNumber}</span>
          <SingularOrPlural props={{ type, value, className: textClassName }} />
        </>
      ) : (
        <>
          <SingularOrPlural props={{ type, value, className: textClassName }} />
          <span className={numberClassName}>{formattedNumber}</span>
        </>
      )}
    </span>
  );
};

export default InteractionSummary;
