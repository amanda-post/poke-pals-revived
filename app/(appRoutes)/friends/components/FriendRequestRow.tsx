import {
  acceptFriendRequest,
  declineFriendRequest,
} from '~/app/(appRoutes)/friends/actions';
import { Button } from '~/components/ui/button';

interface FriendRequestRowProps {
  username: string;
  createdAt: string;
  requestId: string;
}

const FriendRequestRow: React.FC<FriendRequestRowProps> = ({
  username,
  createdAt,
  requestId,
}) => {
  return (
    <div className='flex justify-between'>
      <span>{username}</span>
      <span className='flex'>
        Received at: {createdAt}
        <Button onClick={() => acceptFriendRequest(requestId)}>Accept</Button>
        <Button
          onClick={() => declineFriendRequest(requestId)}
          variant='destructive'
        >
          Decline
        </Button>
      </span>
    </div>
  );
};

export default FriendRequestRow;
