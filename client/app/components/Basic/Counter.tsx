import { numberFormatter } from '../../libs/NumberFormatter';

interface Props {
  value: number | string;
  className?: string;
}

const Counter = ({ value, className }: Props) => {
  const formattedNumber = numberFormatter(Number(value));

  return <span className={className}>{formattedNumber}</span>;
};

export default Counter;
