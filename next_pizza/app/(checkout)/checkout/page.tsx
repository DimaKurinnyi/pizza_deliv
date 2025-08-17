'use client';
import { CheckoutSideBar, Container, Title } from '@/shared/components/shared';
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/components/shared/checkout/checkout-form-schema';

import { CheckoutAddressForm } from '@/shared/components/shared/checkout/checkoutAddressForm';
import { CheckoutCart } from '@/shared/components/shared/checkout/checkoutCart';
import { CheckoutPersonalForm } from '@/shared/components/shared/checkout/checkoutPersonalForm';
import { useCart } from '@/shared/hooks/use-cart';
import { Api } from '@/shared/services/appi-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const VAT = 15;

const DELIVERY_COST = 5;

const Checkout = () => {
  const session = useSession();
  const [openPayment, setOpenPayment] = useState(false);

  const [data, setData] = useState<TCheckoutFormValues>();
  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');
      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [form, session]);

  const { removeCartItem, items, totalAmount, updateItemQuantity, loading } = useCart();
  const vatPrice = (totalAmount * VAT) / 100;

  const totalPrice = totalAmount + vatPrice + DELIVERY_COST;

  const onSubmit = (data?: TCheckoutFormValues) => {
    try {
      setData(data);
      console.log('data', data);
      //  await createOrder(data);

      toast.success('Order created successfully');
      setOpenPayment(true);
    } catch {
      toast.error('Something went wrong');
    }
  };
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Ordering" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart items={items} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} loading={loading} />

              <CheckoutPersonalForm className={loading ? 'opacity-40' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40' : ''} />
            </div>
            <div className="w-[450px] ">
              <CheckoutSideBar totalAmount={totalAmount} totalPrice={totalPrice} vatPrice={vatPrice} loading={loading} openPayment={openPayment} data={data} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Checkout;
