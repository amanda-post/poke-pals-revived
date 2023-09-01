import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function PATCH(
  request: Request,
  { params: { email } }: { params: { email: string } }
) {
  const {
    data: { username: newUsername },
  } = await request.json();
  console.log({ email, newUsername });

  await db.user.update({
    where: {
      email,
    },
    data: {
      username: newUsername,
    },
  });
  return NextResponse.json({ success: true });
}
