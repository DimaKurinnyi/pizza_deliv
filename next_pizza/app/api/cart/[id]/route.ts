import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({ massage: 'Not authorized' }, { status: 401 });
    }
    const cartItem = prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ massage: 'Item not found' }, { status: 404 });
    }
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: 'Do not add to cart' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({ massage: 'Not authorized' }, { status: 401 });
    }
    const cartItem = prisma.cartItem.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!cartItem) {
      return NextResponse.json({ massage: 'Item not found' }, { status: 404 });
    }
    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });
    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: 'Do cannot delete' }, { status: 500 });
  }
}
