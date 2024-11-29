'use client';

import { useState } from 'react';
import Masonry from '@/app/interfaces/components/Basic/Masonry';
import CoverCard from './CoverCard';

interface BoardCover {
  id: string;
  body: string;
}

interface Props {
  pins: BoardCover[];
  results?: number;
  setCover: (body: string) => void;
}

const CoverList = ({ pins, setCover }: Props) => {
  const [selectedCard, setSelectedCard] = useState('');

  const handleSelect = (id: string, body: string) => {
    setSelectedCard(id);
    setCover(body);
  };

  return (
    <Masonry small className=''>
      {pins.map(({ body, id }) => (
        <CoverCard
          key={id}
          cover={body}
          isSelected={selectedCard === id}
          onSelect={() => handleSelect(id, body)}
        />
      ))}
    </Masonry>
  );
};

export default CoverList;
