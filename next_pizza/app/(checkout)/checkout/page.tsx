<<<<<<< HEAD
'use client';
import { CheckoutSideBar, Container, Title } from '@/shared/components/shared';
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/components/shared/checkout/checkout-form-schema';

import { CheckoutAddressForm } from '@/shared/components/shared/checkout/checkoutAddressForm';
import { CheckoutCart } from '@/shared/components/shared/checkout/checkoutCart';
import { CheckoutPersonalForm } from '@/shared/components/shared/checkout/checkoutPersonalForm';
import { useCart } from '@/shared/hooks/use-cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const VAT = 15;

const DELIVERY_COST = 5;

const Checkout = () => {
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
=======
import { CheckoutItemDetails, Container, Title, WhiteBlock } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

const Checkout = () => {
  return (
    <Container className="mt-10">
      <Title text="Ordering" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1">111</WhiteBlock>
          <WhiteBlock title="2. Personal data">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" placeholder="First name" className="text-base" />
              <Input name="lastName" placeholder="Last name" className="text-base" />
              <Input name="email" placeholder="Email" className="text-base" />
              <Input name="phone" placeholder="Phone" className="text-base" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Address">
            <div className="flex flex-col gap-5">
              <Input name="address" placeholder="Enter address..." className="text-base" />
              <Textarea className="text-base" placeholder="Comments" rows={5} />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Order summary:</span>
              <span className="text-3xl font-extrabold">150$</span>
            </div>
            <CheckoutItemDetails
              title={
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-gray-400" />
                  Cost item
                </div>
              }
              value="100 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center gap-2">
                  <Percent size={18} className="text-gray-400" />
                  VAT
                </div>
              }
              value="100 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-gray-400" />
                  Delivery
                </div>
              }
              value="100 $"
            />
            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Payment
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
>>>>>>> 70d0c0d66ea6428beb12f4ed390f7b1bd840c60b
    </Container>
  );
};

export default Checkout;
