import { useRouter } from 'next/navigation';
import { PinInterface } from '../domain/types/pins-structure';
import { PinBodyControls } from './PinBodyControls';
import { AdultContentPreview } from './AdultContentPreview';

interface Props {
  elem: PinInterface;
}

export const PinBody = ({ elem }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    const fetchData = async () => {
      try {
        let pinId = String(elem.pin_id).trim();

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
    <article className={`card-top relative inline-block`}>
      {elem.adult_content && <AdultContentPreview pinID={elem.pin_id} />}

      <img
        src={elem.body}
        className={`card-body w-full h-60 object-cover ${
          elem.adult_content ? 'invisible' : ''
        }`}
        alt={elem.alt_text}
        onClick={handleClick}
      />
      {!elem.adult_content && <PinBodyControls elem={elem} />}
    </article>
  );
};
