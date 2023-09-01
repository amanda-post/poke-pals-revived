import { getServerSession } from 'next-auth';
import {
  FriendRequest,
  getFriendRequests,
} from '~/app/(appRoutes)/friends/actions';
import FriendRequestTable from '~/app/(appRoutes)/friends/components/FriendRequestTable';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const FriendRequests = async () => {
  const session = await getServerSession(authOptions);

  const friendRequests = await getFriendRequests();
  const userId = session?.user?.id;

  const { received, sent } = friendRequests.reduce(
    (acc, request) => {
      if (request.recipientId === userId) {
        acc.received.push(request);
      }
      if (request.senderId === userId) {
        acc.sent.push(request);
      }
      return acc;
    },
    { received: [] as FriendRequest[], sent: [] as FriendRequest[] }
  );

  console.log({ friendRequests });
  return (
    <>
      <h1>Friend Requests</h1>

      <Tabs defaultValue='received' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='received'>Received</TabsTrigger>
          <TabsTrigger value='sent'>Sent</TabsTrigger>
        </TabsList>
        <TabsContent value='received'>
          <FriendRequestTable friendRequests={received} type='received' />
        </TabsContent>
        <TabsContent value='sent'>
          <FriendRequestTable friendRequests={sent} type='sent' />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FriendRequests;
