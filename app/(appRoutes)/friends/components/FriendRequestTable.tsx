'use client';
import {
  FriendRequests,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
} from '~/app/(appRoutes)/friends/actions';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface FriendRequestTableProps {
  friendRequests: FriendRequests;
  type: 'received' | 'sent';
}

const FriendRequestTable: React.FC<FriendRequestTableProps> = ({
  friendRequests,
  type,
}) => {
  return (
    <Table>
      {friendRequests.length === 0 && (
        <TableCaption>No pending friend requests.</TableCaption>
      )}

      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>
            {type === 'received' ? 'Request From' : 'Sent To'}
          </TableHead>
          <TableHead>
            {type === 'received' ? 'Received On' : 'Sent On'}
          </TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {friendRequests.map(({ id, createdAt, sender }) => (
          <TableRow key={id}>
            <TableCell className='font-medium'>
              {sender?.username ? sender?.username : '-'}
            </TableCell>
            <TableCell>
              {createdAt.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell className='text-right'>
              {type === 'received' ? (
                <>
                  <Button onClick={() => acceptFriendRequest(id)}>
                    Accept
                  </Button>
                  <Button
                    onClick={() => declineFriendRequest(id)}
                    variant='destructive'
                  >
                    Decline
                  </Button>
                </>
              ) : (
                <Button onClick={() => cancelFriendRequest(id)}>Cancel</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FriendRequestTable;
