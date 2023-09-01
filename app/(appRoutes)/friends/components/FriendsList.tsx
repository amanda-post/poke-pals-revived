'use client';
import { Friends } from '~/app/(appRoutes)/friends/actions';

interface FriendsListProps {
  friends: Friends;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <>
      {friends.map((friend) => (
        <>{friend}</>
      ))}
    </>
  );
};

export default FriendsList;
