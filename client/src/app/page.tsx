'use client';
import { useEffect, useState } from 'react';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { Pin } from './home-page-components/Pin';
import Loader from './interfaces/components/Basic/Loader';
import { PinInterface } from './domain/types/pins-structure';

export default function Home() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 25;

  const { homePins, getHomePins, previousPin } = useAppsStore();

  useEffect(() => {
    const fetchPins = async () => {
      setIsLoading(true);
      await getHomePins(page, limit);
      setIsLoading(false);
    };

    fetchPins();
  }, [page, previousPin]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isLoading ? (
        <section className='w-full flex justify-center'>
          <Loader />
        </section>
      ) : (
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
      )}
    </>
  );
}
