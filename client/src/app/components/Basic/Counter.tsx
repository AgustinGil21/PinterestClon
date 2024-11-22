import { numberFormatter } from '@/app/libs/NumberFormatter';

interface Props {
  value: number | string;
  type: 'pins' | 'messages' | 'followers' | 'following' | 'likes' | 'comments';
  lang?: 'en' | 'es' | 'pt';
  className?: string;
  onClick?: () => void;
}

interface CounterProps {
  props: Props;
}

const Counter = ({ props }: CounterProps) => {
  const { value, type, lang = 'en', className, onClick } = props;

  const formattedNumber = numberFormatter(Number(value));

  let content;

  return <span className={className}>{content}</span>;
};

export default Counter;
