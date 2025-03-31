import { RefObject } from 'react';
import ModalStyled from '../interfaces/components/Basic/ModalStyled';
import { ShareComponent } from '../components/Basic/ShareComponent';

interface ModalShareAccountInterface {
  modalRef: RefObject<HTMLDivElement>;
  dataShare: string;
  classProps?: string;
}

const ModalShareAccount = ({
  modalRef,
  dataShare,
  classProps,
}: ModalShareAccountInterface) => {
  return (
    <ModalStyled
      modalRef={modalRef}
      classProps={`fixed min-h-[230px] sm:max-w-[390px] py-5 px-4 rounded-xl  ${classProps}`}
    >
      <ShareComponent data={dataShare} />
    </ModalStyled>
  );
};

export default ModalShareAccount;
