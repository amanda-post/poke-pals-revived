import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from '~/lib/db';
import { isEmpty } from '~/lib/utils/generalHelpers';

export async function GET(
  request: Request,
  { params: { playerAlias } }: { params: { playerAlias: string } }
) {
  const user = await db.$queryRaw(
    Prisma.sql`SELECT * FROM User WHERE playerAlias = ${playerAlias}`
  );

  const userExists = !isEmpty(user);
  return NextResponse.json(userExists);
}
