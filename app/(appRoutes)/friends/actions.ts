'use server';

import { FriendshipStatus } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { db } from '~/lib/db';

export async function sendFriendRequest(recipientUsername: string) {
  const session = await getServerSession(authOptions);
  const senderId = session?.user?.id;

  const existingFriendship = await db.friendship.findFirst({
    where: {
      OR: [
        {
          sender: { id: senderId },
          recipient: { username: recipientUsername },
        },
        {
          sender: { username: recipientUsername },
          recipient: { id: senderId },
        },
      ],
    },
  });

  if (existingFriendship) {
    throw new Error('Friendship already exists');
  }

  const recipient = await db.user.findUnique({
    select: { id: true },
    where: { username: recipientUsername },
  });
  console.log({ recipient, session });

  if (!recipient?.id || !senderId) {
    throw new Error('Recipient not found');
  }

  if (recipient.id === senderId) {
    throw new Error('Cannot send friend request to yourself');
  }

  return db.friendship.create({
    data: {
      senderId: senderId,
      recipientId: recipient?.id,
    },
  });
}

export async function acceptFriendRequest(requestId: string) {
  return db.friendship.update({
    where: { id: requestId },
    data: { status: FriendshipStatus.ACCEPTED },
  });
}

export async function declineFriendRequest(requestId: string) {
  return db.friendship.update({
    where: { id: requestId },
    data: { status: FriendshipStatus.DECLINED },
  });
}
