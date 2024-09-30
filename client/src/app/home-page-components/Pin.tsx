import { PinInterface } from '../domain/types/pins-structure';
import { PinFooter } from './PinFooter';
import { PinTop } from './PinTop';

export const Pin = ({
  body,
  title,
  url,
  adult_content,
  pin_id,
  alt_text,
  name,
  surname,
  avatar,
  username,
  avatar_background,
  avatar_letter_color,
  avatar_letter,
}: PinInterface) => {
  return (
    <section
      className='flex flex-col p-0 m-0 w-[236px] break-before-avoid cursor-zoom-in'
      id={pin_id}
    >
      <PinTop body={body} url={url} alt_text={alt_text} />

      <PinFooter
        name={name}
        surname={surname}
        username={username}
        avatar_background={avatar_background}
        avatar_letter={avatar_letter}
        avatar_letter_color={avatar_letter_color}
        avatar={avatar}
        title={title}
      />
    </section>
  );
};
