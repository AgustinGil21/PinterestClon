'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';

const Search = () => {
  const { homePins } = useAppsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <section className='masonry'>
      {homePins.map(
        ({
          name,
          surname,
          pin_id,
          username,
          avatar,
          body,
          title,
          alt_text,
          adult_content,
          url,
          avatar_background,
          avatar_letter_color,
          avatar_letter,
        }: PinInterface) => (
          <Pin
            key={pin_id}
            pin_id={pin_id}
            name={name}
            surname={surname}
            username={username}
            avatar={avatar}
            body={body}
            title={title}
            alt_text={alt_text}
            adult_content={adult_content}
            url={url}
            avatar_background={avatar_background}
            avatar_letter_color={avatar_letter_color}
            avatar_letter={avatar_letter}
          />
        )
      )}
    </section>
  );
};

export default Search;
