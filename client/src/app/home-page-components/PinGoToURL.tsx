import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';

interface PinGoToURLInterface {
  url?: string;
}

export const PinGoToURL = ({ url }: PinGoToURLInterface) => {
  return (
    <a href={url} className=''>
      <ArrowUpRightIcon classProps='size-6' />
      <span>{url}</span>
    </a>
  );
};
