import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shared/lib/get-user-session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
