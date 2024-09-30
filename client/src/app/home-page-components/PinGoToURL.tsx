import { ArrowUpRightIcon } from '../icons/ArrowUpRightIcon';

interface PinGoToURLInterface {
  url?: string;
}

export const PinGoToURL = ({ url }: PinGoToURLInterface) => {
  return (
    <a href={url} className='no-underline'>
      <ArrowUpRightIcon classProps='size-6' />
      <span className='hover:underline'>{url}</span>
    </a>
  );
};
