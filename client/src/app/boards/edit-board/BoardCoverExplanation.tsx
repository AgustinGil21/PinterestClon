import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import { BoardCoverCard } from './BoardCoverCard';

export const BoardCoverExplanation = () => {
  const { t } = useAppsStore();

  return (
    <section className='flex gap-3 justify-between w-full'>
      <BoardCoverCard />
      <article className='w-full'>
        <h3 className='font-semibold text-xs'>
          {t?.board.edit['covers-modal']['cover-explanation'].title ||
            'Portada del Tablero'}
        </h3>
        <p className='text-xs mt-1 text-gray-500'>
          {t?.board.edit['covers-modal']['cover-explanation'].description ||
            'Selecciona un pin para establecerlo como la portada del tablero. Podrás cambiarlo más adelante, pero no eliminarlo.'}
        </p>
      </article>
    </section>
  );
};
