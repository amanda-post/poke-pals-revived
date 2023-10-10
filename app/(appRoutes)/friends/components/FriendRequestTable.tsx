'use client';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const handleAccept = (id: string) => {
    acceptFriendRequest(id);
    router.refresh();
  };
  const handleDecline = (id: string) => {
    declineFriendRequest(id);
    router.refresh();
  };
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
              {sender?.playerAlias ? sender?.playerAlias : '-'}
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
                  <Button onClick={() => handleAccept(id)}>Accept</Button>
                  <Button
                    onClick={() => handleDecline(id)}
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
