import { PinInterface } from '../domain/types/pins-structure';
import { PinFooter } from './PinFooter';

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
    <section className='card' key={pin_id}>
      <article className='card-top'>
        <img src={body} className='card-body' alt={alt_text} />
      </article>

      <PinFooter
        name={name}
        surname={surname}
        username={username}
        avatar_background={avatar_background}
        avatar_letter={avatar_letter}
        avatar_letter_color={avatar_letter_color}
        avatar={avatar}
        title={title}
        url={url}
      />
    </section>
  );
};
