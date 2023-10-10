import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function PATCH(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const {
    data: { playerAlias: newPlayerAlias },
  } = await request.json();

  await db.user.update({
    where: {
      id,
    },
    data: {
      playerAlias: newPlayerAlias,
    },
  });
  return NextResponse.json({ success: true });
}
