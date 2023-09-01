'use server';

import { FriendshipStatus } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { db } from '~/lib/db';

export async function getFriends() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const acceptedFriendships = await db.friendship.findMany({
    where: {
      OR: [
        { senderId: userId, status: 'ACCEPTED' },
        { recipientId: userId, status: 'ACCEPTED' },
      ],
    },
    include: {
      sender: true,
      recipient: true,
    },
  });

  const friendUsernames = acceptedFriendships.map((friendship) => {
    return friendship.senderId === userId
      ? friendship.recipient.username
      : friendship.sender.username;
  });
  return friendUsernames;
}

export type Friends = Awaited<ReturnType<typeof getFriends>>;

export async function getFriendRequests() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const receivedFriendRequests = await db.friendship.findMany({
    where: {
      OR: [
        { recipientId: userId, status: FriendshipStatus.PENDING },
        { senderId: userId, status: FriendshipStatus.PENDING },
      ],
      status: FriendshipStatus.PENDING,
    },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return receivedFriendRequests;
}

export type FriendRequest = Awaited<
  ReturnType<typeof getFriendRequests>
>[number];
export type FriendRequests = FriendRequest[];

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
export async function cancelFriendRequest(requestId: string) {
  return db.friendship.delete({ where: { id: requestId } });
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
