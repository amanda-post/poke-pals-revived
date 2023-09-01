'use server';
import { getServerSession } from 'next-auth';
import AddFriend from '~/app/(appRoutes)/friends/components/AddFriend';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';

import { db } from '~/lib/db';

// receivedFriendRequests: {
//   select: {
//     createdAt: true,
//     id: true,
//     sender: {
//       select: {
//         username: true,
//       },
//     },
//   },
//   where: {
//     status: 'PENDING',
//   },
// },
const getFriendRequests = (id: string) => {
  const response = db.user.findUnique({
    select: { receivedFriendRequests: true },
    where: {
      id,
    },
  });
  return response;
};

const FriendRequests = async () => {
  const session = await getServerSession(authOptions);
  const friendRequests = await getFriendRequests(session?.user.id || '');
  console.log({ friendRequests });
  return (
    <>
      requests
      <AddFriend />
    </>
  );
};

export default FriendRequests;
