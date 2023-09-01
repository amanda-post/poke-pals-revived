import { getFriends } from '~/app/(appRoutes)/friends/actions';
import FriendsList from '~/app/(appRoutes)/friends/components/FriendsList';

const Friends = async () => {
  const acceptedFriendships = await getFriends();

  return <FriendsList friends={acceptedFriendships} />;
};

export default Friends;
