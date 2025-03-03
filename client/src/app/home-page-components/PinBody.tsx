import { useRouter } from 'next/navigation';
import { PinInterface } from '../domain/types/pins-structure';
import { PinBodyControls } from './PinBodyControls';
import { AdultContentPreview } from './AdultContentPreview';
import { MobileSavePinButtonsController } from './MobileSavePinButtonsController';
import { useGetScreenSize } from '../hooks/useGetScreenSize';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface Props {
  elem: PinInterface;
}

export const PinBody = ({ elem }: Props) => {
  const router = useRouter();
  const {
    closeMobilePinController,
    mobileControllerPinID,
    mobileControllerBtnCenterIsHovered,
  } = useAppsStore();
  const { width } = useGetScreenSize();
  let pinId = String(elem.pin_id).trim();

  const handleClick = () => {
    closeMobilePinController();
    const fetchData = async () => {
      try {
        if (!pinId.startsWith('http')) {
          pinId = `/${pinId}`;
        }

        if (pinId.includes('pin')) {
          router.push(pinId);
        } else {
          router.push(`/pin/${pinId}`);
        }
      } catch (error) {
        return null;
      }
    };
    fetchData();
  };

  return (
    <article className={` card-top relative inline-block`}>
      {elem.adult_content && <AdultContentPreview pinID={elem.pin_id} />}
      <MobileSavePinButtonsController href={`/pin/${pinId}`} pinID={pinId}>
        <img
          src={elem.body}
          className={`card-body transition-all w-full h-60 object-cover ${
            elem.adult_content ? 'invisible' : ''
          } ${
            !elem.adult_content &&
            mobileControllerBtnCenterIsHovered &&
            mobileControllerPinID === elem.pin_id
              ? 'z-[100] brightness-0'
              : ''
          }`}
          alt={elem.alt_text}
          onClick={handleClick}
        />
      </MobileSavePinButtonsController>
      {!elem.adult_content && width > 768 && <PinBodyControls elem={elem} />}
    </article>
  );
};
