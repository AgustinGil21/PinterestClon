import { useRef, useState } from 'react';
import { IButtonsPinSaved, PinInterface } from '../domain/types/pins-structure';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import { SavePinBtn } from './SavePinBtn';
import { SavePinToBoardBtn } from './SavePinToBoardBtn';

export const PinBodyControlsTop = ({ elem }: { elem: PinInterface }) => {
  const { dynamicModalIsOpen, btnRef: btnRefStore } = useAppsStore();

  const btnRef = useRef(null);
  const [saved, setSaved] = useState<IButtonsPinSaved>({
    alreadySaved: !!(elem.saved_in_profile || elem.board?.id),
    board: elem.board,
    savedInProfile: elem.saved_in_profile,
  });

  const handleSave = (object: IButtonsPinSaved) => {
    setSaved(object);
  };

  return (
    <article
      className={`top flex justify-between mt-2 ${
        dynamicModalIsOpen && btnRefStore === btnRef
          ? 'card-controls-modal-open'
          : 'card-controls'
      }`}
    >
      <SavePinBtn
        pinId={elem.pin_id}
        alreadySaved={!!(elem.saved_in_profile || elem.board?.id)}
        savedInProfile={elem.saved_in_profile}
        board={elem.board}
        saved={saved}
        setSaved={handleSave}
      />
      <SavePinToBoardBtn
        pinBody={elem.body}
        pinId={elem.pin_id}
        btnRef={btnRef}
        board={elem.board}
        savedInProfile={elem.saved_in_profile}
        saved={saved}
        setSaved={handleSave}
      />
    </article>
  );
};
