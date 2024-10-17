'use client';
import { useEffect, useState } from 'react';
import { useAppsStore } from './infrastructure/stores/useAppStore';
import { Pin } from './home-page-components/Pin';
import Loader from './interfaces/components/Basic/Loader';
import { PinInterface } from './domain/types/pins-structure';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0); // Para rastrear la posición anterior del scroll

  const limit = 25;

  const {
    page,
    setPage,
    homePins,
    getHomePins,
    previousPin,
    isHeaderLoaded,
    setIsHeaderLoaded,
    updateDataSearch,
  } = useAppsStore();

  useEffect(() => {
    if (page === 1) return;
    updateDataSearch('page', 1);
  }, []);

  useEffect(() => {
    if (isHeaderLoaded) {
      const fetchPins = async () => {
        await getHomePins(page, limit);

        setIsHeaderLoaded(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };

      fetchPins();
    }
  }, [page, previousPin, isHeaderLoaded]);

  const handleScroll = () => {
    const currentScrollTop = window.scrollY; // Obtener la posición actual del scroll

    // Comprobar si el usuario ha hecho scroll hacia abajo
    if (currentScrollTop > lastScrollTop) {
      if (
        window.innerHeight + currentScrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage(1); // Incrementar la página en 1
      }
    }

    // Actualizar la posición del scroll anterior
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]); // Agregar lastScrollTop como dependencia

  if (isHeaderLoaded && isLoading) {
    return (
      <section className='w-full flex justify-center items-center flex-col my-[20px] '>
        <div className=' max-w-[400px] flex justify-center flex-col items-center'>
          <Loader />
          <p className='text-center font-bold text-2xl   mt-2'>
            ¡Estamos agregando nuevas ideas a tu feed de inicio!
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
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
    </>
  );
}
