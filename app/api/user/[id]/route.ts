import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function PATCH(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const {
    data: { username: newUsername },
  } = await request.json();

  await db.user.update({
    where: {
      id,
    },
    data: {
      username: newUsername,
    },
  });
  return NextResponse.json({ success: true });
}
