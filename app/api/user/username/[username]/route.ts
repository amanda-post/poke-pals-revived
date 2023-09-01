import { Prisma } from '@prisma/client';
import console from 'console';
import { NextResponse } from 'next/server';
import { db } from '~/lib/db';
import { isEmpty } from '~/lib/utils/generalHelpers';

export async function GET(
  request: Request,
  { params: { username } }: { params: { username: string } }
) {
  const decodedUsername = decodeURIComponent(username || '');

  const user = await db.$queryRaw(
    Prisma.sql`SELECT * FROM User WHERE username = ${decodedUsername}`
  );

  console.log({ user });

  const userExists = !isEmpty(user);
  return NextResponse.json(userExists);
}
