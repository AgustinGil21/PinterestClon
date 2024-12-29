import { useDynamicModalPosition } from '@/app/hooks/useDynamicModalPosition';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  parentPadding?: number;
}

export const DynamicModal = ({ btnRef, parentPadding = 8 }: Props) => {
  const { left, top, bottom, right } = useDynamicModalPosition({
    btnRef,
    parentPadding,
  });

  const paddingClass = `${parentPadding}px`;

  const modalPositionClass = `
    absolute 
    ${top ? 'top-[-8px] left-1/2 transform -translate-x-1/2' : ''}
    ${bottom ? 'top-[calc(100%+8px)] left-1/2 transform -translate-x-1/2' : ''}
    ${right ? 'top-1/2 left-[calc(100%+8px)] transform -translate-y-1/2' : ''}
    ${left ? 'top-1/2 right-[calc(100%+8px)] transform -translate-y-1/2' : ''}
  `;
};
