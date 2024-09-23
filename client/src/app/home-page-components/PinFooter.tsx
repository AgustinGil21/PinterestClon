import { UserPreview } from './UserPreview';

interface PinFooterInterface {
  title?: string;
  avatar?: string;
  username: string;
  avatar_background: string;
  avatar_letter_color: string;
  avatar_letter: string;
  name?: string | null;
  surname?: string | null;
  footerClassProps?: string;
}

export const PinFooter = ({
  title,
  avatar,
  username,
  avatar_background,
  avatar_letter_color,
  avatar_letter,
  name,
  surname,
  footerClassProps,
}: PinFooterInterface) => {
  return (
    <footer className={`card-bottom ${footerClassProps}`}>
      {title && <strong>{title}</strong>}
      <UserPreview
        avatar={avatar}
        username={username}
        avatar_background={avatar_background}
        avatar_letter_color={avatar_letter_color}
        avatar_letter={avatar_letter}
        name={name}
        surname={surname}
      />
    </footer>
  );
};
