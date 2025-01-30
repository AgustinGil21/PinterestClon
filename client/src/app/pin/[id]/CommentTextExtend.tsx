'use client';

import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { useState } from 'react';

interface CommentTextExtendInterface {
  text: string;
  classProps?: string;
}

export const CommentTextExtend = ({
  text,
  classProps,
}: CommentTextExtendInterface) => {
  const { t } = useAppsStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (text?.length <= 100) {
    return <p className={`text-sm break-words ${classProps}`}>{text}</p>;
  }

  return (
    <p className={`text-sm break-words ${classProps}`}>
      {isExpanded ? text : `${text?.substring(0, 100)}...`}{' '}
      <button
        className='text-blue-500 hover:underline'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded
          ? t?.comment['show-less'] || 'Ver menos'
          : t?.comment['show-more'] || 'Ver más'}
      </button>
    </p>
  );
};
