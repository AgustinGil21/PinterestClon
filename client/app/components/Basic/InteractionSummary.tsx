import { TInteraction, TLang } from '../../global-interfaces/global-interfaces';
import { numberFormatter } from '../../libs/NumberFormatter';
import SingularOrPlural from './SingularOrPlural';

interface Props {
  value: number | string;
  type: TInteraction;
  className?: string;
  numberFirst?: boolean;
  numberClassName?: string;
  textClassName?: string;
  sentenceCase?: boolean;
}

const InteractionSummary = ({
  value,
  type,
  className,
  numberFirst,
  numberClassName,
  textClassName,
  sentenceCase,
}: Props) => {
  const formattedNumber = numberFormatter(value);

  return (
    <span className={className}>
      {numberFirst ? (
        <>
          <span className={numberClassName}>{formattedNumber}</span>
          <SingularOrPlural
            props={{ type, value, className: textClassName, sentenceCase }}
          />
        </>
      ) : (
        <>
          <SingularOrPlural
            props={{ type, value, className: textClassName, sentenceCase }}
          />
          <span className={numberClassName}>{formattedNumber}</span>
        </>
      )}
    </span>
  );
};

export default InteractionSummary;
