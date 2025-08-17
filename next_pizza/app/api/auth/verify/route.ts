import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
      return new NextResponse('Code is required', { status: 400 });
    }
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });
    if (!verificationCode) {
      return new NextResponse('Invalid verification code', { status: 400 });
    }
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.error('Error in verification route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
