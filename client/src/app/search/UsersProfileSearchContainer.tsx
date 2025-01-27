import {
  ISingleUserProfileCard,
  IUsersProfileCard,
} from '../domain/types/data-users';
import { IUser } from './interfaces/user-interface';
import { UserProfileSearchCard } from './UserProfileSearchCard';

interface Props {
  users: IUsersProfileCard | [];
}

export const UsersProfileSearchContainer = ({ users }: Props) => {
  return (
    <ul className='w-full h-fit flex flex-col items-center'>
      {users.map((user: ISingleUserProfileCard) => (
        <UserProfileSearchCard user={user} key={user.id} />
      ))}
    </ul>
  );
};
