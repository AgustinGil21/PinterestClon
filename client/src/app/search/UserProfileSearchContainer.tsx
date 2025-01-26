import { IUser } from './interfaces/user-interface';
import { UserProfileSearchCard } from './UserProfileSearchCard';

interface Props {
  users: IUser[];
}

export const UserProfileSearchContainer = ({ users }: Props) => {
  return (
    <ul className='w-full h-fit flex flex-col items-center'>
      {users.map((user: IUser) => (
        <UserProfileSearchCard user={user} />
      ))}
    </ul>
  );
};
