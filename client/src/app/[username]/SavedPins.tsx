import BoardsGrid from '../boards/boards-preview/BoardsGrid';
import { PinInterface } from '../domain/types/pins-structure';
import { Pin } from '../home-page-components/Pin';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Masonry from '../interfaces/components/Basic/Masonry';

export const SavedPins = () => {
  const { savedPins, userBoards } = useAppsStore();

  return (
    <section className='flex flex-col gap-5'>
      <BoardsGrid boards={userBoards} />
      <hr />
      <Masonry>
        {savedPins.map((pin: PinInterface) => (
          <Pin elem={pin} key={pin.pin_id} />
        ))}
      </Masonry>
    </section>
  );
};
