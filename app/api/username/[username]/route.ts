import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const usernameExists = await db.user.findFirst({
    where: {
      username: username,
    },
  });
  return NextResponse.json(!!usernameExists);
}
