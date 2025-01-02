import { useState } from 'react';

interface CommentTextExtendInterface {
  text: string;
}

export const CommentTextExtend = ({ text }: CommentTextExtendInterface) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= 100) {
    return <p className='text-sm break-words'>{text}</p>;
  }

  return (
    <p className='text-sm break-words'>
      {isExpanded ? text : `${text.substring(0, 100)}...`}{' '}
      <button
        className='text-blue-500 hover:underline'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Ver menos' : 'Ver más'}
      </button>
    </p>
  );
};
