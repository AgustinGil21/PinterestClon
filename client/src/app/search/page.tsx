'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../interfaces/components/Basic/Loader';
import { PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { Pin } from '../home-page-components/Pin';
import Masonry from '../interfaces/components/Basic/Masonry';

const Search = () => {
  const {
    homePins,
    setPage,
    page,
    getSearchPinForCategory,
    value,
    getSearchPins,
    categorySelect,
    updateDataSearch,
  } = useAppsStore();
  const [loading, setLoading] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const limit = 25;

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(page);
    if (page === 1 || value.length === 0) return;
    getSearchPins(value, page, limit);
  }, [page]);

  useEffect(() => {
    console.log(page);
    if (page === 1 || categorySelect.length === 0) return;

    getSearchPinForCategory(categorySelect, page, limit);
  }, [page, categorySelect]);

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

  if (loading) {
    return (
      <section className='w-full flex justify-center '>
        <Loader />
      </section>
    );
  }

  return (
    <Masonry>
      {homePins.map((elem) => (
        <Pin elem={elem} key={elem.pin_id} />
      ))}
    </Masonry>
  );
};

export default Search;
