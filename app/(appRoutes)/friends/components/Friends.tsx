import { getFriends } from '~/app/(appRoutes)/friends/actions';
import AddFriend from '~/app/(appRoutes)/friends/components/AddFriend';
import FriendsList from '~/app/(appRoutes)/friends/components/FriendsList';

const Friends = async () => {
  const acceptedFriendships = await getFriends();

  return (
    <>
      <h1>Friends</h1>
      <AddFriend />
      <FriendsList friends={acceptedFriendships} />
    </>
  );
};

export default Friends;
