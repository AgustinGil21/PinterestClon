'use client';
import { useEffect, useState } from 'react';
import { useAppsStore } from './infrastructure/stores/useAppStore';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pins, setPins] = useState([]);
  const limit = 25;

  const [homePins, getHomePins] = useAppsStore((state) => [
    state.homePins,
    state.getHomePins,
  ]);

  useEffect(() => {
    getHomePins(page, limit);
    setPins(homePins);
  }, [page]);

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

    window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section>
      {pins.map((pin, index) => (
        <div key={index}></div>
      ))}
    </section>
  );
}
