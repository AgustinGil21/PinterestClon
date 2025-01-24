import AvatarUser from '../interfaces/layout/Header/Avatar/AvatarUser';

interface IUser {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  following?: boolean;
  followers_count: string;
  avatar?: string;
  avatar_background: string;
  avatar_letter: string;
  avatar_letter_color: string;
}

interface Props {
  user: IUser;
}

export const UserPreview = ({ user }: Props) => {
  return <section></section>;
};
