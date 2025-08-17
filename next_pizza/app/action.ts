'use server';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormValues } from '@/shared/components/shared/checkout/checkout-form-schema';
import { OrderSuccessTemplate } from '@/shared/components/shared/resend-email/OrderSuccessTemplate';
import { PayOrderTemplate } from '@/shared/components/shared/resend-email/PayOrderTemplate';
import { VerificationUserTemplate } from '@/shared/components/shared/resend-email/verification-user';
import { getUserSession } from '@/shared/lib/get-user-session';
import { sendEmail } from '@/shared/lib/send-email';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // found cart by token
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }
    // create order
    const order = await prisma.order.create({
      data: {
        fullName: data.firstName + ' ' + data.lastName,
        token: cartToken,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    // clear cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // re_VdffvT6e_Dvsn5Rih2FYiRd9NeTpLAmmD

    await sendEmail(
      data.email,
      'Next Pizza Order',
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'https://resend.com/onboarding',
      }),
    );

    return order.id;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating order');
  }
}

export async function newStatus(order_id: string, redirect_status: string) {
  const order = await prisma.order.findFirst({
    where: {
      id: Number(order_id),
    },
  });

  if (!order) {
    return;
  }
  const isSucceeded = redirect_status === 'succeeded';

  await prisma.order.update({
    where: {
      id: order?.id,
    },
    data: {
      status: isSucceeded ? OrderStatus.SUCCEDED : OrderStatus.CANSELLED,
    },
  });

  const items = JSON.parse(order?.items as string) as CartItemDTO[];
  if (isSucceeded) {
    await sendEmail(order?.email || '', 'Next Pizza / Ваш заказ успешно оформлен 🎉', OrderSuccessTemplate({ orderId: order.id, items }));
  } else {
    // Письмо о неуспешной оплате
  }
}

export async function UpdateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error('User not found');
    }
    const user = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });
    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : user?.password,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user info');
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if (!user.verified) {
        throw new Error('User with this email already exists, but not verified');
      }
      throw new Error('User with this email already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.verificationCode.create({
      data: {
        userId: createdUser.id,
        code,
      },
    });
    await sendEmail(createdUser.email, 'Next Pizza / Confirm registration', VerificationUserTemplate({ code }));
  } catch (error) {
    console.log(error);
    throw new Error('Error registering user');
  }
}
